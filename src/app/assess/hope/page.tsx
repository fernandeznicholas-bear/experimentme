import { AssessmentRunner } from '@/components/AssessmentRunner'
import { hopeConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hope Scale Assessment — Experiment Me',
  description: 'Measure your goal-directed thinking with the Adult Hope Scale. 12 questions, 3 minutes, instant personalized results.',
}

export default function HopePage() {
  return <AssessmentRunner config={hopeConfig} />
}
