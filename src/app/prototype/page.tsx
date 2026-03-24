import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import PrototypeClient from './PrototypeClient'

export default async function PrototypePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?message=Sign in to explore the prototype')
  }

  return <PrototypeClient />
}
