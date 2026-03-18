import { AssessmentRunner } from '@/components/AssessmentRunner'
import { happinessConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subjective Happiness Assessment — Experiment Me',
  description: 'How happy are you? Take the shortest validated happiness measure in psychology. 4 questions, 1 minute, instant results.',
}

export default function HappinessPage() {
  return <AssessmentRunner config={happinessConfig} />
}
