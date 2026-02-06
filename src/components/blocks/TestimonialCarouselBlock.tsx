'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { Program, Media } from '@/payload-types'

type TestimonialCarouselBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'testimonialCarousel' }>

export function TestimonialCarouselBlock({ block }: { block: TestimonialCarouselBlockData }) {
  const [index, setIndex] = useState(0)
  const reviews = block.reviews || []

  if (reviews.length === 0) return null

  const review = reviews[index]
  const avatar = review.avatar as Media | null

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setIndex((i) => (i + 1) % reviews.length)

  return (
    <section className="bg-bg-elevated py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Quote className="mx-auto mb-6 text-primary/30" size={40} />
        <blockquote className="text-xl md:text-2xl text-text leading-relaxed mb-8">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          {avatar?.url && (
            <Image
              src={avatar.url}
              alt={avatar.alt || review.author}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          )}
          <div className="text-left">
            <p className="font-semibold text-text">{review.author}</p>
            {review.role && <p className="text-sm text-text-secondary">{review.role}</p>}
          </div>
        </div>

        {reviews.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full border border-border p-2 hover:bg-bg-card transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-text-secondary">
              {index + 1} / {reviews.length}
            </span>
            <button
              onClick={next}
              className="rounded-full border border-border p-2 hover:bg-bg-card transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
