import { AssessmentRunner } from '@/components/AssessmentRunner'
import { phq9Config } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Depression Screening (PHQ-9) — Experiment Me',
  description: 'The PHQ-9 screens for depression severity over the past two weeks. 9 questions, 3 minutes. Not a diagnostic tool.',
}

export default function PHQ9Page() {
  return <AssessmentRunner config={phq9Config} />
}
