import type { SerializedEditorState } from 'lexical'
import type { Program } from '@/payload-types'
import { RichTextRenderer } from '@/components/RichTextRenderer'

type RichTextBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'richText' }>

export function RichTextBlock({ block }: { block: RichTextBlockData }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <div className="prose prose-lg max-w-none [&_p]:text-text [&_h2]:text-text [&_h3]:text-text [&_a]:text-primary [&_li]:text-text">
        <RichTextRenderer data={block.content as unknown as SerializedEditorState} />
      </div>
    </section>
  )
}
