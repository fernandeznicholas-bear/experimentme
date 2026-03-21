import { AssessmentRunner } from '@/components/AssessmentRunner'
import { pcl5Config } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PTSD Screening (PCL-5) — Experiment Me',
  description: 'The PCL-5 screens for PTSD symptoms over the past month. 20 questions, 5 minutes. Not a diagnostic tool.',
}

export default function PCL5Page() {
  return <AssessmentRunner config={pcl5Config} />
}
