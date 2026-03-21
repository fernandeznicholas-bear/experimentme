import { AssessmentRunner } from '@/components/AssessmentRunner'
import { who5Config } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Well-Being Index (WHO-5) — Experiment Me',
  description: 'The WHO-5 measures subjective well-being over the past two weeks. 5 questions, 1 minute.',
}

export default function WHO5Page() {
  return <AssessmentRunner config={who5Config} />
}
