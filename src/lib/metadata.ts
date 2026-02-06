import type { Metadata } from 'next'

export const SITE_NAME = 'Liza Akinyi'
export const SITE_DESCRIPTION =
  'Authority Hub — Articles, tools, programs and speaking by Liza Akinyi.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lizaakinyi.com'

export function siteMetadata(overrides: Metadata = {}): Metadata {
  return {
    title: overrides.title ?? {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: overrides.description ?? SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      ...overrides.twitter,
    },
    ...overrides,
  }
}

export function pageMetadata({
  title,
  description,
  image,
  path,
}: {
  title: string
  description: string
  image?: string
  path?: string
}): Metadata {
  const url = path ? `${SITE_URL}${path}` : undefined
  return siteMetadata({
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(url ? { alternates: { canonical: url } } : {}),
  })
}
