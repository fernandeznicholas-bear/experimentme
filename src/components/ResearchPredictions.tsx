'use client'

import { useState } from 'react'

interface ResearchFindings {
  overview: string
  predictions: {
    icon: string
    domain: string
    finding: string
    citation: string
  }[]
  keyInsight: string
}

export function ResearchPredictions({
  findings,
  findingIndex: externalIndex,
  setFindingIndex: externalSetIndex,
}: {
  findings: ResearchFindings
  findingIndex?: number
  setFindingIndex?: (i: number) => void
}) {
  const [internalIndex, setInternalIndex] = useState(0)
  const idx = externalIndex ?? internalIndex
  const setIdx = externalSetIndex ?? setInternalIndex

  const predictions = findings.predictions
  const total = predictions.length
  // last "card" is the key insight
  const isKeyInsight = idx === total
  const totalCards = total + 1

  const goNext = () => setIdx(Math.min(idx + 1, total))
  const goPrev = () => setIdx(Math.max(idx - 1, 0))

  const pred = !isKeyInsight ? predictions[idx] : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔬</span>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep">
            What Research Predicts
          </h3>
        </div>
        <span className="text-xs text-text-muted font-mono">
          {idx + 1}/{totalCards}
        </span>
      </div>

      {/* Card */}
      <div className="relative min-h-[200px]">
        {isKeyInsight ? (
          <div key="insight" className="animate-fade-up">
            <div className="rounded-xl bg-sage/10 border border-sage/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <span className="font-[family-name:var(--font-heading)] text-base font-bold text-brown-deep">
                  The Bottom Line
                </span>
              </div>
              <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed">
                {findings.keyInsight}
              </p>
            </div>
          </div>
        ) : pred && (
          <div key={idx} className="animate-fade-up">
            <div className="rounded-xl bg-cream/40 border border-[var(--border)] p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{pred.icon}</span>
                <span className="font-[family-name:var(--font-heading)] text-base font-bold text-brown-deep">
                  {pred.domain}
                </span>
              </div>
              <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed mb-3">
                {pred.finding}
              </p>
              <p className="font-mono text-[10px] text-text-muted">
                {pred.citation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goPrev}
          disabled={idx === 0}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            idx === 0 ? 'text-text-muted/30 cursor-default' : 'text-brown-deep hover:bg-cream'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Prev
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalCards }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`rounded-full transition-all cursor-pointer ${
                i === idx
                  ? 'w-5 h-2 bg-terracotta'
                  : 'w-2 h-2 bg-brown-deep/15 hover:bg-brown-deep/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={idx === total}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            idx === total ? 'text-text-muted/30 cursor-default' : 'text-brown-deep hover:bg-cream'
          }`}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}
