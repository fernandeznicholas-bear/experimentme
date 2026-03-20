'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

interface Props {
  userId: string
  assessmentType: string
  onComplete: () => void
  onDismiss: () => void
}

export function ResearchConsentPrompt({ userId, assessmentType, onComplete, onDismiss }: Props) {
  const [saving, setSaving] = useState(false)
  const [alreadyConsented, setAlreadyConsented] = useState<boolean | null>(null)

  useEffect(() => {
    const checkConsent = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('research_consent')
        .select('consented')
        .eq('user_id', userId)
        .or(`assessment_type.is.null,assessment_type.eq.${assessmentType}`)
        .eq('consented', true)
      setAlreadyConsented(data && data.length > 0)
    }
    checkConsent()
  }, [userId, assessmentType])

  // Don't render while checking, or if already consented
  if (alreadyConsented === null || alreadyConsented) return null

  const handleOptIn = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('research_consent').upsert({
      user_id: userId,
      assessment_type: null, // global consent
      consented: true,
      consented_at: new Date().toISOString(),
      revoked_at: null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,assessment_type' })
    setSaving(false)
    onComplete()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6 animate-fade-up">
      <div className="text-center mb-4">
        <p className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-semibold tracking-wider uppercase mb-3">
          Contribute to Science
        </p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-2">
          Help advance psychological research
        </h3>
        <p className="text-sm text-text-muted font-[family-name:var(--font-body)] leading-relaxed max-w-md mx-auto">
          Would you like to anonymously share your assessment scores for research?
          Your identity is never included — only scores, categories, and demographics.
        </p>
      </div>

      <div className="bg-cream/50 rounded-xl p-4 mb-4 text-xs text-text-muted leading-relaxed">
        <p className="font-semibold text-brown-deep mb-1">What gets shared:</p>
        <p className="mb-2">Assessment scores, categories, subscale scores, and any demographic info you provided (age range, gender, education).</p>
        <p className="font-semibold text-brown-deep mb-1">What never gets shared:</p>
        <p>Your email, account identity, individual answers, IP address, or exact timestamps.</p>
      </div>

      <p className="text-xs text-text-muted text-center mb-4">
        You can change this anytime from your{' '}
        <Link href="/profile" className="text-terracotta font-semibold hover:underline">profile</Link>.
        Read our{' '}
        <Link href="/privacy" className="text-terracotta font-semibold hover:underline">Privacy Policy</Link>.
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onDismiss}
          className="text-sm text-text-muted hover:text-brown-deep transition-colors cursor-pointer"
        >
          No thanks
        </button>
        <button
          onClick={handleOptIn}
          disabled={saving}
          className="px-6 py-2.5 rounded-full bg-sage text-white font-semibold text-sm hover:bg-sage/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Yes, share my data'}
        </button>
      </div>
    </div>
  )
}
