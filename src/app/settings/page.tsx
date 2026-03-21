import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { SettingsClient } from '@/components/SettingsClient'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?message=Sign in to manage settings')
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Explorer'

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-2">
            Account Settings
          </h1>
          <p className="text-text-muted font-[family-name:var(--font-body)]">
            Manage your account details and security preferences.
          </p>
        </div>

        <SettingsClient
          userId={user.id}
          userEmail={user.email || ''}
          userName={userName}
        />
      </div>
    </div>
  )
}
