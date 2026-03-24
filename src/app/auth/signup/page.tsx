'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'
import Turnstile from '@/components/Turnstile'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileError, setTurnstileError] = useState(false)
  const [success, setSuccess] = useState(false)

  const isTestKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.startsWith('1x')

  // If Turnstile doesn't load within 5 seconds (e.g. blocked by ad blocker), allow signup anyway
  useEffect(() => {
    if (isTestKey) return
    const timer = setTimeout(() => {
      if (!turnstileToken) setTurnstileError(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [isTestKey, turnstileToken])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must include uppercase, lowercase, and a number')
      setLoading(false)
      return
    }

    // Skip Turnstile verification if using test keys or if widget failed to load
    if (turnstileToken && !isTestKey) {
      try {
        const verifyRes = await fetch('/api/verify-turnstile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: turnstileToken }),
        })
        const verifyData = await verifyRes.json()
        if (!verifyData.success) {
          setError('Human verification failed. Please try again.')
          setLoading(false)
          setTurnstileToken(null)
          return
        }
      } catch {
        setError('Verification error. Please try again.')
        setLoading(false)
        return
      }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
            <div className="text-5xl mb-4">&#x2709;</div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-3">
              Check Your Email
            </h1>
            <p className="text-text-muted font-[family-name:var(--font-body)] mb-6">
              We sent a confirmation link to <strong className="text-text-main">{email}</strong>.
              Click it to activate your account and start discovering the science of you.
            </p>
            <Link
              href="/auth/login"
              className="text-terracotta font-semibold hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-2 text-center">
            Create Your Account
          </h1>
          <p className="text-text-muted text-center mb-8 font-[family-name:var(--font-body)]">
            Start building your evidence-based psychological profile
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-main mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                placeholder="Your name"
              />
            </div>

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

            <div>
              <label className="block text-sm font-semibold text-text-main mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                  placeholder="At least 8 characters (A-z, 0-9)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-terracotta transition-colors cursor-pointer text-sm font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {!isTestKey && (
              <Turnstile
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => { setTurnstileToken(null); setTurnstileError(true) }}
                onExpire={() => { setTurnstileToken(null); setTurnstileError(true) }}
              />
            )}

            {turnstileError && (
              <p className="text-xs text-amber-600 text-center">
                Verification widget failed to load — you can still sign up.
              </p>
            )}

            <button
              type="submit"
              disabled={loading || (!isTestKey && !turnstileToken && !turnstileError)}
              className="w-full py-3 rounded-xl bg-terracotta text-white font-semibold text-base hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          <p className="mt-4 text-xs text-text-muted text-center">
            Your data is private. We never share individual results.
          </p>

          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-terracotta font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
