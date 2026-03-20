'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AssessmentConfig, calculateScore, ScoreCategory } from '@/lib/assessments'
import { createClient } from '@/lib/supabase-browser'
import { buildShareUrl, type ShareData } from '@/lib/share'

interface Props {
  config: AssessmentConfig
}

type Screen = 'intro' | 'questions' | 'results'

export function AssessmentRunner({ config }: Props) {
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<{
    score: number
    category: ScoreCategory
    subscaleScores?: { name: string; score: number; maxScore: number; description: string }[]
  } | null>(null)
  const [saved, setSaved] = useState(false)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [showAllLevels, setShowAllLevels] = useState(false)
  const [userChecked, setUserChecked] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.auth.getUser().then((result: any) => {
      const authUser = result?.data?.user
      if (authUser) setUser({ id: authUser.id })
      setUserChecked(true)
    })
  }, [])

  const handleStart = () => {
    setScreen('questions')
    setAnswers([])
    setCurrentQ(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (newAnswers.length === config.questions.length) {
      // All questions answered — calculate results
      const result = calculateScore(config, newAnswers)
      setResult(result)
      setScreen('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Save to Supabase — re-check auth in case it resolved late
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase.auth.getUser().then((authResult: any) => {
        const authUser = authResult?.data?.user
        if (authUser) {
          setUser({ id: authUser.id })
          saveResult(authUser.id, result, newAnswers)
        } else {
          // Not logged in — store result in localStorage so it can be saved after login
          const pendingResult = {
            assessment_type: config.id,
            score: result.score,
            max_score: config.scoreType === 'average' ? config.scaleMax : config.questions.length * config.scaleMax,
            category: result.category.label,
            details: {
              subscales: result.subscaleScores || [],
              answers: newAnswers,
            },
            completed_at: new Date().toISOString(),
          }
          localStorage.setItem('pendingAssessmentResult', JSON.stringify(pendingResult))
        }
      })
    } else {
      setCurrentQ(currentQ + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const saveResult = async (
    userId: string,
    result: { score: number; category: ScoreCategory; subscaleScores?: { name: string; score: number; maxScore: number; description: string }[] },
    finalAnswers: number[]
  ) => {
    const supabase = createClient()
    const { error } = await supabase.from('assessment_results').insert({
      user_id: userId,
      assessment_type: config.id,
      score: result.score,
      max_score: config.scoreType === 'average' ? config.scaleMax : config.questions.length * config.scaleMax,
      category: result.category.label,
      details: {
        subscales: result.subscaleScores || [],
        answers: finalAnswers,
      },
      completed_at: new Date().toISOString(),
    })

    if (!error) setSaved(true)
  }

  const maxScore = config.scoreType === 'average' ? config.scaleMax : config.questions.length * config.scaleMax
  const progress = answers.length / config.questions.length

  // ─── INTRO SCREEN ─────────────────────────────────
  if (screen === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="w-full max-w-xl animate-fade-up">
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-2">
              {config.title}
            </h1>
            <p className="text-text-muted font-[family-name:var(--font-body)] mb-6">
              {config.subtitle}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-text-muted mb-8">
              <span>{config.questions.length} questions</span>
              <span>~{config.questions.length <= 5 ? '2' : '3'} min</span>
              <span>Instant results</span>
            </div>

            <p className="text-sm text-text-muted font-[family-name:var(--font-body)] mb-4 leading-relaxed max-w-md mx-auto">
              {config.description}
            </p>

            <p className="text-xs text-text-muted/70 font-[family-name:var(--font-body)] mb-8 leading-relaxed max-w-sm mx-auto italic">
              {config.disclaimer}
            </p>

            <button
              onClick={handleStart}
              className="px-8 py-3.5 rounded-full bg-terracotta text-white font-semibold text-base hover:bg-terracotta-dark transition-colors cursor-pointer"
            >
              Begin Assessment
            </button>

            {!user && (
              <p className="mt-6 text-xs text-text-muted">
                <Link href="/auth/signup" className="text-terracotta font-semibold hover:underline">
                  Create an account
                </Link>{' '}
                to save your results to your profile.
              </p>
            )}
          </div>

          <p className="text-xs text-text-muted text-center mt-6 max-w-md mx-auto leading-relaxed">
            {config.citation}
          </p>
        </div>
      </div>
    )
  }

  // ─── QUESTIONS SCREEN ─────────────────────────────
  if (screen === 'questions') {
    const question = config.questions[currentQ]

    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="w-full max-w-xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-text-muted mb-2">
              <span>Question {currentQ + 1} of {config.questions.length}</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-2 bg-cream rounded-full overflow-hidden">
              <div
                className="h-full bg-terracotta rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div key={currentQ} className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 animate-fade-up">
            <p className="font-[family-name:var(--font-body)] text-lg text-brown-deep text-center mb-8 leading-relaxed">
              &ldquo;{question.text}&rdquo;
            </p>

            <div className="space-y-3">
              {config.scaleLabels.map((label, i) => {
                const value = config.scaleMin + i
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(value)}
                    className="w-full py-3.5 px-5 rounded-xl border border-[var(--border)] bg-cream/30 text-text-main text-sm font-medium hover:bg-terracotta hover:text-white hover:border-terracotta transition-all cursor-pointer text-left"
                  >
                    <span className="inline-block w-6 text-text-muted font-semibold">{value}</span>
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── RESULTS SCREEN ───────────────────────────────
  if (screen === 'results' && result) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto animate-fade-up">
          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center mb-6">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-2">
              Your Score
            </p>
            <div className="font-[family-name:var(--font-heading)] text-6xl font-bold text-terracotta mb-1">
              {result.score}
              <span className="text-xl text-text-muted font-normal">
                /{maxScore}
              </span>
            </div>
            <div className="text-3xl my-3">{result.category.emoji}</div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-2">
              {result.category.label}
            </h2>
            <p className="text-text-muted font-[family-name:var(--font-body)]">
              {result.category.description}
            </p>
          </div>

          {/* Insight */}
          <div className="bg-cream/50 rounded-2xl border border-[var(--border)] p-6 mb-6">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-3">
              What This Means
            </h3>
            <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed">
              {result.category.insight}
            </p>
          </div>

          {/* Subscales */}
          {result.subscaleScores && result.subscaleScores.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-4">
                Your Subscales
              </h3>
              <div className="space-y-4">
                {result.subscaleScores.map((sub) => (
                  <div key={sub.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-text-main">{sub.name}</span>
                      <span className="text-sm font-bold text-terracotta">
                        {sub.score}/{sub.maxScore}
                      </span>
                    </div>
                    <div className="h-2 bg-cream rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full bg-terracotta rounded-full"
                        style={{ width: `${(sub.score / sub.maxScore) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-muted">{sub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Score Level Explorer */}
          <div className="mb-6">
            <button
              onClick={() => setShowAllLevels(!showAllLevels)}
              className="text-sm text-terracotta font-semibold hover:underline cursor-pointer"
            >
              {showAllLevels ? 'Hide all score levels ▲' : 'See what other score levels mean ▼'}
            </button>
            {showAllLevels && (
              <div className="mt-3 space-y-2 animate-fade-up">
                {config.categories.map((cat) => (
                  <div
                    key={cat.label}
                    className={`rounded-xl p-3 border ${
                      cat.label === result.category.label
                        ? 'bg-terracotta/10 border-terracotta/30'
                        : 'bg-cream/50 border-[var(--border)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{cat.emoji}</span>
                      <span className="text-sm font-bold text-brown-deep">{cat.label}</span>
                      {cat.label === result.category.label && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-terracotta text-white font-bold uppercase tracking-wider">
                          You
                        </span>
                      )}
                      <span className="text-xs text-text-muted ml-auto">
                        {cat.min}–{cat.max}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed mb-1">{cat.description}</p>
                    <p className="text-xs text-text-muted/80 leading-relaxed font-[family-name:var(--font-body)]">{cat.insight}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save prompt (if not logged in and auth check is done) */}
          {!user && userChecked && (
            <div className="bg-sage/10 rounded-2xl border border-sage/20 p-6 mb-6 text-center">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-2">
                Save Your Results
              </h3>
              <p className="text-sm text-text-muted mb-4 font-[family-name:var(--font-body)]">
                Save this result and build your psychological profile over time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/auth/login"
                  className="inline-block px-6 py-2.5 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors no-underline"
                >
                  Log In to Save
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-block px-6 py-2.5 rounded-full bg-sage text-white font-semibold text-sm hover:bg-sage/80 transition-colors no-underline"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          )}

          {saved && (
            <div className="bg-sage/10 rounded-2xl border border-sage/20 p-4 mb-6 text-center">
              <p className="text-sm text-sage font-semibold">
                ✓ Result saved to your profile
              </p>
            </div>
          )}

          {/* Share */}
          <ShareButtons config={config} result={result} />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#assessments"
              className="flex-1 py-3 rounded-xl bg-terracotta text-white font-semibold text-center hover:bg-terracotta-dark transition-colors no-underline"
            >
              Take Another Assessment
            </Link>
            {user && (
              <Link
                href="/profile"
                className="flex-1 py-3 rounded-xl border-2 border-terracotta/30 text-terracotta font-semibold text-center hover:bg-terracotta/5 transition-colors no-underline"
              >
                View Profile
              </Link>
            )}
          </div>

          {/* Citation */}
          <p className="text-xs text-text-muted text-center mt-8 max-w-md mx-auto leading-relaxed">
            {config.citation}
          </p>
        </div>
      </div>
    )
  }

  return null
}

function ShareButtons({ config, result }: {
  config: AssessmentConfig
  result: { score: number; category: ScoreCategory; subscaleScores?: { name: string; score: number; maxScore: number; description: string }[] }
}) {
  const [copied, setCopied] = useState(false)

  const shareData: ShareData = {
    a: config.id,
    s: result.score,
    ss: result.subscaleScores?.map(s => ({ n: s.name, s: s.score })),
  }
  const shareUrl = buildShareUrl(shareData)
  const shareText = `I scored ${result.score} on the ${config.title} — ${result.category.label}. See where you stand:`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `My ${config.title} Result`, text: shareText, url: shareUrl })
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6 text-center">
      <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-brown-deep mb-3">
        Share Your Results
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={handleCopyLink}
          className="px-5 py-2.5 rounded-full border-2 border-terracotta/30 text-terracotta font-semibold text-sm hover:bg-terracotta/5 transition-colors cursor-pointer"
        >
          {copied ? 'Copied!' : '🔗 Copy Link'}
        </button>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="px-5 py-2.5 rounded-full border-2 border-sage/30 text-sage font-semibold text-sm hover:bg-sage/5 transition-colors cursor-pointer"
          >
            📤 Share...
          </button>
        )}
        <a
          href={`mailto:?subject=${encodeURIComponent(`My ${config.title} Result — Experiment Me`)}&body=${encodeURIComponent(`${shareText}\n\nSee my result:\n${buildShareUrl({ a: config.id, s: result.score })}\n\nTake the assessment yourself at experimentme.com`)}`}
          className="px-5 py-2.5 rounded-full border-2 border-brown-mid/30 text-brown-mid font-semibold text-sm hover:bg-brown-mid/5 transition-colors no-underline"
        >
          ✉️ Email
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border-2 border-[#1877F2]/30 text-[#1877F2] font-semibold text-sm hover:bg-[#1877F2]/5 transition-colors no-underline"
        >
          Facebook
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border-2 border-[#25D366]/30 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/5 transition-colors no-underline"
        >
          WhatsApp
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border-2 border-[#0A66C2]/30 text-[#0A66C2] font-semibold text-sm hover:bg-[#0A66C2]/5 transition-colors no-underline"
        >
          LinkedIn
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border-2 border-[#1DA1F2]/30 text-[#1DA1F2] font-semibold text-sm hover:bg-[#1DA1F2]/5 transition-colors no-underline"
        >
          X
        </a>
      </div>
    </div>
  )
}
