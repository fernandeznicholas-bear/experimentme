'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Supabase automatically picks up the token from the URL hash
    // and establishes a session when the page loads
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event: string) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })
    // Also check if user already has a session (e.g. page refresh)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) setReady(true)
    })
  }, [])

  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!passwordValid) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and a number.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/profile')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-2 text-center">
            Set New Password
          </h1>
          <p className="text-text-muted text-center mb-8 font-[family-name:var(--font-body)]">
            Choose a strong password for your account
          </p>

          {!ready ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
                Loading your reset session... If this persists, your reset link may have expired.
              </div>
              <p className="text-sm text-text-muted">
                <Link href="/auth/forgot-password" className="text-terracotta font-semibold hover:underline">
                  Request a new reset link
                </Link>
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                      placeholder="New password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-terracotta transition-colors cursor-pointer text-sm font-medium"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <p className={password.length >= 8 ? 'text-sage' : 'text-text-muted'}>
                      {password.length >= 8 ? '\u2713' : '\u25CB'} At least 8 characters
                    </p>
                    <p className={/[A-Z]/.test(password) ? 'text-sage' : 'text-text-muted'}>
                      {/[A-Z]/.test(password) ? '\u2713' : '\u25CB'} One uppercase letter
                    </p>
                    <p className={/[a-z]/.test(password) ? 'text-sage' : 'text-text-muted'}>
                      {/[a-z]/.test(password) ? '\u2713' : '\u25CB'} One lowercase letter
                    </p>
                    <p className={/[0-9]/.test(password) ? 'text-sage' : 'text-text-muted'}>
                      {/[0-9]/.test(password) ? '\u2713' : '\u25CB'} One number
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !passwordValid || password !== confirmPassword}
                  className="w-full py-3 rounded-xl bg-terracotta text-white font-semibold text-base hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
