import { AssessmentRunner } from '@/components/AssessmentRunner'
import { bigfiveConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Big Five Personality Assessment — Experiment Me',
  description: 'Map your personality across five core dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. 20 questions, 5 minutes.',
}

export default function BigFivePage() {
  return <AssessmentRunner config={bigfiveConfig} />
}
