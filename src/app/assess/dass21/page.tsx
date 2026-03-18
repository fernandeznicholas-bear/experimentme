import { AssessmentRunner } from '@/components/AssessmentRunner'
import { dass21Config } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Depression, Anxiety & Stress Assessment — Experiment Me',
  description: 'The DASS-21 measures recent symptoms of depression, anxiety, and stress. 21 questions, 5 minutes. Not a diagnostic tool.',
}

export default function DASS21Page() {
  return <AssessmentRunner config={dass21Config} />
}
