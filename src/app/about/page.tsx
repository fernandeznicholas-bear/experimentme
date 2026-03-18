import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block px-4 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-semibold tracking-wider uppercase mb-6">
            Why We Exist
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-brown-deep leading-tight mb-6">
            Research Should Be a
            <br />
            <span className="italic text-terracotta">Conversation</span>
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg text-text-muted leading-relaxed max-w-xl mx-auto">
            Not a one-way transaction.
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            The Problem
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed mb-4">
            For decades, psychological research has followed the same pattern: participants give their time, their honesty, their data — and get nothing back. No results. No insight. No understanding of what their answers actually mean.
          </p>
          <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            Researchers, meanwhile, struggle to find engaged participants who genuinely care about the questions being asked. The result is a system where neither side gets what they deserve.
          </p>
        </div>

        {/* The Idea */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            A Simple Idea
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed mb-4">
            What if every time someone participated in research, they learned something real about themselves?
          </p>
          <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed mb-4">
            Experiment Me was built by an educator who spent years watching the disconnect between researchers and participants — and believed it didn't have to be that way.
          </p>
          <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            The idea is simple: give people their results. Use validated instruments. Explain what the science actually says. Turn participation into self-discovery.
          </p>
        </div>

        {/* What We Believe */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            What We Believe
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'Participants deserve to know.',
                body: 'If someone takes the time to answer honestly, they deserve to understand what their answers reveal. Every assessment on Experiment Me gives something back.',
              },
              {
                title: 'Science should be accessible.',
                body: 'The tools psychologists use to understand human behavior shouldn\'t be locked behind academic paywalls. Validated assessments belong in the hands of curious people.',
              },
              {
                title: 'Better participants make better science.',
                body: 'When people are genuinely invested — when they care about the outcome — the data is better. Engagement produces quality. Reciprocity produces engagement.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-cream/50 rounded-2xl border border-[var(--border)] p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-2">
                  {item.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-text-muted text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-sage/10 rounded-2xl border border-sage/20 p-10">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-3">
            See for yourself.
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-muted mb-6 max-w-md mx-auto">
            Take a validated assessment. Get your results. Understand what the science says about people like you.
          </p>
          <Link
            href="/#assessments"
            className="inline-block px-7 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terracotta-dark transition-colors no-underline"
          >
            Take an Assessment
          </Link>
        </div>

      </div>
    </main>
  )
}
