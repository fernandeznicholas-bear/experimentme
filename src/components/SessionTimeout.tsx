'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

const TIMEOUT_MS = 30 * 60 * 1000       // 30 minutes until auto-logout
const WARNING_MS = 25 * 60 * 1000       // Show warning at 25 minutes
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'touchstart', 'scroll'] as const

export function SessionTimeout() {
  const [showWarning, setShowWarning] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const warningRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (warningRef.current) clearTimeout(warningRef.current)
  }, [])

  const handleLogout = useCallback(async () => {
    clearTimers()
    setShowWarning(false)
    await supabase.auth.signOut()
    router.push('/auth/login?message=You were signed out due to inactivity')
    router.refresh()
  }, [clearTimers, supabase.auth, router])

  const resetTimers = useCallback(() => {
    if (!isLoggedIn) return
    clearTimers()
    setShowWarning(false)

    warningRef.current = setTimeout(() => {
      setShowWarning(true)
    }, WARNING_MS)

    timeoutRef.current = setTimeout(() => {
      handleLogout()
    }, TIMEOUT_MS)
  }, [isLoggedIn, clearTimers, handleLogout])

  // Check auth state
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.auth.getUser().then((result: any) => {
      setIsLoggedIn(!!result?.data?.user)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Start/stop timers based on login state
  useEffect(() => {
    if (isLoggedIn) {
      resetTimers()

      const handleActivity = () => resetTimers()
      ACTIVITY_EVENTS.forEach(event =>
        window.addEventListener(event, handleActivity, { passive: true })
      )

      return () => {
        clearTimers()
        ACTIVITY_EVENTS.forEach(event =>
          window.removeEventListener(event, handleActivity)
        )
      }
    } else {
      clearTimers()
      setShowWarning(false)
    }
  }, [isLoggedIn, resetTimers, clearTimers])

  if (!showWarning) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl border border-[var(--border)] p-8 max-w-sm mx-4 text-center animate-fade-up">
        <div className="text-4xl mb-3">&#9203;</div>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-2">
          Still there?
        </h2>
        <p className="text-sm text-text-muted font-[family-name:var(--font-body)] mb-6">
          You&apos;ll be signed out in 5 minutes due to inactivity.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetTimers}
            className="px-6 py-2.5 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors cursor-pointer"
          >
            Stay Signed In
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-full border-2 border-terracotta/30 text-terracotta font-semibold text-sm hover:bg-terracotta/5 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
