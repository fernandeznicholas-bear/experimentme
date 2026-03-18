import { AssessmentRunner } from '@/components/AssessmentRunner'
import { gritConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grit Scale Assessment — Experiment Me',
  description: "Take the Short Grit Scale (Grit-S) by Angela Duckworth. 8 questions, 3 minutes, instant personalized results.",
}

export default function GritPage() {
  return <AssessmentRunner config={gritConfig} />
}
