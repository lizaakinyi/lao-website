'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SerializedEditorState } from 'lexical'
import type { Program } from '@/payload-types'
import { RichTextRenderer } from '@/components/RichTextRenderer'

type AccordionBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'accordion' }>

export function AccordionBlock({ block }: { block: AccordionBlockData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
        {block.items?.map((item, i) => (
          <div key={item.id} className="bg-bg-card">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-bg-elevated transition-colors"
            >
              <span className="font-medium text-text pr-4">{item.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-text-secondary transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 prose prose-sm max-w-none [&_p]:text-text-secondary [&_a]:text-primary">
                <RichTextRenderer data={item.answer as unknown as SerializedEditorState} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
