import { createClient } from '@/lib/supabase-server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // CSRF protection: verify request comes from our own origin
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host && !origin.endsWith(host)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Verify the user is authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    return NextResponse.json(
      { error: 'Server configuration error: service role key not set' },
      { status: 500 }
    )
  }

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Delete user data from application tables first
  await supabaseAdmin.from('assessment_results').delete().eq('user_id', user.id)
  await supabaseAdmin.from('user_demographics').delete().eq('user_id', user.id)
  await supabaseAdmin.from('research_consent').delete().eq('user_id', user.id)

  // Delete the auth.users record (requires service role)
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

  if (error) {
    return NextResponse.json(
      { error: 'Failed to delete account. Please contact support.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
