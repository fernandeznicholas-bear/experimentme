import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'
import { isOwner, listAdmins, addAdmin, removeAdmin } from '@/lib/admin'

export const dynamic = 'force-dynamic'

// GET — list all admins
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !(await isOwner(user.email))) {
    return NextResponse.json({ error: 'Unauthorized — owner access required' }, { status: 403 })
  }

  const admins = await listAdmins()
  return NextResponse.json({ admins })
}

// POST — add a new admin
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !(await isOwner(user.email))) {
    return NextResponse.json({ error: 'Unauthorized — owner access required' }, { status: 403 })
  }

  const body = await request.json()
  const email = body.email?.trim()?.toLowerCase()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const result = await addAdmin(email, user.id)

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}

// DELETE — remove an admin
export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !(await isOwner(user.email))) {
    return NextResponse.json({ error: 'Unauthorized — owner access required' }, { status: 403 })
  }

  const body = await request.json()
  const email = body.email?.trim()?.toLowerCase()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const result = await removeAdmin(email)

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
