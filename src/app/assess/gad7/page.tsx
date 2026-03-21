import { AssessmentRunner } from '@/components/AssessmentRunner'
import { gad7Config } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anxiety Screening (GAD-7) — Experiment Me',
  description: 'The GAD-7 screens for generalized anxiety disorder severity. 7 questions, 2 minutes. Not a diagnostic tool.',
}

export default function GAD7Page() {
  return <AssessmentRunner config={gad7Config} />
}
