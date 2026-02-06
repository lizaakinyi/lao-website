import type { Block } from 'payload'

export const TestimonialCarouselBlock: Block = {
  slug: 'testimonialCarousel',
  labels: { singular: 'Testimonial Carousel', plural: 'Testimonial Carousels' },
  fields: [
    {
      name: 'reviews',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
