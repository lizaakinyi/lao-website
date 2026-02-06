import Image from 'next/image'
import type { SerializedEditorState } from 'lexical'
import type { Program, Media } from '@/payload-types'
import { RichTextRenderer } from '@/components/RichTextRenderer'

type ContentSplitBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'contentSplit' }>

export function ContentSplitBlock({ block }: { block: ContentSplitBlockData }) {
  const image = block.image as Media | null
  const isImageLeft = block.alignment === 'imageLeft'

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isImageLeft ? '' : 'md:[&>:first-child]:order-1 md:[&>:last-child]:order-2'}`}>
        {isImageLeft && image?.url && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-elevated">
            <Image src={image.url} alt={image.alt || ''} fill className="object-cover" />
          </div>
        )}
        <div className="prose prose-lg max-w-none [&_p]:text-text [&_h2]:text-text [&_h3]:text-text [&_a]:text-primary [&_li]:text-text">
          <RichTextRenderer data={block.text as unknown as SerializedEditorState} />
        </div>
        {!isImageLeft && image?.url && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-elevated">
            <Image src={image.url} alt={image.alt || ''} fill className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
