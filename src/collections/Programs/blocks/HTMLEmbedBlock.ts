import type { Block } from 'payload'

export const HTMLEmbedBlock: Block = {
  slug: 'htmlEmbed',
  labels: { singular: 'HTML Embed', plural: 'HTML Embeds' },
  fields: [
    {
      name: 'html',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: 'Raw HTML to embed (iframes, widgets, etc.)',
      },
    },
  ],
}
