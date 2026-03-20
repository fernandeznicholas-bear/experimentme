import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block px-4 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-semibold tracking-wider uppercase mb-6">
            Your Data, Your Control
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-brown-deep leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-muted">Last updated: March 2026</p>
        </div>

        {/* What We Collect */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            What We Collect
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <p>When you use Experiment Me, we collect the following information:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Account information</strong> — Your email address and password (encrypted) when you create an account.</li>
              <li><strong>Assessment responses</strong> — Your scores, categories, and subscale results for each assessment you complete.</li>
              <li><strong>Demographic information</strong> — Age range, gender, education level, and other demographics you optionally provide.</li>
              <li><strong>Usage data</strong> — Timestamps of when assessments are completed.</li>
            </ul>
          </div>
        </div>

        {/* How We Use Your Data */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            How We Use Your Data
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <div className="bg-cream/50 rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-2">
                Your personal results
              </h3>
              <p>Your assessment results are shown only to you. They power your profile page, radar chart, score history, and percentile comparisons. This data is never shared with anyone unless you explicitly opt in.</p>
            </div>
            <div className="bg-cream/50 rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-2">
                Anonymous research data (opt-in only)
              </h3>
              <p>If you choose to contribute to research, your anonymous scores and demographic information may be included in research datasets. This is entirely optional and requires your explicit consent. You can opt in or out at any time from your profile page.</p>
            </div>
          </div>
        </div>

        {/* What Anonymous Means */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            What &ldquo;Anonymous&rdquo; Means
          </h2>
          <div className="font-[family-name:var(--font-body)] text-text-main leading-relaxed space-y-4">
            <p>When we say your data is anonymous, we mean it. Anonymous research data includes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-sage/10 rounded-xl p-4 border border-sage/20">
                <p className="font-semibold text-brown-deep mb-2">Included</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  <li>Assessment scores and categories</li>
                  <li>Subscale scores</li>
                  <li>Demographic info (age range, gender, education)</li>
                  <li>Date of completion (day only)</li>
                </ul>
              </div>
              <div className="bg-terracotta/10 rounded-xl p-4 border border-terracotta/20">
                <p className="font-semibold text-brown-deep mb-2">Never included</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  <li>Email address or name</li>
                  <li>User ID or account identifier</li>
                  <li>Individual item-level answers</li>
                  <li>IP address</li>
                  <li>Exact timestamps</li>
                </ul>
              </div>
            </div>
            <p>Once data is anonymized, it cannot be traced back to you — not even by us.</p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Your Rights
          </h2>
          <div className="space-y-3 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            {[
              { title: 'View your data', desc: 'All your results and demographics are visible on your profile page.' },
              { title: 'Delete your data', desc: 'You can delete individual results or all results for any assessment from your profile.' },
              { title: 'Withdraw consent', desc: 'Toggle research sharing off at any time from your profile. Future data will not be shared.' },
              { title: 'Delete your account', desc: 'Contact us to request full account deletion. All personal data will be permanently removed.' },
            ].map(item => (
              <div key={item.title} className="bg-cream/50 rounded-xl p-4 border border-[var(--border)]">
                <p className="font-semibold text-brown-deep">{item.title}</p>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
            <p className="text-sm text-text-muted italic">
              Note: Previously shared anonymous data cannot be recalled after consent is withdrawn,
              as it contains no identifying information that would allow us to locate it.
            </p>
          </div>
        </div>

        {/* Data Security */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Data Security
          </h2>
          <div className="font-[family-name:var(--font-body)] text-text-main leading-relaxed space-y-4">
            <p>
              Your data is stored securely using Supabase infrastructure with row-level security policies
              that ensure you can only access your own data. All data is encrypted in transit (TLS)
              and at rest.
            </p>
            <p>
              Passwords are hashed using industry-standard algorithms and are never stored in plain text.
            </p>
          </div>
        </div>

        {/* Third Parties */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Third Parties
          </h2>
          <div className="font-[family-name:var(--font-body)] text-text-main leading-relaxed space-y-4">
            <p>
              We do not sell your data to anyone. Anonymous research data may be shared in
              aggregate in academic publications, but individual-level data is never disclosed
              to third parties for commercial purposes.
            </p>
            <p>
              We use Supabase for authentication and data storage, and Vercel for hosting.
              These services process data under their own privacy policies as necessary to
              provide infrastructure services.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Questions?
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            If you have questions about your data or this policy, please reach out at{' '}
            <a href="mailto:privacy@experimentme.com" className="text-terracotta font-semibold hover:underline">
              privacy@experimentme.com
            </a>.
          </p>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-terracotta font-semibold text-sm hover:underline no-underline"
          >
            &larr; Back to Experiment Me
          </Link>
        </div>

      </div>
    </main>
  )
}
