'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Phase = 'blank' | 'science' | 'both' | 'allOut' | 'name' | 'nameOut' | 'fadeout' | 'done'

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('blank')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const skipped = useRef(false)

  const skip = useCallback(() => {
    if (skipped.current) return
    skipped.current = true
    // Clear all pending timeouts
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('done')
  }, [])

  useEffect(() => {
    // Always start at top of page on refresh
    window.scrollTo(0, 0)

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!skipped.current) fn()
      }, ms)
      timers.current.push(id)
    }

    schedule(() => setPhase('science'), 400)
    schedule(() => setPhase('both'), 2400)
    schedule(() => setPhase('allOut'), 5000)
    schedule(() => setPhase('name'), 7000)
    schedule(() => setPhase('nameOut'), 10500)
    schedule(() => setPhase('fadeout'), 12500)
    schedule(() => setPhase('done'), 15000)

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  if (phase === 'done') return null

  const showScience = phase === 'science' || phase === 'both'
  const showDiscovery = phase === 'both'

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-warm-white"
      style={{
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 3s ease-in-out',
      }}
    >
      {/* Phase 1: Science-Based / Self-Discovery — stacked on mobile */}
      <div
        className="absolute font-[family-name:var(--font-logo)] text-base md:text-2xl text-text-muted tracking-[0.15em] md:tracking-[0.25em] uppercase flex flex-col items-center gap-1 md:gap-2 whitespace-nowrap"
      >
        <span
          style={{
            opacity: showScience ? 1 : 0,
            transition: 'opacity 1.8s ease-in-out',
          }}
        >
          Science-Based
        </span>
        <span
          style={{
            opacity: showDiscovery ? 1 : 0,
            transition: 'opacity 1.8s ease-in-out',
          }}
        >
          Self-Discovery
        </span>
      </div>

      {/* Phase 2: Experiment Me with shimmer */}
      <h1
        className={`absolute font-[family-name:var(--font-logo)] text-5xl md:text-7xl font-light tracking-tight ${phase === 'name' || phase === 'nameOut' ? 'splash-shimmer' : 'text-terracotta'}`}
        style={{
          opacity: phase === 'name' ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
        }}
      >
        Experiment Me
      </h1>

      {/* Skip button */}
      <button
        onClick={skip}
        className="absolute bottom-8 right-8 text-sm text-text-muted/60 hover:text-terracotta transition-colors cursor-pointer font-[family-name:var(--font-logo)]"
      >
        Skip →
      </button>
    </div>
  )
}
