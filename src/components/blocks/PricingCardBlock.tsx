import Link from 'next/link'
import { Check } from 'lucide-react'
import type { Program } from '@/payload-types'

type PricingCardBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'pricingCard' }>

export function PricingCardBlock({ block }: { block: PricingCardBlockData }) {
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-2xl border border-border bg-bg-card p-8 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-text mb-2">{block.title}</h3>
        <p className="text-4xl font-bold text-primary mb-6">{block.price}</p>

        {block.features && block.features.length > 0 && (
          <ul className="mb-8 space-y-3 text-left">
            {block.features.map((f) => (
              <li key={f.id} className="flex items-start gap-2 text-text">
                <Check size={18} className="mt-0.5 shrink-0 text-status-open" />
                <span className="text-sm">{f.feature}</span>
              </li>
            ))}
          </ul>
        )}

        {block.cta?.label && block.cta.url && (
          <Link
            href={block.cta.url}
            className="block w-full rounded-lg bg-primary px-6 py-3 text-center text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            {block.cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}
