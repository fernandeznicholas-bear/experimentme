'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface Props {
  userId: string
  onComplete: () => void
  onSkip: () => void
}

const AGE_RANGES = [
  { value: '18-24', label: '18–24' },
  { value: '25-34', label: '25–34' },
  { value: '35-44', label: '35–44' },
  { value: '45-54', label: '45–54' },
  { value: '55-64', label: '55–64' },
  { value: '65+', label: '65+' },
]

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'self-describe', label: 'I self-describe' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

const EDUCATION_LEVELS = [
  { value: 'high-school', label: 'High school or equivalent' },
  { value: 'some-college', label: 'Some college' },
  { value: 'bachelors', label: "Bachelor's degree" },
  { value: 'masters', label: "Master's degree" },
  { value: 'doctorate', label: 'Doctorate' },
  { value: 'other', label: 'Other' },
]

export function DemographicQuickAsk({ userId, onComplete, onSkip }: Props) {
  const [step, setStep] = useState(0)
  const [ageRange, setAgeRange] = useState('')
  const [gender, setGender] = useState('')
  const [genderSelfDescribe, setGenderSelfDescribe] = useState('')
  const [education, setEducation] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('user_demographics').upsert({
      user_id: userId,
      age_range: ageRange || null,
      gender: gender || null,
      gender_self_describe: gender === 'self-describe' ? genderSelfDescribe : null,
      education: education || null,
      quick_completed: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    setSaving(false)
    if (!error) {
      onComplete()
    }
  }

  const questions = [
    {
      title: 'What is your age range?',
      subtitle: 'This helps contextualize your results within population norms.',
      options: AGE_RANGES,
      value: ageRange,
      onChange: setAgeRange,
    },
    {
      title: 'How do you identify?',
      subtitle: 'Many psychological measures show meaningful patterns across gender.',
      options: GENDERS,
      value: gender,
      onChange: setGender,
    },
    {
      title: 'What is your education level?',
      subtitle: 'Education is one of the most common demographic variables in research.',
      options: EDUCATION_LEVELS,
      value: education,
      onChange: setEducation,
    },
  ]

  const currentQ = questions[step]
  const isLastStep = step === questions.length - 1
  const canProceed = step === 0 ? !!ageRange : step === 1 ? !!gender : !!education

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] p-6 mb-6 animate-fade-up">
      <div className="text-center mb-6">
        <p className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage text-[10px] font-semibold tracking-wider uppercase mb-3">
          Quick Profile &middot; {step + 1} of {questions.length}
        </p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-brown-deep mb-1">
          Help us understand our participants
        </h3>
        <p className="text-sm text-text-muted font-[family-name:var(--font-body)]">
          3 quick questions to help contextualize research. Completely optional.
        </p>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-cream rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-sage rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-1">
          {currentQ.title}
        </p>
        <p className="text-xs text-text-muted mb-4">
          {currentQ.subtitle}
        </p>

        <div className="space-y-2">
          {currentQ.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => currentQ.onChange(opt.value)}
              className={`w-full py-3 px-4 rounded-xl border text-sm font-medium text-left transition-all cursor-pointer ${
                currentQ.value === opt.value
                  ? 'bg-sage/10 border-sage/40 text-sage'
                  : 'border-[var(--border)] bg-cream/30 text-text-main hover:bg-sage/5 hover:border-sage/20'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Self-describe text input */}
        {step === 1 && gender === 'self-describe' && (
          <input
            type="text"
            value={genderSelfDescribe}
            onChange={(e) => setGenderSelfDescribe(e.target.value)}
            placeholder="How do you identify?"
            className="w-full mt-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-cream/20 text-brown-deep placeholder:text-text-muted/50 focus:outline-none focus:border-sage/40 focus:ring-2 focus:ring-sage/10 transition-all text-sm"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm text-text-muted hover:text-brown-deep transition-colors cursor-pointer"
            >
              &larr; Back
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            className="text-sm text-text-muted hover:text-brown-deep transition-colors cursor-pointer"
          >
            Skip
          </button>
          {isLastStep ? (
            <button
              onClick={handleSave}
              disabled={!canProceed || saving}
              className="px-6 py-2.5 rounded-full bg-sage text-white font-semibold text-sm hover:bg-sage/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Done'}
            </button>
          ) : (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed}
              className="px-6 py-2.5 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
