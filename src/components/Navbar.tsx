'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface AppUser {
  email?: string
  email_confirmed_at?: string | null
}

export function Navbar() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const supabase = createClient()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.auth.getUser().then((result: any) => {
      setUser(result?.data?.user ?? null)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMenuOpen(false)
  }

  const handleResendVerification = async () => {
    if (!user?.email || resendStatus === 'sending') return
    setResendStatus('sending')
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.auth as any).resend({ type: 'signup', email: user.email })
      setResendStatus(error ? 'error' : 'sent')
    } catch {
      setResendStatus('error')
    }
  }

  const showVerificationBanner = user && !user.email_confirmed_at && !bannerDismissed

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-warm-white/90 backdrop-blur-md border-b border-[var(--border)]">
      <Link
        href="/"
        className="font-[family-name:var(--font-logo)] text-2xl text-terracotta tracking-tight no-underline"
      >
        Experiment Me
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/#assessments"
          className="hidden md:inline text-sm font-medium text-brown-mid hover:text-terracotta transition-colors no-underline"
        >
          Assessments
        </Link>
        <Link
          href="/about"
          className="hidden md:inline text-sm font-medium text-brown-mid hover:text-terracotta transition-colors no-underline"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hidden md:inline text-sm font-medium text-brown-mid hover:text-terracotta transition-colors no-underline"
        >
          Contact
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta text-sm font-semibold hover:bg-terracotta/20 transition-colors cursor-pointer"
            >
              <span className="w-7 h-7 rounded-full bg-terracotta text-white flex items-center justify-center text-xs font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </span>
              My Profile
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[var(--border)] py-2 animate-fade-up">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-text-main hover:bg-cream transition-colors no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  View Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-text-main hover:bg-cream transition-colors no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-text-main hover:bg-cream transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-brown-mid hover:text-terracotta transition-colors no-underline"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2 rounded-full bg-terracotta text-white text-sm font-semibold hover:bg-terracotta-dark transition-colors no-underline"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>

    {showVerificationBanner && (
      <div className="fixed top-[57px] left-0 right-0 z-40 bg-amber/10 border-b border-amber/30 px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
        <span className="text-brown-deep">
          Please verify your email address to secure your account.
        </span>
        {resendStatus === 'sent' ? (
          <span className="text-sage font-semibold text-xs">Verification email sent!</span>
        ) : (
          <button
            onClick={handleResendVerification}
            disabled={resendStatus === 'sending'}
            className="px-3 py-1 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-colors cursor-pointer disabled:opacity-50"
          >
            {resendStatus === 'sending' ? 'Sending...' : resendStatus === 'error' ? 'Try again' : 'Resend verification email'}
          </button>
        )}
        <button
          onClick={() => setBannerDismissed(true)}
          className="text-text-muted hover:text-brown-deep transition-colors cursor-pointer ml-2 text-lg leading-none"
          aria-label="Dismiss"
        >
          &times;
        </button>
      </div>
    )}
    </>
  )
}
