import { AssessmentRunner } from '@/components/AssessmentRunner'
import { selfcompassionConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Self-Compassion Assessment — Experiment Me',
  description: 'How do you treat yourself when things go wrong? Take the Self-Compassion Scale Short Form. 12 questions, 3 minutes.',
}

export default function SelfCompassionPage() {
  return <AssessmentRunner config={selfcompassionConfig} />
}
