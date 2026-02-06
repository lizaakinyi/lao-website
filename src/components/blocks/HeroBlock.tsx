import Image from 'next/image'
import Link from 'next/link'
import type { Program, Media } from '@/payload-types'

type HeroBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'hero' }>

export function HeroBlock({ block }: { block: HeroBlockData }) {
  const bg = block.backgroundImage as Media | null

  return (
    <section className="relative overflow-hidden bg-bg-elevated py-20 md:py-28">
      {bg?.url && (
        <Image
          src={bg.url}
          alt={bg.alt || ''}
          fill
          priority
          className="object-cover opacity-30"
        />
      )}
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight">
          {block.heading}
        </h1>
        {block.subtext && (
          <p className="mt-4 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            {block.subtext}
          </p>
        )}
        {block.cta?.label && block.cta.url && (
          <Link
            href={block.cta.url}
            className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            {block.cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}
