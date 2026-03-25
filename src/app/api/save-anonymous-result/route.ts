import { createClient as createAdminClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const VALID_ASSESSMENT_TYPES = [
  'swls', 'rosenberg', 'grit', 'mindset', 'bigfive', 'perma', 'happiness',
  'dass21', 'hope', 'selfcompassion', 'phq9', 'gad7', 'pcl5', 'who5', 'cssrs',
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { assessment_type, score, max_score, category, details, completed_at, turnstileToken } = body

    // Validate required fields
    if (
      !assessment_type ||
      !VALID_ASSESSMENT_TYPES.includes(assessment_type) ||
      typeof score !== 'number' ||
      !category
    ) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    // Verify Turnstile token if provided
    if (turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Bot check failed' }, { status: 403 })
      }
    }

    // Use service role to insert without user_id (bypasses RLS)
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await admin.from('assessment_results').insert({
      assessment_type,
      score,
      max_score: max_score ?? null,
      category,
      details: details ?? null,
      completed_at: completed_at || new Date().toISOString(),
      user_id: null,
    })

    if (error) {
      console.error('Anonymous save error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
