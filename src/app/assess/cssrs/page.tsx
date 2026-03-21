import { AssessmentRunner } from '@/components/AssessmentRunner'
import { cssrsConfig } from '@/lib/assessments'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suicide Risk Screening (C-SSRS) — Experiment Me',
  description: 'The C-SSRS is a brief suicide risk screener. 6 questions, 2 minutes. If you are in crisis, call or text 988.',
}

export default function CSSRSPage() {
  return <AssessmentRunner config={cssrsConfig} />
}
