'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

export function PendingResultSaver({ userId }: { userId: string }) {
  const router = useRouter()

  useEffect(() => {
    async function savePending() {
      try {
        const pending = localStorage.getItem('pendingAssessmentResult')
        if (!pending) return

        const pendingResult = JSON.parse(pending)
        const supabase = createClient()

        const { error } = await supabase.from('assessment_results').insert({
          ...pendingResult,
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
