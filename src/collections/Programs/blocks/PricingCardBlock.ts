import type { Block } from 'payload'

export const PricingCardBlock: Block = {
  slug: 'pricingCard',
  labels: { singular: 'Pricing Card', plural: 'Pricing Cards' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "$499" or "KES 50,000"',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Enroll Now',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
