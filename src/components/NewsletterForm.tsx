'use client'

import { useState } from 'react'
import { useSubscription } from './SubscriptionProvider'

export function NewsletterForm() {
  const { subscribe, isSubscribed } = useSubscription()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  if (isSubscribed) {
    return (
      <p className="text-sm text-text-secondary">
        You&apos;re subscribed — thanks for joining!
      </p>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          interests: ['general'],
          source: 'newsletter-form',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch((): null => null)
        const msg = (data as { errors?: { message?: string }[] })?.errors?.[0]?.message
        throw new Error(msg || 'Something went wrong')
      }

      subscribe()
      setStatus('success')
      setName('')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm text-text-secondary">
        You&apos;re subscribed — thanks for joining!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {status === 'error' && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  )
}
