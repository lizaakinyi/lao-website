import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { populateSlug } from '@/hooks/populateSlug'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'gated'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeValidate: [populateSlug],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
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
      name: 'description',
      type: 'richText',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Downloadable', value: 'downloadable' },
        { label: 'Interactive', value: 'interactive' },
      ],
    },
    {
      name: 'gated',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Require email subscription to access',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'downloadable',
      },
    },
    {
      name: 'componentName',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'interactive',
        description: 'React component name to render for interactive tools',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
