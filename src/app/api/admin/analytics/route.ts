import { createClient } from '@/lib/supabase-server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ALLOWED_EMAILS = ['fernandez.nicholas@gmail.com']

export async function GET() {
  // Verify the user is authenticated and authorized
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !ALLOWED_EMAILS.includes(user.email || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  // Use service role to bypass RLS for admin queries
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

  // Run all queries in parallel
  const [
    usersRes,
    recentUsersRes,
    allResultsRes,
    recentResultsRes,
    demographicsRes,
    consentRes,
  ] = await Promise.all([
    // Total users from auth
    admin.auth.admin.listUsers({ perPage: 1, page: 1 }),
    // Users created in last 7 days
    admin.auth.admin.listUsers({ perPage: 1000, page: 1 }),
    // All assessment results (includes all users — service role bypasses RLS)
    admin.from('assessment_results').select('assessment_type, score, completed_at, created_at, user_id').limit(10000),
    // Recent assessment results (last 30 days)
    admin.from('assessment_results')
      .select('assessment_type, score, completed_at')
      .gte('completed_at', thirtyDaysAgo)
      .order('completed_at', { ascending: false })
      .limit(50),
    // Demographics
    admin.from('user_demographics').select('age_range, gender, education, country, quick_completed'),
    // Research consent
    admin.from('research_consent').select('consented, assessment_type'),
  ])

  // Process users
  const allUsers = recentUsersRes.data?.users || []
  const totalUsers = allUsers.length
  const newUsersThisWeek = allUsers.filter(u =>
    new Date(u.created_at) >= new Date(sevenDaysAgo)
  ).length

  // Process assessment results
  const allResults = allResultsRes.data || []
  const totalAssessments = allResults.length

  // Unique users who completed at least one assessment
  const uniqueCompleters = new Set(allResults.map(r => r.user_id).filter(Boolean))
  const uniqueCompleterCount = uniqueCompleters.size
  const anonymousCompletions = allResults.filter(r => !r.user_id).length

  // Per-assessment stats
  const assessmentMap = new Map<string, { completions: number; scores: number[]; recentCount: number; uniqueUsers: Set<string> }>()
  const recentCutoff = new Date(thirtyDaysAgo)

  for (const r of allResults) {
    const type = r.assessment_type
    if (!assessmentMap.has(type)) {
      assessmentMap.set(type, { completions: 0, scores: [], recentCount: 0, uniqueUsers: new Set() })
    }
    const entry = assessmentMap.get(type)!
    entry.completions++
    if (r.user_id) entry.uniqueUsers.add(r.user_id)
    if (typeof r.score === 'number') entry.scores.push(r.score)
    if (new Date(r.completed_at) >= recentCutoff) entry.recentCount++
  }

  const assessmentNames: Record<string, string> = {
    swls: 'SWLS', rosenberg: 'Rosenberg', grit: 'Grit-S', mindset: 'Growth Mindset',
    bigfive: 'Big Five', perma: 'PERMA', happiness: 'SHS', dass21: 'DASS-21',
    hope: 'Hope Scale', selfcompassion: 'Self-Compassion', phq9: 'PHQ-9',
    gad7: 'GAD-7', pcl5: 'PCL-5', who5: 'WHO-5', cssrs: 'C-SSRS',
  }

  const assessmentStats = Array.from(assessmentMap.entries())
    .map(([type, data]) => ({
      name: assessmentNames[type] || type,
      slug: type,
      completions: data.completions,
      uniqueUsers: data.uniqueUsers.size,
      avgScore: data.scores.length > 0
        ? (data.scores.reduce((a, b) => a + b, 0) / data.scores.length).toFixed(1)
        : '—',
      recentCount: data.recentCount,
    }))
    .sort((a, b) => b.completions - a.completions)

  // Recent activity (last 50 assessments)
  const recentResults = recentResultsRes.data || []
  const recentActivity = recentResults.slice(0, 15).map(r => {
    const completedAt = new Date(r.completed_at)
    const diffMs = now.getTime() - completedAt.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    let time: string
    if (diffMin < 60) time = `${diffMin}m ago`
    else if (diffHours < 24) time = `${diffHours}h ago`
    else time = `${diffDays}d ago`

    return {
      time,
      event: `${assessmentNames[r.assessment_type] || r.assessment_type} completed`,
      detail: `Score: ${r.score}`,
    }
  })

  // Demographics breakdown
  const demos = demographicsRes.data || []
  const ageGroups = new Map<string, number>()
  for (const d of demos) {
    if (d.age_range) {
      ageGroups.set(d.age_range, (ageGroups.get(d.age_range) || 0) + 1)
    }
  }
  const totalWithAge = Array.from(ageGroups.values()).reduce((a, b) => a + b, 0)
  const demographics = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    .map(label => ({
      label,
      count: ageGroups.get(label) || 0,
      pct: totalWithAge > 0 ? Math.round(((ageGroups.get(label) || 0) / totalWithAge) * 100) : 0,
    }))

  // Consent rate
  const consentData = consentRes.data || []
  const consentedCount = consentData.filter(c => c.consented).length
  const consentRate = consentData.length > 0
    ? Math.round((consentedCount / consentData.length) * 100)
    : 0

  return NextResponse.json({
    stats: {
      totalUsers,
      totalAssessments,
      uniqueCompleters: uniqueCompleterCount,
      anonymousCompletions,
      newUsersThisWeek,
      consentRate,
    },
    assessmentStats,
    recentActivity,
    demographics,
  })
}
