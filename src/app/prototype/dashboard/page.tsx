import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { isAdmin, isOwner } from '@/lib/admin'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !(await isAdmin(user.email))) {
    redirect('/auth/login?message=Dashboard access requires admin authorization')
  }

  const ownerStatus = await isOwner(user.email)

  return <DashboardClient userEmail={user.email || ''} isOwner={ownerStatus} />
}
