'use client'

import { use } from 'react'
import Link from 'next/link'
import { decodeShareData } from '@/lib/share'
import { getAssessmentConfig } from '@/lib/assessments'
import { ShareCard } from '@/components/ShareCard'

export default function SharePage({ params }: { params: Promise<{ data: string }> }) {
  const { data } = use(params)
  const shareData = decodeShareData(data)

  if (!shareData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Invalid share link
          </h1>
          <p className="text-text-muted mb-6">This link may be expired or malformed.</p>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
          >
            Explore Assessments
          </Link>
        </div>
      </div>
    )
  }

  const config = getAssessmentConfig(shareData.a)
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Assessment not found
          </h1>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
          >
            Explore Assessments
          </Link>
        </div>
      </div>
    )
  }

  const category = config.categories.find(c => shareData.s >= c.min && shareData.s <= c.max) || config.categories[config.categories.length - 1]
  const maxScore = config.scoreType === 'average' ? config.scaleMax : config.questions.length * config.scaleMax

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-xl mx-auto">
        {/* Eyebrow */}
        <p className="text-center text-xs text-text-muted uppercase tracking-wider font-semibold mb-6">
          Shared Result from Experiment Me
        </p>

        {/* Share card */}
        <ShareCard
          assessmentTitle={config.title}
          score={shareData.s}
          maxScore={maxScore}
          categoryLabel={category.label}
          categoryEmoji={category.emoji}
          categoryDescription={category.description}
          subscales={shareData.ss}
        />

        {/* Insight */}
        <div className="bg-cream/50 rounded-2xl border border-[var(--border)] p-6 mb-6">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-3">
            What This Means
          </h3>
          <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed">
            {category.insight}
          </p>
        </div>

        {/* Deep Dive link */}
        <div className="text-center mb-6">
          <Link
            href={`/learn/${config.id}`}
            className="text-sm text-terracotta font-semibold hover:underline no-underline"
          >
            Deep Dive: History, Validation & Research &rarr;
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center mb-6">
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-2">
            Want to see where you stand?
          </h3>
          <p className="text-text-muted text-sm mb-6 font-[family-name:var(--font-body)]">
            Take the {config.title} yourself — it only takes {config.questions.length <= 5 ? '2' : config.questions.length <= 12 ? '3' : '5'} minutes.
          </p>
          <Link
            href={`/assess/${config.id}`}
            className="inline-block px-8 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
          >
            Take This Assessment
          </Link>
        </div>

        {/* Browse more */}
        <p className="text-center text-sm text-text-muted">
          <Link href="/#assessments" className="text-terracotta font-semibold hover:underline no-underline">
            Browse all {10} assessments
          </Link>{' '}
          on Experiment Me
        </p>

        {/* Citation */}
        <p className="text-xs text-text-muted text-center mt-8 max-w-md mx-auto leading-relaxed">
          {config.citation}
        </p>
      </div>
    </div>
  )
}
