import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-block px-4 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-semibold tracking-wider uppercase mb-6">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-brown-deep leading-tight mb-4">
            Terms of Use
          </h1>
          <p className="text-sm text-text-muted">Last updated: March 2026</p>
        </div>

        {/* Use of Service */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Use of Service
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <p>
              Experiment Me is a platform for science-based self-discovery. By using this service,
              you agree to the following terms.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>You must be at least 18 years old to create an account or take assessments.</li>
              <li>Assessments are for educational and research purposes only. They are not clinical diagnoses.</li>
              <li>Results should not be used as a substitute for professional psychological or medical advice.</li>
            </ul>
          </div>
        </div>

        {/* Accounts */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Accounts
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <p>
              You are responsible for maintaining the security of your account and password.
              Please use a unique, strong password.
            </p>
            <p>
              One account per person. Do not create multiple accounts or share account credentials.
            </p>
          </div>
        </div>

        {/* Assessment Instruments */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Assessment Instruments
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <p>
              The assessments on Experiment Me are based on published, peer-reviewed psychological instruments.
              Original authors and citations are credited on each assessment page.
              These instruments are used for educational and research purposes.
            </p>
          </div>
        </div>

        {/* Research Data */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Research Data Sharing
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <p>
              If you opt in to research data sharing, your anonymous assessment data may be used
              in academic research. Consent is voluntary and can be withdrawn at any time.
              See our{' '}
              <Link href="/privacy" className="text-terracotta font-semibold hover:underline">
                Privacy Policy
              </Link>{' '}
              for full details on what data is shared and how.
            </p>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Limitation of Liability
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <p>
              Experiment Me is provided &ldquo;as is&rdquo; without warranty of any kind. Assessment results
              are for informational and educational purposes only.
            </p>
            <p>
              We are not responsible for decisions made based on assessment results.
              If you are experiencing a mental health crisis, please contact the{' '}
              <strong>988 Suicide &amp; Crisis Lifeline</strong> (call or text 988)
              or your local emergency services.
            </p>
          </div>
        </div>

        {/* Changes */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Changes to These Terms
          </h2>
          <div className="font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            <p>
              We may update these terms from time to time. Continued use of the service after
              changes are posted constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-14">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-brown-deep mb-4">
            Questions?
          </h2>
          <p className="font-[family-name:var(--font-body)] text-text-main leading-relaxed">
            If you have questions about these terms, please reach out at{' '}
            <a href="mailto:hello@experimentme.com" className="text-terracotta font-semibold hover:underline">
              hello@experimentme.com
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
