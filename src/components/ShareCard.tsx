interface ShareCardProps {
  assessmentTitle: string
  score: number
  maxScore: number
  categoryLabel: string
  categoryEmoji: string
  categoryDescription: string
  subscales?: { n: string; s: number }[]
}

export function ShareCard({
  assessmentTitle,
  score,
  maxScore,
  categoryLabel,
  categoryEmoji,
  categoryDescription,
  subscales,
}: ShareCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center mb-6">
      {/* Brand */}
      <p className="text-xs text-text-muted font-semibold tracking-wider uppercase mb-4">
        experimentme.com
      </p>

      {/* Assessment name */}
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-4">
        {assessmentTitle}
      </h2>

      {/* Score */}
      <div className="font-[family-name:var(--font-heading)] text-6xl font-bold text-terracotta mb-1">
        {score}
        <span className="text-xl text-text-muted font-normal">/{maxScore}</span>
      </div>

      {/* Category */}
      <div className="text-3xl my-3">{categoryEmoji}</div>
      <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-2">
        {categoryLabel}
      </h3>
      <p className="text-text-muted font-[family-name:var(--font-body)] mb-4">
        {categoryDescription}
      </p>

      {/* Subscales */}
      {subscales && subscales.length > 0 && (
        <div className="border-t border-[var(--border)] pt-4 mt-4">
          <div className="flex flex-wrap justify-center gap-3">
            {subscales.map((sub) => (
              <div key={sub.n} className="bg-cream/50 rounded-lg px-3 py-2 text-center">
                <div className="text-xs text-text-muted">{sub.n}</div>
                <div className="text-sm font-bold text-terracotta">{sub.s}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
