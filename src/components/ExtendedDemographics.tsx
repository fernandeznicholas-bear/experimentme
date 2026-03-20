'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface Props {
  userId: string
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

const ETHNICITIES = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black or African American' },
  { value: 'hispanic-latino', label: 'Hispanic or Latino' },
  { value: 'asian', label: 'Asian' },
  { value: 'native-american', label: 'American Indian or Alaska Native' },
  { value: 'pacific-islander', label: 'Native Hawaiian or Pacific Islander' },
  { value: 'multiracial', label: 'Multiracial' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

const EMPLOYMENT = [
  { value: 'employed-full', label: 'Employed full-time' },
  { value: 'employed-part', label: 'Employed part-time' },
  { value: 'self-employed', label: 'Self-employed' },
  { value: 'student', label: 'Student' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'other', label: 'Other' },
]

const RELATIONSHIPS = [
  { value: 'single', label: 'Single' },
  { value: 'in-relationship', label: 'In a relationship' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

const INCOME = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-50k', label: '$25,000 – $50,000' },
  { value: '50k-75k', label: '$50,000 – $75,000' },
  { value: '75k-100k', label: '$75,000 – $100,000' },
  { value: '100k-150k', label: '$100,000 – $150,000' },
  { value: '150k+', label: '$150,000+' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

// Common countries — user types for more
const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'IN', label: 'India' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'South Korea' },
  { value: 'PH', label: 'Philippines' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'IE', label: 'Ireland' },
  { value: 'SG', label: 'Singapore' },
  { value: 'OTHER', label: 'Other' },
]

interface DemographicData {
  age_range: string | null
  gender: string | null
  gender_self_describe: string | null
  education: string | null
  ethnicity: string | null
  country: string | null
  employment_status: string | null
  relationship_status: string | null
  household_income: string | null
  quick_completed: boolean
  extended_completed: boolean
}

export function ExtendedDemographics({ userId }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [data, setData] = useState<DemographicData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Form state
  const [ageRange, setAgeRange] = useState('')
  const [gender, setGender] = useState('')
  const [genderSelfDescribe, setGenderSelfDescribe] = useState('')
  const [education, setEducation] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [country, setCountry] = useState('')
  const [employment, setEmployment] = useState('')
  const [relationship, setRelationship] = useState('')
  const [income, setIncome] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('user_demographics')
      .select('*')
      .eq('user_id', userId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data: rows }: any) => {
        if (rows && rows.length > 0) {
          const d = rows[0] as DemographicData
          setData(d)
          setAgeRange(d.age_range || '')
          setGender(d.gender || '')
          setGenderSelfDescribe(d.gender_self_describe || '')
          setEducation(d.education || '')
          setEthnicity(d.ethnicity || '')
          setCountry(d.country || '')
          setEmployment(d.employment_status || '')
          setRelationship(d.relationship_status || '')
          setIncome(d.household_income || '')
        }
        setLoading(false)
      })
  }, [userId])

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const payload = {
      user_id: userId,
      age_range: ageRange || null,
      gender: gender || null,
      gender_self_describe: gender === 'self-describe' ? genderSelfDescribe : null,
      education: education || null,
      ethnicity: ethnicity || null,
      country: country || null,
      employment_status: employment || null,
      relationship_status: relationship || null,
      household_income: income || null,
      quick_completed: true,
      extended_completed: true,
      updated_at: new Date().toISOString(),
    }

    await supabase.from('user_demographics').upsert(payload, { onConflict: 'user_id' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return null

  const filledQuick = !!(data?.age_range && data?.gender && data?.education)
  const filledExtended = !!(data?.ethnicity || data?.country || data?.employment_status || data?.relationship_status || data?.household_income)
  const completionCount = [ageRange, gender, education, ethnicity, country, employment, relationship, income].filter(Boolean).length
  const completionPct = Math.round((completionCount / 8) * 100)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left cursor-pointer hover:bg-cream/30 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-brown-deep mb-1">
              Demographic Profile
            </h3>
            <p className="text-sm text-text-muted">
              {completionCount === 0
                ? 'Help contextualize your results by sharing a bit about yourself.'
                : `${completionCount} of 8 fields completed (${completionPct}%)`
              }
            </p>
          </div>
          <div className="flex items-center gap-3">
            {completionCount > 0 && (
              <div className="w-12 h-12 relative">
                <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none" stroke="var(--cream)" strokeWidth="3"
                  />
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none" stroke="var(--sage)" strokeWidth="3"
                    strokeDasharray={`${completionPct} ${100 - completionPct}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
            <span className="text-xs text-text-muted">{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-[var(--border)] pt-4 animate-fade-up">
          <p className="text-xs text-text-muted mb-6 font-[family-name:var(--font-body)] leading-relaxed">
            This information is optional and used only to help contextualize research. All fields can be skipped.
            Your data is never shared individually.
          </p>

          <div className="space-y-5">
            {/* Quick demographics */}
            <h4 className="text-xs font-semibold text-terracotta uppercase tracking-wider">Basic</h4>

            <SelectField label="Age Range" value={ageRange} onChange={setAgeRange} options={AGE_RANGES} />
            <SelectField label="Gender" value={gender} onChange={setGender} options={GENDERS} />
            {gender === 'self-describe' && (
              <div>
                <label className="block text-sm font-semibold text-brown-deep mb-1.5">How do you identify?</label>
                <input
                  type="text"
                  value={genderSelfDescribe}
                  onChange={(e) => setGenderSelfDescribe(e.target.value)}
                  placeholder="Your identity"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-cream/20 text-brown-deep placeholder:text-text-muted/50 focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm"
                />
              </div>
            )}
            <SelectField label="Education Level" value={education} onChange={setEducation} options={EDUCATION_LEVELS} />

            {/* Extended demographics */}
            <h4 className="text-xs font-semibold text-terracotta uppercase tracking-wider pt-2">Extended (Optional)</h4>

            <SelectField label="Ethnicity / Race" value={ethnicity} onChange={setEthnicity} options={ETHNICITIES} />
            <SelectField label="Country of Residence" value={country} onChange={setCountry} options={COUNTRIES} />
            <SelectField label="Employment Status" value={employment} onChange={setEmployment} options={EMPLOYMENT} />
            <SelectField label="Relationship Status" value={relationship} onChange={setRelationship} options={RELATIONSHIPS} />
            <SelectField label="Household Income" value={income} onChange={setIncome} options={INCOME} />
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-xs text-text-muted">
              {saved && <span className="text-sage font-semibold">Saved!</span>}
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terracotta-dark transition-colors cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Demographics'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SelectField({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brown-deep mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-cream/20 text-brown-deep focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm appearance-none"
      >
        <option value="">— Select —</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
