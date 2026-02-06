import type { Block } from 'payload'

export const ContentSplitBlock: Block = {
  slug: 'contentSplit',
  labels: { singular: 'Content Split', plural: 'Content Splits' },
  fields: [
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'textLeft',
      options: [
        { label: 'Text Left / Image Right', value: 'textLeft' },
        { label: 'Image Left / Text Right', value: 'imageLeft' },
      ],
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
