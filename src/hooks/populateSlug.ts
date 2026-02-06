import type { CollectionBeforeValidateHook } from 'payload'

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export const populateSlug: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (operation === 'create' && data?.title) {
    return {
      ...data,
      slug: data.slug || slugify(data.title),
    }
  }

  return data
}
