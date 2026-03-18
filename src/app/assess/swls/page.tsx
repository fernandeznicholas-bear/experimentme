import { AssessmentRunner } from '@/components/AssessmentRunner'
import { swlsConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Life Satisfaction Assessment — Experiment Me',
  description: 'Take the Satisfaction With Life Scale (SWLS) and discover where you stand. 5 questions, 2 minutes, instant personalized results.',
}

export default function SWLSPage() {
  return <AssessmentRunner config={swlsConfig} />
}
