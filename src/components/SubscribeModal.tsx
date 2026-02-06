'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useSubscription } from './SubscriptionProvider'

const INTEREST_OPTIONS = [
  { value: 'funding', label: 'Funding & Grants' },
  { value: 'coaching', label: 'Coaching & Mentoring' },
  { value: 'tech', label: 'Tech & Innovation' },
  { value: 'general', label: 'General Updates' },
] as const

export function SubscribeModal() {
  const { isModalOpen, hideModal, subscribe } = useSubscription()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isModalOpen) {
      nameInputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  if (!isModalOpen) return null

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
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
          interests: interests.length > 0 ? interests : ['general'],
          source: 'modal',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch((): null => null)
        const msg = (data as { errors?: { message?: string }[] })?.errors?.[0]?.message
        throw new Error(msg || 'Something went wrong')
      }

      subscribe()
      setName('')
      setEmail('')
      setInterests([])
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) hideModal()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="relative w-full max-w-md rounded-xl bg-bg p-6 shadow-2xl">
        <button
          onClick={hideModal}
          className="absolute right-4 top-4 text-text-secondary hover:text-text transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-text mb-1">Get Free Access</h2>
        <p className="text-sm text-text-secondary mb-5">
          Subscribe to unlock tools, insights, and funding resources.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="modal-name" className="block text-sm font-medium text-text mb-1">
              Name
            </label>
            <input
              ref={nameInputRef}
              id="modal-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="modal-email" className="block text-sm font-medium text-text mb-1">
              Email
            </label>
            <input
              id="modal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-text mb-2">
              Interests (optional)
            </legend>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    interests.includes(opt.value)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-text-secondary hover:border-primary/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(opt.value)}
                    onChange={() => toggleInterest(opt.value)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>

          {status === 'error' && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe — It\u2019s Free'}
          </button>
        </form>
      </div>
    </div>
  )
}
