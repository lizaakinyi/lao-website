import { Suspense } from 'react'
import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { pageMetadata } from '@/lib/metadata'
import { ArticleCard } from '@/components/ArticleCard'
import { CategoryFilter } from '@/components/CategoryFilter'

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: 'Articles',
    description:
      'Insights on funding, business strategy, and growth for African founders by Liza Akinyi.',
    path: '/articles',
  })
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const payload = await getPayloadClient()

  const where: Record<string, unknown> = {
    status: { equals: 'published' },
  }
  if (category) {
    where.category = { equals: category }
  }

  const { docs: articles } = await payload.find({
    collection: 'articles',
    sort: '-publishedDate',
    limit: 50,
    where,
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text">Articles</h1>
        <p className="mt-2 text-text-secondary">
          Insights on funding, strategy, and growth for African founders.
        </p>
      </div>

      <div className="mb-8">
        <Suspense>
          <CategoryFilter />
        </Suspense>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-text-secondary py-12 text-center">
          No articles found{category ? ' in this category' : ''}.
        </p>
      )}
    </section>
  )
}
