'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getAssessmentConfig } from '@/lib/assessments'
import { buildShareUrl, type ShareData } from '@/lib/share'
import { getAssessmentNorms, calculatePercentile } from '@/lib/population-norms'
import { createClient } from '@/lib/supabase-browser'

interface AssessmentResult {
  id: string
  assessment_type: string
  score: number
  max_score: number
  category: string
  details: Record<string, unknown>
  completed_at: string
}

const assessmentMeta: Record<string, { name: string; icon: string; maxScore: number; scoreType: 'sum' | 'average' }> = {
  swls: { name: 'Life Satisfaction', icon: '☀️', maxScore: 35, scoreType: 'sum' },
  rosenberg: { name: 'Self-Esteem', icon: '🌿', maxScore: 30, scoreType: 'sum' },
  grit: { name: 'Grit', icon: '🔥', maxScore: 5, scoreType: 'average' },
  mindset: { name: 'Growth Mindset', icon: '🌱', maxScore: 6, scoreType: 'average' },
  bigfive: { name: 'Big Five Personality', icon: '🧬', maxScore: 5, scoreType: 'average' },
  perma: { name: 'PERMA Well-Being', icon: '🌻', maxScore: 10, scoreType: 'average' },
  happiness: { name: 'Subjective Happiness', icon: '✨', maxScore: 7, scoreType: 'average' },
  dass21: { name: 'Depression, Anxiety & Stress', icon: '🌊', maxScore: 63, scoreType: 'sum' },
  hope: { name: 'Hope', icon: '🌟', maxScore: 8, scoreType: 'average' },
  selfcompassion: { name: 'Self-Compassion', icon: '💛', maxScore: 5, scoreType: 'average' },
}

function ScoreBar({ score, maxScore, label }: { score: number; maxScore: number; label?: string }) {
  const pct = Math.min((score / maxScore) * 100, 100)
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs text-text-muted mb-1">
          <span>{label}</span>
          <span className="font-semibold text-terracotta">{score}/{maxScore}</span>
        </div>
      )}
      <div className="h-3 bg-cream rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-terracotta to-amber rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function ScoreLevelExplorer({ assessmentType }: { assessmentType: string }) {
  const config = getAssessmentConfig(assessmentType)
  if (!config) return null

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-semibold text-brown-deep">All Score Levels</h4>
      {config.categories.map((cat) => (
        <div key={cat.label} className="bg-cream/50 rounded-xl p-3 border border-[var(--border)]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{cat.emoji}</span>
            <span className="text-sm font-bold text-brown-deep">{cat.label}</span>
            <span className="text-xs text-text-muted ml-auto">
              {cat.min}–{cat.max}
            </span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed mb-1">{cat.description}</p>
          <p className="text-xs text-text-muted/80 leading-relaxed font-[family-name:var(--font-body)]">{cat.insight}</p>
        </div>
      ))}
    </div>
  )
}

