'use client'

import { useSubscription } from './SubscriptionProvider'
import { Lock } from 'lucide-react'

export function GatedContent({ children }: { children: React.ReactNode }) {
  const { isSubscribed, showModal } = useSubscription()

  if (isSubscribed) return <>{children}</>

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm" aria-hidden="true">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/80 backdrop-blur-sm rounded-lg">
        <Lock className="mb-3 text-primary" size={28} />
        <p className="mb-3 text-sm font-medium text-text">Subscribe to unlock this content</p>
        <button
          onClick={showModal}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Subscribe Free
        </button>
      </div>
    </div>
  )
}
