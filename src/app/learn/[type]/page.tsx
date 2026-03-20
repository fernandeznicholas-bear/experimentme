'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getAssessmentConfig, calculateScore } from '@/lib/assessments'
import { getDeepDiveContent } from '@/lib/deep-dive-content'
import { createClient } from '@/lib/supabase-browser'

interface StoredResult {
  score: number
  category: string
  completed_at: string
  details: {
    subscales?: { name: string; score: number; maxScore: number; description: string }[]
  }
}

export default function LearnPage() {
  const params = useParams()
  const type = params.type as string
  const config = getAssessmentConfig(type)
  const content = getDeepDiveContent(type)
  const [latestResult, setLatestResult] = useState<StoredResult | null>(null)

  useEffect(() => {
    if (!config) return
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.auth.getUser().then((result: any) => {
      const user = result?.data?.user
      if (user) {
        supabase
          .from('assessment_results')
          .select('score, category, completed_at, details')
          .eq('user_id', user.id)
          .eq('assessment_type', type)
          .order('completed_at', { ascending: false })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then(({ data }: any) => {
            if (data && data.length > 0) {
              setLatestResult(data[0])
            }
          })
      }
    })
  }, [type, config])

  if (!config) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-4">
            Assessment Not Found
          </h1>
          <p className="text-text-muted mb-8">We couldn&apos;t find that assessment.</p>
          <Link
            href="/#assessments"
            className="px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
          >
            Browse Assessments
          </Link>
        </div>
      </main>
    )
  }

  // If no deep-dive content yet, show a basic page with what we have from config
  const hasDeepDive = !!content

  const maxScore = config.scoreType === 'average'
    ? config.scaleMax
    : config.questions.length * config.scaleMax

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/#assessments" className="hover:text-terracotta transition-colors no-underline">
            Assessments
          </Link>
          <span>/</span>
          <span className="text-brown-deep font-semibold">{config.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="inline-block px-4 py-1.5 rounded-full bg-terracotta/8 text-terracotta text-xs font-semibold tracking-wider uppercase mb-4">
            Deep Dive
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-brown-deep leading-tight mb-3">
            {config.title}
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-text-muted leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        {/* Your Result (if logged in and taken) */}
        {latestResult && (
          <div className="bg-terracotta/5 rounded-2xl border border-terracotta/20 p-6 mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
                Your Most Recent Result
              </h2>
              <span className="text-xs text-text-muted">
                {new Date(latestResult.completed_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-terracotta">
                {latestResult.score}
                <span className="text-base text-text-muted font-normal">/{maxScore}</span>
              </div>
              <div>
                <p className="font-semibold text-brown-deep">{latestResult.category}</p>
                <p className="text-sm text-text-muted">
                  See how this score is interpreted below.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Link
                href={`/assess/${type}`}
                className="px-5 py-2 rounded-full bg-terracotta text-white text-sm font-semibold hover:bg-terracotta-dark transition-colors no-underline"
              >
                Retake Assessment
              </Link>
              <Link
                href="/profile"
                className="px-5 py-2 rounded-full border-2 border-terracotta/30 text-terracotta text-sm font-semibold hover:bg-terracotta/5 transition-colors no-underline"
              >
                View Full History
              </Link>
            </div>
          </div>
        )}

        {/* CTA if not taken */}
        {!latestResult && (
          <div className="bg-sage/10 rounded-2xl border border-sage/20 p-6 mb-10 text-center">
            <p className="font-[family-name:var(--font-body)] text-text-muted mb-4">
              Haven&apos;t taken this assessment yet?
            </p>
            <Link
              href={`/assess/${type}`}
              className="inline-block px-7 py-3 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
            >
              Take the {config.title}
            </Link>
          </div>
        )}

        {hasDeepDive ? (
          <>
            {/* Overview */}
            <Section title="What It Measures">
              <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed mb-4">
                {content.overview.what}
              </p>
              <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed">
                {content.overview.why}
              </p>
            </Section>

            {/* History */}
            <Section title="History & Development">
              <div className="flex items-center gap-4 mb-4 bg-cream/50 rounded-xl p-4 border border-[var(--border)]">
                <div>
                  <p className="text-sm font-semibold text-brown-deep">{content.history.creators}</p>
                  <p className="text-xs text-text-muted">First published {content.history.year}</p>
                </div>
              </div>
              <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed mb-4">
                {content.history.context}
              </p>
              <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed">
                {content.history.evolution}
              </p>
            </Section>

            {/* Validation */}
            <Section title="Scientific Validation">
              <div className="space-y-4">
                <ValidationStat
                  label="Internal Consistency"
                  value={content.validation.internalConsistency}
                />
                <ValidationStat
                  label="Test-Retest Reliability"
                  value={content.validation.testRetest}
                />
                <ValidationStat
                  label="Validation Samples"
                  value={content.validation.sampleInfo}
                />
                <ValidationStat
                  label="Convergent Validity"
                  value={content.validation.convergent}
                />
                {content.validation.notes && (
                  <p className="font-[family-name:var(--font-body)] text-text-muted text-sm leading-relaxed italic mt-2">
                    {content.validation.notes}
                  </p>
                )}
              </div>
            </Section>

            {/* Score Interpretation */}
            <Section title="Score Interpretation">
              <p className="font-[family-name:var(--font-body)] text-text-muted text-sm mb-4">
                Scores range from {config.categories[config.categories.length - 1].min} to {config.categories[0].max}.
                {config.scoreType === 'sum' ? ' Your score is the sum of all responses.' : ' Your score is the average of all responses.'}
              </p>
              <div className="space-y-2">
                {config.categories.map((cat) => {
                  const isUserCategory = latestResult?.category === cat.label
                  return (
                    <div
                      key={cat.label}
                      className={`rounded-xl p-4 border ${
                        isUserCategory
                          ? 'bg-terracotta/10 border-terracotta/30'
                          : 'bg-cream/50 border-[var(--border)]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="text-sm font-bold text-brown-deep">{cat.label}</span>
                        {isUserCategory && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-terracotta text-white font-bold uppercase tracking-wider">
                            You
                          </span>
                        )}
                        <span className="text-xs text-text-muted ml-auto">
                          {cat.min}–{cat.max}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">{cat.description}</p>
                    </div>
                  )
                })}
              </div>
            </Section>

            {/* Subscales */}
            {config.subscales && config.subscales.length > 0 && (
              <Section title="Subscales">
                <div className="space-y-3">
                  {config.subscales.map((sub) => (
                    <div key={sub.name} className="bg-cream/50 rounded-xl border border-[var(--border)] p-4">
                      <h4 className="font-semibold text-brown-deep text-sm mb-1">{sub.name}</h4>
                      <p className="text-sm text-text-muted leading-relaxed">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Key Findings */}
            <Section title="Key Research Findings">
              <div className="space-y-4">
                {content.keyFindings.map((kf, i) => (
                  <div key={i} className="bg-cream/50 rounded-xl border border-[var(--border)] p-4">
                    <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed mb-2">
                      {kf.finding}
                    </p>
                    <p className="text-xs text-text-muted italic">{kf.source}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Practical Applications */}
            <Section title="Where It's Used">
              <div className="grid sm:grid-cols-2 gap-3">
                {content.practicalApplications.map((app) => (
                  <div key={app.title} className="bg-cream/50 rounded-xl border border-[var(--border)] p-4">
                    <h4 className="font-semibold text-brown-deep text-sm mb-1">{app.title}</h4>
                    <p className="text-xs text-text-muted leading-relaxed">{app.description}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* References */}
            <Section title="References">
              <div className="space-y-3">
                {content.references.map((ref, i) => (
                  <p
                    key={i}
                    className={`font-[family-name:var(--font-body)] text-sm leading-relaxed ${
                      ref.isPrimary ? 'text-brown-deep font-semibold' : 'text-text-muted'
                    }`}
                  >
                    {ref.isPrimary && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta text-[10px] font-bold uppercase tracking-wider mr-2">
                        Primary
                      </span>
                    )}
                    {ref.text}
                  </p>
                ))}
              </div>
            </Section>
          </>
        ) : (
          <>
            {/* Fallback: show what we have from the assessment config */}
            <Section title="About This Assessment">
              <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed mb-4">
                {config.description}
              </p>
              <p className="font-[family-name:var(--font-body)] text-text-muted text-sm italic leading-relaxed">
                {config.disclaimer}
              </p>
            </Section>

            {/* Score Interpretation */}
            <Section title="Score Interpretation">
              <div className="space-y-2">
                {config.categories.map((cat) => {
                  const isUserCategory = latestResult?.category === cat.label
                  return (
                    <div
                      key={cat.label}
                      className={`rounded-xl p-4 border ${
                        isUserCategory
                          ? 'bg-terracotta/10 border-terracotta/30'
                          : 'bg-cream/50 border-[var(--border)]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="text-sm font-bold text-brown-deep">{cat.label}</span>
                        {isUserCategory && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-terracotta text-white font-bold uppercase tracking-wider">
                            You
                          </span>
                        )}
                        <span className="text-xs text-text-muted ml-auto">
                          {cat.min}–{cat.max}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">{cat.description}</p>
                    </div>
                  )
                })}
              </div>
            </Section>

            {/* Subscales */}
            {config.subscales && config.subscales.length > 0 && (
              <Section title="Subscales">
                <div className="space-y-3">
                  {config.subscales.map((sub) => (
                    <div key={sub.name} className="bg-cream/50 rounded-xl border border-[var(--border)] p-4">
                      <h4 className="font-semibold text-brown-deep text-sm mb-1">{sub.name}</h4>
                      <p className="text-sm text-text-muted leading-relaxed">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Citation */}
            <Section title="Citation">
              <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed">
                {config.citation}
              </p>
            </Section>

            <div className="bg-amber/10 rounded-xl border border-amber/20 p-4 text-center">
              <p className="text-sm text-text-muted">
                Full deep-dive content for this assessment is coming soon — including history, validation data, and key research findings.
              </p>
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-sage/10 rounded-2xl border border-sage/20 p-8">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-3">
            Ready to take it?
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-muted mb-6 max-w-md mx-auto">
            {config.questions.length} questions. ~{config.questions.length <= 5 ? '2' : config.questions.length <= 12 ? '3' : '5'} minutes. Instant results.
          </p>
          <Link
            href={`/assess/${type}`}
            className="inline-block px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
          >
            {latestResult ? 'Retake the Assessment' : 'Take the Assessment'}
          </Link>
        </div>

      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
        {title}
      </h2>
      {children}
    </div>
  )
}

function ValidationStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream/50 rounded-xl border border-[var(--border)] p-4">
      <p className="text-xs font-semibold text-terracotta uppercase tracking-wider mb-1">{label}</p>
      <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed">{value}</p>
    </div>
  )
}