function HistoryEntry({ result, meta, isFirst, onDelete }: { result: AssessmentResult; meta: { name: string; icon: string; maxScore: number; scoreType: 'sum' | 'average' }; isFirst: boolean; onDelete: (id: string) => void }) {
  const [confirmDel, setConfirmDel] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const config = getAssessmentConfig(result.assessment_type)
  const category = config?.categories.find(c => c.label === result.category)
  const date = new Date(result.completed_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const handleDelete = async () => {
    setDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.from('assessment_results').delete().eq('id', result.id)
    setDeleting(false)
    if (!error) onDelete(result.id)
  }

  return (
    <div className={`py-3 ${!isFirst ? 'border-t border-[var(--border)]' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="text-lg flex-shrink-0">{category?.emoji || '📊'}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-main">{result.category}</span>
            <span className="text-xs text-text-muted">{date}</span>
          </div>
          <div className="mt-1">
            <ScoreBar score={result.score} maxScore={meta.maxScore} />
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-terracotta">
            {result.score}
          </span>
          <span className="text-xs text-text-muted">/{meta.maxScore}</span>
        </div>
      </div>
      {confirmDel ? (
        <div className="flex items-center gap-3 mt-2 ml-8">
          <span className="text-xs text-text-muted">Delete?</span>
          <button onClick={handleDelete} disabled={deleting} className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer disabled:opacity-50">
            {deleting ? 'Deleting...' : 'Yes'}
          </button>
          <button onClick={() => setConfirmDel(false)} className="text-xs text-text-muted hover:text-brown-deep cursor-pointer">
            No
          </button>
        </div>
      ) : (
        <button onClick={() => setConfirmDel(true)} className="text-xs text-text-muted hover:text-red-600 transition-colors cursor-pointer mt-1 ml-8">
          Delete
        </button>
      )}
    </div>
  )
}

function ShareButtons({ assessmentType, score, subscales }: {
  assessmentType: string
  score: number
  subscales?: { name: string; score: number; maxScore?: number; description: string }[]
}) {
  const [copied, setCopied] = useState(false)
  const [igCopied, setIgCopied] = useState(false)
  const config = getAssessmentConfig(assessmentType)
  if (!config) return null

  const shareData: ShareData = {
    a: config.id,
    s: score,
    ss: subscales?.map(s => ({ n: s.name, s: s.score })),
  }
  const shareUrl = buildShareUrl(shareData)
  const category = config.categories.find(c => score >= c.min && score <= c.max)
  const shareText = `I scored ${score} on the ${config.title}${category ? ` — ${category.label}` : ''}. See where you stand:`

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
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={handleCopyLink}
        className="px-4 py-2 rounded-full border border-terracotta/30 text-terracotta font-semibold text-xs hover:bg-terracotta/5 transition-colors cursor-pointer"
      >
        {copied ? 'Copied!' : '🔗 Copy Link'}
      </button>
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="px-4 py-2 rounded-full border border-sage/30 text-sage font-semibold text-xs hover:bg-sage/5 transition-colors cursor-pointer"
        >
          📤 Share
        </button>
      )}
      <a
        href={`mailto:?subject=${encodeURIComponent(`My ${config.title} Result — Experiment Me`)}&body=${encodeURIComponent(`${shareText}\n\nSee my result:\n${buildShareUrl({ a: config.id, s: score })}\n\nTake the assessment yourself at experimentme.com`)}`}
        className="px-4 py-2 rounded-full border border-brown-mid/30 text-brown-mid font-semibold text-xs hover:bg-brown-mid/5 transition-colors no-underline"
      >
        ✉️ Email
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-full border border-[#1877F2]/30 text-[#1877F2] font-semibold text-xs hover:bg-[#1877F2]/5 transition-colors no-underline"
      >
        Facebook
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-full border border-[#25D366]/30 text-[#25D366] font-semibold text-xs hover:bg-[#25D366]/5 transition-colors no-underline"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-full border border-[#0A66C2]/30 text-[#0A66C2] font-semibold text-xs hover:bg-[#0A66C2]/5 transition-colors no-underline"
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-full border border-[#1DA1F2]/30 text-[#1DA1F2] font-semibold text-xs hover:bg-[#1DA1F2]/5 transition-colors no-underline"
      >
        X
      </a>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
          setIgCopied(true)
          setTimeout(() => setIgCopied(false), 3000)
        }}
        className="px-4 py-2 rounded-full border border-[#E4405F]/30 text-[#E4405F] font-semibold text-xs hover:bg-[#E4405F]/5 transition-colors cursor-pointer"
      >
        {igCopied ? 'Copied! Paste on IG' : 'Instagram'}
      </button>
    </div>
  )
}

function ResultCard({ results, onDelete }: { results: AssessmentResult[]; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const [showLevels, setShowLevels] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.from('assessment_results').delete().eq('id', id)
    setDeleting(false)
    if (!error) {
      setConfirmDelete(null)
      onDelete(id)
    }
  }

  const result = results[0] // Latest result
  const previousResults = results.slice(1) // Older results
  const hasHistory = previousResults.length > 0

  const meta = assessmentMeta[result.assessment_type] || {
    name: result.assessment_type,
    icon: '📊',
    maxScore: result.max_score,
    scoreType: 'sum' as const,
  }

  const config = getAssessmentConfig(result.assessment_type)
  const category = config?.categories.find(c => c.label === result.category)

  const date = new Date(result.completed_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Score change from previous attempt
  const scoreChange = hasHistory ? result.score - previousResults[0].score : null

  // Get subscale data if present
  const subscales = (result.details as { subscales?: { name: string; score: number; maxScore?: number; description: string }[] })?.subscales

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden transition-all">
      {/* Main card — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left cursor-pointer hover:bg-cream/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="text-3xl flex-shrink-0">{meta.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep truncate">
                {meta.name}
              </h3>
              <span className="text-xs text-text-muted flex-shrink-0">{date}</span>
              {hasHistory && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber/20 text-amber font-semibold flex-shrink-0">
                  {results.length}×
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-terracotta">
                {category?.emoji} {result.category}
              </span>
              {(() => {
                const norms = getAssessmentNorms(result.assessment_type)
                if (!norms) return null
                const pct = calculatePercentile(result.score, norms.overall)
                return (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sage/15 text-sage font-bold">
                    {pct}th percentile
                  </span>
                )
              })()}
              {scoreChange !== null && scoreChange !== 0 && (
                <span className={`text-xs font-semibold ${scoreChange > 0 ? 'text-sage' : 'text-terracotta'}`}>
                  {scoreChange > 0 ? '▲' : '▼'} {Math.abs(scoreChange)} from last
                </span>
              )}
            </div>
            {/* Score bar */}
            <div className="mt-3">
              <ScoreBar score={result.score} maxScore={meta.maxScore} />
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-terracotta">
              {result.score}
            </div>
            <div className="text-xs text-text-muted">
              of {meta.maxScore}
              {meta.scoreType === 'average' ? '' : ' pts'}
            </div>
            <div className="text-xs text-text-muted mt-1">
              {expanded ? '▲' : '▼'}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-[var(--border)] pt-4 animate-fade-up">
          {/* Insight */}
          {category && (
            <div className="bg-cream/50 rounded-xl p-4 mb-4">
              <h4 className="font-[family-name:var(--font-heading)] text-base font-bold text-brown-deep mb-2">
                What This Means
              </h4>
              <p className="font-[family-name:var(--font-body)] text-sm text-text-main leading-relaxed">
                {category.insight}
              </p>
            </div>
          )}

          {/* Deep Dive link */}
          <Link
            href={`/learn/${result.assessment_type}`}
            className="inline-block text-sm text-terracotta font-semibold hover:underline no-underline mb-4"
          >
            Deep Dive: History, Validation & Research &rarr;
          </Link>

          {/* Share */}
          <ShareButtons
            assessmentType={result.assessment_type}
            score={result.score}
            subscales={subscales}
          />

          {/* Subscales */}
          {subscales && subscales.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-brown-deep mb-3">Your Subscales</h4>
              <div className="space-y-3">
                {subscales.map((sub: { name: string; score: number; maxScore?: number; description: string }) => (
                  <div key={sub.name}>
                    <ScoreBar
                      score={sub.score}
                      maxScore={sub.maxScore ?? meta.maxScore}
                      label={sub.name}
                    />
                    <p className="text-xs text-text-muted mt-1">{sub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {hasHistory && (
            <div className="mb-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-sm text-amber font-semibold hover:underline cursor-pointer"
              >
                {showHistory ? `Hide history ▲` : `View history (${previousResults.length} previous) ▼`}
              </button>
              {showHistory && (
                <div className="mt-3 bg-cream/30 rounded-xl p-4 animate-fade-up">
                  {previousResults.map((prev, i) => (
                    <HistoryEntry key={prev.id} result={prev} meta={meta} isFirst={i === 0} onDelete={onDelete} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Score Level Explorer Toggle */}
          <button
            onClick={() => setShowLevels(!showLevels)}
            className="text-sm text-terracotta font-semibold hover:underline cursor-pointer"
          >
            {showLevels ? 'Hide all score levels ▲' : 'See what other score levels mean ▼'}
          </button>

          {showLevels && <ScoreLevelExplorer assessmentType={result.assessment_type} />}

          {/* Citation */}
          {config && (
            <p className="text-xs text-text-muted mt-4 leading-relaxed italic">
              {config.citation}
            </p>
          )}

          {/* Delete */}
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            {confirmDelete === result.id ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted">Delete this result? This can&apos;t be undone.</span>
                <button
                  onClick={() => handleDelete(result.id)}
                  disabled={deleting}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Yes, delete'}
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="text-xs text-text-muted hover:text-brown-deep cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(result.id)}
                className="text-xs text-text-muted hover:text-red-600 transition-colors cursor-pointer"
              >
                Delete this result
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Simple radar chart built with SVG — no dependencies
function RadarChart({ results }: { results: AssessmentResult[] }) {
  // Only show assessments that make sense on a radar (skip DASS-21 since higher = worse)
  const radarAssessments = ['swls', 'rosenberg', 'grit', 'mindset', 'happiness', 'hope', 'selfcompassion', 'perma']

  // Get the latest result for each assessment type
  const latestByType = new Map<string, AssessmentResult>()
  results.forEach(r => {
    if (radarAssessments.includes(r.assessment_type) && !latestByType.has(r.assessment_type)) {
      latestByType.set(r.assessment_type, r)
    }
  })

  const entries = Array.from(latestByType.entries())
  if (entries.length < 3) return null // Need at least 3 points for a useful radar

  const size = 280
  const center = size / 2
  const maxRadius = center - 40

  const angleStep = (2 * Math.PI) / entries.length
  const startAngle = -Math.PI / 2 // Start from top

  // Calculate points
  const points = entries.map(([type, result], i) => {
    const meta = assessmentMeta[type]
    const pct = Math.min(result.score / meta.maxScore, 1)
    const angle = startAngle + i * angleStep
    const r = pct * maxRadius
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (maxRadius + 24) * Math.cos(angle),
      labelY: center + (maxRadius + 24) * Math.sin(angle),
      name: meta.name,
      icon: meta.icon,
      pct: Math.round(pct * 100),
    }
  })

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6">
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-4 text-center">
        Your Psychological Profile
      </h2>
      <div className="flex justify-center overflow-visible">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Grid rings */}
          {rings.map(pct => {
            const r = pct * maxRadius
            const ringPoints = entries.map((_, i) => {
              const angle = startAngle + i * angleStep
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
            }).join(' ')
            return (
              <polygon
                key={pct}
                points={ringPoints}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />
            )
          })}

          {/* Axis lines */}
          {entries.map((_, i) => {
            const angle = startAngle + i * angleStep
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={center + maxRadius * Math.cos(angle)}
                y2={center + maxRadius * Math.sin(angle)}
                stroke="var(--border)"
                strokeWidth="1"
              />
            )
          })}

          {/* Data polygon */}
          <polygon
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="rgba(196, 112, 79, 0.15)"
            stroke="var(--terracotta)"
            strokeWidth="2.5"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="var(--terracotta)"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[10px] fill-text-muted"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {p.icon} {p.pct}%
            </text>
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {points.map((p, i) => (
          <span key={i} className="text-xs text-text-muted">
            {p.icon} {p.name}
          </span>
        ))}
      </div>
    </div>
  )
}

// Stats summary card
function ProfileStats({ results }: { results: AssessmentResult[] }) {
  const uniqueAssessments = new Set(results.map(r => r.assessment_type)).size
  const totalCompleted = results.length

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-4 text-center">
        <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-terracotta">
          {uniqueAssessments}
        </div>
        <div className="text-xs text-text-muted mt-1">Assessments</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-4 text-center">
        <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-terracotta">
          {totalCompleted}
        </div>
        <div className="text-xs text-text-muted mt-1">Completed</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-4 text-center">
        <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-terracotta">
          {10 - uniqueAssessments}
        </div>
        <div className="text-xs text-text-muted mt-1">Remaining</div>
      </div>
    </div>
  )
}

export function ProfileResults({ results: initialResults }: { results: AssessmentResult[] }) {
  const [results, setResults] = useState(initialResults)

  const handleDelete = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id))
  }

  // Group results by assessment type, latest first (already sorted by completed_at desc)
  const grouped = new Map<string, AssessmentResult[]>()
  results.forEach(r => {
    const existing = grouped.get(r.assessment_type) || []
    existing.push(r)
    grouped.set(r.assessment_type, existing)
  })

  // Order groups by latest attempt date (first result in each group is the latest)
  const sortedGroups = Array.from(grouped.values()).sort(
    (a, b) => new Date(b[0].completed_at).getTime() - new Date(a[0].completed_at).getTime()
  )

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
        <div className="text-5xl mb-4">&#x1F52C;</div>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-3">
          No Results Yet
        </h2>
        <p className="text-text-muted font-[family-name:var(--font-body)] mb-6 max-w-md mx-auto">
          Take your first assessment to start building your evidence-based psychological profile.
        </p>
        <Link
          href="/#assessments"
          className="inline-block px-6 py-3 rounded-xl bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
        >
          Browse Assessments
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Stats bar */}
      <ProfileStats results={results} />

      {/* Radar chart */}
      <RadarChart results={results} />

      {/* Individual results — grouped by assessment */}
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
        Your Results
      </h2>
      <div className="space-y-4">
        {sortedGroups.map((groupResults) => (
          <ResultCard key={groupResults[0].assessment_type} results={groupResults} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
