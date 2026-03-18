'use client'

import { Suspense, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')
  const message = searchParams.get('message')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
    } else {
      router.push('/profile')
      router.refresh()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-2 text-center">
        Welcome Back
      </h1>
      <p className="text-text-muted text-center mb-8 font-[family-name:var(--font-body)]">
        Sign in to view your assessment results
      </p>

      {(errorParam || error) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {errorParam || error}
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 bg-sage/10 border border-sage/30 rounded-lg text-sage text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-cream/50 text-text-main focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
              placeholder="Your password"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-terracotta text-white font-semibold text-base hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-terracotta font-semibold hover:underline">
          Sign up free
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="text-center text-text-muted">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
