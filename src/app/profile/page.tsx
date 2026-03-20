import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ProfileResults } from '@/components/ProfileResults'
import { PendingResultSaver } from '@/components/PendingResultSaver'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?message=Sign in to view your profile')
  }

  // Fetch user's assessment results
  const { data: results } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Explorer'

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <PendingResultSaver userId={user.id} />
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-terracotta text-white flex items-center justify-center text-2xl font-bold font-[family-name:var(--font-heading)]">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep">
                {userName}
              </h1>
              <p className="text-text-muted text-sm">{user.email}</p>
            </div>
          </div>
          <p className="text-text-muted font-[family-name:var(--font-body)]">
            Your psychological profile grows with every assessment you take.
            Each result is backed by validated, peer-reviewed science.
          </p>
        </div>

        {/* Results */}
        {results && results.length > 0 ? (
          <ProfileResults results={results} />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
            <div className="text-5xl mb-4">&#x1F52C;</div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-3">
              No Results Yet
            </h2>
            <p className="text-text-muted font-[family-name:var(--font-body)] mb-6 max-w-md mx-auto">
              Take your first assessment to start building your evidence-based psychological profile.
              It only takes 2 minutes.
            </p>
            <Link
              href="/#assessments"
              className="inline-block px-6 py-3 rounded-xl bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
            >
              Browse Assessments
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
