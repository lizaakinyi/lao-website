import type { Program } from '@/payload-types'
import { HeroBlock } from './HeroBlock'
import { FeatureGridBlock } from './FeatureGridBlock'
import { ContentSplitBlock } from './ContentSplitBlock'
import { TestimonialCarouselBlock } from './TestimonialCarouselBlock'
import { PricingCardBlock } from './PricingCardBlock'
import { HtmlEmbedBlock } from './HtmlEmbedBlock'
import { RichTextBlock } from './RichTextBlock'
import { AccordionBlock } from './AccordionBlock'

type LayoutBlock = NonNullable<Program['layout']>[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<string, React.ComponentType<{ block: any }>> = {
  hero: HeroBlock,
  featureGrid: FeatureGridBlock,
  contentSplit: ContentSplitBlock,
  testimonialCarousel: TestimonialCarouselBlock,
  pricingCard: PricingCardBlock,
  htmlEmbed: HtmlEmbedBlock,
  richText: RichTextBlock,
  accordion: AccordionBlock,
}

export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id} block={block} />
      })}
    </>
  )
}
