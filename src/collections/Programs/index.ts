import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

import { AccordionBlock } from './blocks/AccordionBlock'
import { ContentSplitBlock } from './blocks/ContentSplitBlock'
import { FeatureGridBlock } from './blocks/FeatureGridBlock'
import { HeroBlock } from './blocks/HeroBlock'
import { HTMLEmbedBlock } from './blocks/HTMLEmbedBlock'
import { PricingCardBlock } from './blocks/PricingCardBlock'
import { RichTextBlock } from './blocks/RichTextBlock'
import { TestimonialCarouselBlock } from './blocks/TestimonialCarouselBlock'

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const populateSlugFromTitle: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (operation === 'create' && data?.title) {
    return {
      ...data,
      slug: data.slug || slugify(data.title),
    }
  }
  return data
}

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'slug'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeValidate: [populateSlugFromTitle],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Waitlist', value: 'waitlist' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'checkoutUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'External checkout/payment link',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'listingMetadata',
      type: 'group',
      fields: [
        {
          name: 'summary',
          type: 'textarea',
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        FeatureGridBlock,
        ContentSplitBlock,
        TestimonialCarouselBlock,
        PricingCardBlock,
        HTMLEmbedBlock,
        RichTextBlock,
        AccordionBlock,
      ],
    },
  ],
}
