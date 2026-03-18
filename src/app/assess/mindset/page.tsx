import { AssessmentRunner } from '@/components/AssessmentRunner'
import { mindsetConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growth Mindset Assessment — Experiment Me',
  description: "Take the Growth Mindset Scale based on Carol Dweck's research. 8 questions, 3 minutes, instant personalized results.",
}

export default function MindsetPage() {
  return <AssessmentRunner config={mindsetConfig} />
}
