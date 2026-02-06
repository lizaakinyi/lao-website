'use client'

import DOMPurify from 'dompurify'
import type { Program } from '@/payload-types'

type HtmlEmbedBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'htmlEmbed' }>

export function HtmlEmbedBlock({ block }: { block: HtmlEmbedBlockData }) {
  const sanitized = DOMPurify.sanitize(block.html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src'],
  })

  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <div
        className="[&>iframe]:w-full [&>iframe]:rounded-xl"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </section>
  )
}
