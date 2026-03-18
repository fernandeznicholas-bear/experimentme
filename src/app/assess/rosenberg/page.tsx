import { AssessmentRunner } from '@/components/AssessmentRunner'
import { rosenbergConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Self-Esteem Assessment — Experiment Me',
  description: 'Take the Rosenberg Self-Esteem Scale and discover how you see yourself. 10 questions, 2 minutes, instant personalized results.',
}

export default function RosenbergPage() {
  return <AssessmentRunner config={rosenbergConfig} />
}
