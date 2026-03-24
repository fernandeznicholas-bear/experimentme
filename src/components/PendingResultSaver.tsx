'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

const VALID_ASSESSMENT_TYPES = [
  'swls', 'rosenberg', 'grit', 'mindset', 'bigfive', 'perma', 'happiness',
  'dass21', 'hope', 'selfcompassion', 'phq9', 'gad7', 'pcl5', 'who5', 'cssrs',
]

export function PendingResultSaver({ userId }: { userId: string }) {
  const router = useRouter()

  useEffect(() => {
    async function savePending() {
      try {
        const pending = localStorage.getItem('pendingAssessmentResult')
        if (!pending) return

        const pendingResult = JSON.parse(pending)

        // Validate the pending result before inserting
        if (
          !pendingResult.assessment_type ||
          !VALID_ASSESSMENT_TYPES.includes(pendingResult.assessment_type) ||
          typeof pendingResult.score !== 'number'
        ) {
          localStorage.removeItem('pendingAssessmentResult')
          return
        }

        const supabase = createClient()

        const { error } = await supabase.from('assessment_results').insert({
          assessment_type: pendingResult.assessment_type,
          score: pendingResult.score,
          details: pendingResult.details ?? null,
          user_id: userId,
        })

        if (!error) {
          localStorage.removeItem('pendingAssessmentResult')
          // Refresh the page so the new result shows up in the list
          router.refresh()
        }
      } catch {
        // Silently fail — don't break the profile page
      }
    }

    savePending()
  }, [userId, router])

  return null
}
