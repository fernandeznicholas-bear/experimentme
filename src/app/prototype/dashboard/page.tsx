import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import DashboardClient from './DashboardClient'

const ALLOWED_EMAILS = ['fernandez.nicholas@gmail.com']

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !ALLOWED_EMAILS.includes(user.email || '')) {
    redirect('/auth/login?message=Dashboard access requires owner authorization')
  }

  return <DashboardClient userEmail={user.email || ''} />
}
