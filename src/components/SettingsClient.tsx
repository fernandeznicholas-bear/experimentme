'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

interface SettingsClientProps {
  userId: string
  userEmail: string
  userName: string
}

export function SettingsClient({ userId, userEmail, userName }: SettingsClientProps) {
  const supabase = createClient()
  const router = useRouter()

  // Display name state
  const [displayName, setDisplayName] = useState(userName)
  const [nameLoading, setNameLoading] = useState(false)
  const [nameMessage, setNameMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Email state
  const [newEmail, setNewEmail] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showPasswords, setShowPasswords] = useState(false)

  // Delete account state
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState<{ type: 'error'; text: string } | null>(null)

  // Suppress unused variable warning - userId reserved for future use (e.g. delete account API)
  void userId

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault()
    setNameLoading(true)
    setNameMessage(null)

    const trimmed = displayName.trim()
    if (!trimmed) {
      setNameMessage({ type: 'error', text: 'Display name cannot be empty.' })
      setNameLoading(false)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.auth as any).updateUser({
      data: { full_name: trimmed }
    })

    if (error) {
      setNameMessage({ type: 'error', text: error.message })
    } else {
      setNameMessage({ type: 'success', text: 'Display name updated.' })
      router.refresh()
    }
    setNameLoading(false)
  }

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailLoading(true)
    setEmailMessage(null)

    const trimmed = newEmail.trim().toLowerCase()
    if (!trimmed || trimmed === userEmail) {
      setEmailMessage({ type: 'error', text: 'Please enter a different email address.' })
      setEmailLoading(false)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.auth as any).updateUser({
      email: trimmed
    })

    if (error) {
      setEmailMessage({ type: 'error', text: error.message })
    } else {
      setEmailMessage({ type: 'success', text: 'Confirmation email sent to your new address. Please check your inbox to complete the change.' })
      setNewEmail('')
    }
    setEmailLoading(false)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordMessage(null)

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters.' })
      setPasswordLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' })
      setPasswordLoading(false)
      return
    }

    // Verify current password by attempting a sign-in
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: signInError } = await (supabase.auth as any).signInWithPassword({
      email: userEmail,
      password: currentPassword
    })

    if (signInError) {
      setPasswordMessage({ type: 'error', text: 'Current password is incorrect.' })
      setPasswordLoading(false)
      return
    }

    // Update to new password
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.auth as any).updateUser({
      password: newPassword
    })

    if (error) {
      setPasswordMessage({ type: 'error', text: error.message })
    } else {
      setPasswordMessage({ type: 'success', text: 'Password updated successfully.' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
    setPasswordLoading(false)
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') return

    setDeleteLoading(true)
    setDeleteMessage(null)

    try {
      // Delete user data from all tables
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('assessment_results').delete().eq('user_id', userId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('user_demographics').delete().eq('user_id', userId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('research_consent').delete().eq('user_id', userId)

      // Sign out — full account deletion from auth.users requires a server-side admin call
      // The cascade on delete will clean up if/when the admin deletes the auth user
      await supabase.auth.signOut()
      router.push('/?message=Account data deleted')
    } catch {
      setDeleteMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
      setDeleteLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Display Name */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-4">
          Display Name
        </h2>
        <form onSubmit={handleUpdateName} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold text-text-main mb-1">
              Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
              placeholder="Your display name"
            />
          </div>
          {nameMessage && (
            <div className={`p-3 rounded-lg text-sm ${
              nameMessage.type === 'success'
                ? 'bg-sage/10 border border-sage/30 text-sage'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {nameMessage.text}
            </div>
          )}
          <button
            type="submit"
            disabled={nameLoading || displayName.trim() === userName}
            className="px-6 py-2.5 rounded-xl bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {nameLoading ? 'Saving...' : 'Update Name'}
          </button>
        </form>
      </div>

      {/* Email */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-4">
          Email Address
        </h2>
        <p className="text-sm text-text-muted mb-4">
          Current email: <span className="font-semibold text-text-main">{userEmail}</span>
        </p>
        <form onSubmit={handleUpdateEmail} className="space-y-4">
          <div>
            <label htmlFor="newEmail" className="block text-sm font-semibold text-text-main mb-1">
              New Email
            </label>
            <input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
              placeholder="new@example.com"
              required
            />
          </div>
          {emailMessage && (
            <div className={`p-3 rounded-lg text-sm ${
              emailMessage.type === 'success'
                ? 'bg-sage/10 border border-sage/30 text-sage'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {emailMessage.text}
            </div>
          )}
          <button
            type="submit"
            disabled={emailLoading || !newEmail.trim()}
            className="px-6 py-2.5 rounded-xl bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {emailLoading ? 'Sending...' : 'Change Email'}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-4">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-semibold text-text-main mb-1">
              Current Password
            </label>
            <input
              id="currentPassword"
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
              placeholder="Enter current password"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-text-main mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-text-main mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
              placeholder="Re-enter new password"
              required
              minLength={6}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="accent-terracotta"
            />
            Show passwords
          </label>
          {passwordMessage && (
            <div className={`p-3 rounded-lg text-sm ${
              passwordMessage.type === 'success'
                ? 'bg-sage/10 border border-sage/30 text-sage'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {passwordMessage.text}
            </div>
          )}
          <button
            type="submit"
            disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
            className="px-6 py-2.5 rounded-xl bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {passwordLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Danger Zone — Delete Account */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-red-700 mb-2">
          Delete Account
        </h2>
        <p className="text-sm text-text-muted mb-4">
          This will permanently delete all your assessment results, demographic data, and research consent records.
          This action cannot be undone.
        </p>
        <div className="space-y-3">
          <div>
            <label htmlFor="deleteConfirm" className="block text-sm font-semibold text-text-main mb-1">
              Type <span className="font-mono text-red-600">DELETE</span> to confirm
            </label>
            <input
              id="deleteConfirm"
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-red-200 bg-red-50/30 text-text-main focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-colors"
              placeholder="DELETE"
            />
          </div>
          {deleteMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {deleteMessage.text}
            </div>
          )}
          <button
            onClick={handleDeleteAccount}
            disabled={deleteConfirm !== 'DELETE' || deleteLoading}
            className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {deleteLoading ? 'Deleting...' : 'Permanently Delete Account'}
          </button>
        </div>
      </div>
    </div>
  )
}
