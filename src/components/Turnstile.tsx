'use client'

import { Turnstile as TurnstileWidget } from '@marsidev/react-turnstile'

interface TurnstileProps {
  onSuccess: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

export default function Turnstile({ onSuccess, onError, onExpire }: TurnstileProps) {
  return (
    <div className="flex justify-center">
      <TurnstileWidget
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme: 'light',
          size: 'normal',
        }}
      />
    </div>
  )
}
