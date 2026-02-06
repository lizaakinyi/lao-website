import Link from 'next/link'
import Image from 'next/image'
import type { Article, Media } from '@/payload-types'

const categoryLabels: Record<string, string> = {
  'business-news': 'Business News',
  funding: 'Funding',
  thoughts: 'Thoughts',
}

export function ArticleCard({ article }: { article: Article }) {
  const image = article.featuredImage as Media | null
  const date = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-bg-card transition-shadow hover:shadow-md"
    >
      {image?.url && (
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-elevated">
          <Image
            src={image.url}
            alt={image.alt || article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      {!image?.url && (
        <div className="aspect-[16/9] bg-bg-elevated flex items-center justify-center">
          <span className="text-4xl text-text-secondary/30">📝</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          {article.category && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {categoryLabels[article.category] || article.category}
            </span>
          )}
          {date && <span className="text-xs text-text-secondary">{date}</span>}
        </div>
        <h3 className="text-lg font-semibold text-text leading-snug mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  )
}
