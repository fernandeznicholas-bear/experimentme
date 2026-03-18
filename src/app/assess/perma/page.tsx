import { AssessmentRunner } from '@/components/AssessmentRunner'
import { permaConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PERMA Well-Being Assessment — Experiment Me',
  description: 'Measure your flourishing across five pillars: Positive Emotion, Engagement, Relationships, Meaning, and Accomplishment. 15 questions, 4 minutes.',
}

export default function PermaPage() {
  return <AssessmentRunner config={permaConfig} />
}
