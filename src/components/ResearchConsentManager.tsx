'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

interface ConsentRow {
  assessment_type: string | null
  consented: boolean
}

const ASSESSMENT_NAMES: Record<string, string> = {
  swls: 'Life Satisfaction (SWLS)',
  rosenberg: 'Self-Esteem (Rosenberg)',
  grit: 'Grit Scale',
  mindset: 'Growth Mindset',
  bigfive: 'Big Five Personality',
  perma: 'PERMA Well-Being',
  happiness: 'Subjective Happiness',
  dass21: 'Depression, Anxiety & Stress',
  hope: 'Hope Scale',
  selfcompassion: 'Self-Compassion',
}

interface Props {
  userId: string
  assessmentTypes: string[] // assessment types the user has results for
}

export function ResearchConsentManager({ userId, assessmentTypes }: Props) {
  const [consents, setConsents] = useState<ConsentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fetchConsents = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('research_consent')
        .select('assessment_type, consented')
        .eq('user_id', userId)
      setConsents(data || [])
      setLoading(false)
    }
    fetchConsents()
  }, [userId])

  const globalConsent = consents.find(c => c.assessment_type === null)
  const isGlobalOn = globalConsent?.consented === true

  const isAssessmentConsented = (type: string) => {
    if (isGlobalOn) return true
    const specific = consents.find(c => c.assessment_type === type)
    return specific?.consented === true
  }

  const toggleGlobal = async () => {
    setSaving('global')
    const supabase = createClient()
    const newValue = !isGlobalOn
    await supabase.from('research_consent').upsert({
      user_id: userId,
      assessment_type: null,
      consented: newValue,
      consented_at: newValue ? new Date().toISOString() : globalConsent?.consented ? undefined : null,
      revoked_at: newValue ? null : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,assessment_type' })

    setConsents(prev => {
      const filtered = prev.filter(c => c.assessment_type !== null)
      return [{ assessment_type: null, consented: newValue }, ...filtered]
    })
    setSaving(null)
  }

  const toggleAssessment = async (type: string) => {
    setSaving(type)
    const supabase = createClient()
    const current = consents.find(c => c.assessment_type === type)
    const newValue = !(current?.consented)
    await supabase.from('research_consent').upsert({
      user_id: userId,
      assessment_type: type,
      consented: newValue,
      consented_at: newValue ? new Date().toISOString() : undefined,
      revoked_at: newValue ? null : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,assessment_type' })

    setConsents(prev => {
      const filtered = prev.filter(c => c.assessment_type !== type)
      return [...filtered, { assessment_type: type, consented: newValue }]
    })
    setSaving(null)
  }

  if (loading) return null

  const consentedCount = assessmentTypes.filter(t => isAssessmentConsented(t)).length

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left cursor-pointer hover:bg-cream/30 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔬</div>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                Research Data Sharing
              </h3>
              <p className="text-xs text-text-muted">
                {consentedCount > 0
                  ? `Sharing ${isGlobalOn ? 'all' : consentedCount} assessment${consentedCount === 1 && !isGlobalOn ? '' : 's'} anonymously`
                  : 'Not sharing any data'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              consentedCount > 0 ? 'bg-sage/15 text-sage' : 'bg-cream text-text-muted'
            }`}>
              {consentedCount > 0 ? 'Active' : 'Off'}
            </span>
            <span className="text-xs text-text-muted">{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-[var(--border)] pt-4 animate-fade-up">
          <p className="text-sm text-text-muted font-[family-name:var(--font-body)] mb-4 leading-relaxed">
            When enabled, your anonymous scores and demographics are included in research datasets.
            Your identity is never shared.{' '}
            <Link href="/privacy" className="text-terracotta font-semibold hover:underline">
              Privacy Policy
            </Link>
          </p>

          {/* Global toggle */}
          <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
            <div>
              <p className="text-sm font-semibold text-brown-deep">Share all assessments</p>
              <p className="text-xs text-text-muted">Applies to all current and future results</p>
            </div>
            <button
              onClick={toggleGlobal}
              disabled={saving === 'global'}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer disabled:opacity-50 ${
                isGlobalOn ? 'bg-sage' : 'bg-gray-300'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                isGlobalOn ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Per-assessment toggles */}
          {!isGlobalOn && assessmentTypes.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-text-muted mb-2">Or choose specific assessments:</p>
              {assessmentTypes.map(type => (
                <div key={type} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-text-main">
                    {ASSESSMENT_NAMES[type] || type}
                  </span>
                  <button
                    onClick={() => toggleAssessment(type)}
                    disabled={saving === type}
                    className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer disabled:opacity-50 ${
                      isAssessmentConsented(type) ? 'bg-sage' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      isAssessmentConsented(type) ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-text-muted mt-4 italic">
            You can revoke consent at any time. Previously shared anonymous data cannot be recalled
            since it contains no identifying information.
          </p>
        </div>
      )}
    </div>
  )
}
