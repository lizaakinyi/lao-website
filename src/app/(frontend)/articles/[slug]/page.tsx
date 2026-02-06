import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import { ArrowLeft } from 'lucide-react'

import { getPayloadClient } from '@/lib/payload'
import { pageMetadata, SITE_URL } from '@/lib/metadata'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import { ShareButtons } from '@/components/ShareButtons'
import { NewsletterForm } from '@/components/NewsletterForm'
import { ArticleCard } from '@/components/ArticleCard'
import type { Media } from '@/payload-types'

const categoryLabels: Record<string, string> = {
  'business-news': 'Business News',
  funding: 'Funding',
  thoughts: 'Thoughts',
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'articles',
    limit: 100,
    where: { status: { equals: 'published' } },
    select: { slug: true },
  })
  return docs.filter((d) => d.slug).map((d) => ({ slug: d.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  const article = docs[0]
  if (!article) return {}

  const image = article.featuredImage as Media | null

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    image: image?.url || undefined,
    path: `/articles/${slug}`,
  })
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })

  const article = docs[0]
  if (!article) notFound()

  const image = article.featuredImage as Media | null
  const publishedDate = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const { docs: relatedArticles } = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { status: { equals: 'published' } },
        { id: { not_equals: article.id } },
        ...(article.category ? [{ category: { equals: article.category } }] : []),
      ],
    },
    limit: 3,
    sort: '-publishedDate',
  })

  const articleUrl = `${SITE_URL}/articles/${slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author || 'Liza Akinyi',
    },
    ...(publishedDate ? { datePublished: article.publishedDate } : {}),
    ...(image?.url ? { image: image.url } : {}),
    url: articleUrl,
  }

  return (
    <>
      <article className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                {article.category && (
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {categoryLabels[article.category] || article.category}
                  </span>
                )}
                {publishedDate && (
                  <span className="text-sm text-text-secondary">{publishedDate}</span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-text leading-tight">
                {article.title}
              </h1>
              {article.author && (
                <p className="mt-3 text-text-secondary">By {article.author}</p>
              )}
            </header>

            {image?.url && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-8 bg-bg-elevated">
                <Image
                  src={image.url}
                  alt={image.alt || article.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none [&_p]:text-text [&_h2]:text-text [&_h3]:text-text [&_a]:text-primary [&_a:hover]:text-primary-dark [&_li]:text-text">
              <RichTextRenderer data={article.content as unknown as SerializedEditorState} />
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </div>

          <aside className="space-y-8">
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-text mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <ArticleCard key={related.id} article={related} />
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-border bg-bg-card p-5">
              <h3 className="text-lg font-semibold text-text mb-2">Stay Updated</h3>
              <p className="text-sm text-text-secondary mb-4">
                Get funding news and growth insights weekly.
              </p>
              <NewsletterForm />
            </div>
          </aside>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  )
}
