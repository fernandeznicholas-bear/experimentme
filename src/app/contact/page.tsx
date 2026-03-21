import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-brown-deep mb-2">
            Contact & Support
          </h1>
          <p className="text-text-muted font-[family-name:var(--font-body)]">
            Have a question, found a bug, or want to share feedback? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Get in Touch */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-3">
            Get in Touch
          </h2>
          <p className="text-text-muted font-[family-name:var(--font-body)] mb-4">
            The fastest way to reach us is by email. We typically respond within 24 hours.
          </p>
          <a
            href="mailto:support@experimentme.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors no-underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            support@experimentme.com
          </a>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-text-main text-sm mb-1">Are the assessments scientifically validated?</h3>
              <p className="text-text-muted text-sm font-[family-name:var(--font-body)]">
                Yes. Every assessment on Experiment Me comes from peer-reviewed psychological research.
                We use the original validated scales and scoring methods published by their authors.
              </p>
            </div>
            <div className="border-t border-[var(--border)] pt-4">
              <h3 className="font-semibold text-text-main text-sm mb-1">Is my data private?</h3>
              <p className="text-text-muted text-sm font-[family-name:var(--font-body)]">
                Absolutely. Your results are stored securely and only you can access them.
                If you choose to share data for research, it is fully anonymized and opt-in.
                See our{' '}
                <Link href="/privacy" className="text-terracotta hover:underline">Privacy Policy</Link> for details.
              </p>
            </div>
            <div className="border-t border-[var(--border)] pt-4">
              <h3 className="font-semibold text-text-main text-sm mb-1">Can I delete my account and data?</h3>
              <p className="text-text-muted text-sm font-[family-name:var(--font-body)]">
                Yes. Go to{' '}
                <Link href="/settings" className="text-terracotta hover:underline">Settings</Link>{' '}
                and scroll to the bottom to permanently delete your account and all associated data.
              </p>
            </div>
            <div className="border-t border-[var(--border)] pt-4">
              <h3 className="font-semibold text-text-main text-sm mb-1">How are percentiles calculated?</h3>
              <p className="text-text-muted text-sm font-[family-name:var(--font-body)]">
                Percentiles are based on published population norms from the original research studies.
                They show how your score compares to representative samples from the general population.
              </p>
            </div>
            <div className="border-t border-[var(--border)] pt-4">
              <h3 className="font-semibold text-text-main text-sm mb-1">Is Experiment Me free?</h3>
              <p className="text-text-muted text-sm font-[family-name:var(--font-body)]">
                All core assessments are free. Premium features may be added in the future, but
                the validated assessments will always be available at no cost.
              </p>
            </div>
          </div>
        </div>

        {/* Report a Bug */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-3">
            Report a Bug
          </h2>
          <p className="text-text-muted font-[family-name:var(--font-body)] mb-4">
            Found something that doesn&apos;t work as expected? Let us know so we can fix it.
            Please include what you were doing when the issue occurred and any error messages you saw.
          </p>
          <a
            href="mailto:support@experimentme.com?subject=Bug%20Report%20-%20Experiment%20Me"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-terracotta/30 text-terracotta font-semibold text-sm hover:bg-terracotta/5 transition-colors no-underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            Report a Bug
          </a>
        </div>
      </div>
    </div>
  )
}
