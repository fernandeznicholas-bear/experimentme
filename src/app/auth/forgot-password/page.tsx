'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-2 text-center">
            Reset Password
          </h1>
          <p className="text-text-muted text-center mb-8 font-[family-name:var(--font-body)]">
            Enter your email and we&apos;ll send you a reset link
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {sent ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-sage/10 border border-sage/30 rounded-lg text-sage text-sm">
                Check your email for a password reset link. It may take a minute to arrive.
              </div>
              <p className="text-sm text-text-muted">
                Didn&apos;t get it?{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-terracotta font-semibold hover:underline cursor-pointer"
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-terracotta text-white font-semibold text-base hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-text-muted">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-terracotta font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
