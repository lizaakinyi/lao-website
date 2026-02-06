import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { getPayloadClient } from '@/lib/payload'
import { siteMetadata, SITE_NAME, SITE_URL } from '@/lib/metadata'
import { ArticleCard } from '@/components/ArticleCard'
import { ToolCard } from '@/components/ToolCard'
import { ProgramCard } from '@/components/ProgramCard'
import { EventCard } from '@/components/EventCard'

export function generateMetadata(): Metadata {
  return siteMetadata({
    title: `${SITE_NAME} — Authority Hub`,
    description:
      'Articles, tools, programs and speaking engagements by Liza Akinyi. Helping African founders build fundable, sustainable ventures.',
    openGraph: {
      title: `${SITE_NAME} — Authority Hub`,
      description:
        'Articles, tools, programs and speaking engagements by Liza Akinyi.',
      url: SITE_URL,
    },
  })
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [articlesResult, toolsResult, programsResult, eventsResult, siteSettings] = await Promise.all([
    payload.find({
      collection: 'articles',
      limit: 3,
      sort: '-publishedDate',
      where: { status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'tools',
      limit: 3,
    }),
    payload.find({
      collection: 'programs',
      limit: 3,
    }),
    payload.find({
      collection: 'events',
      limit: 4,
      sort: '-date',
    }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  const articles = articlesResult.docs
  const tools = toolsResult.docs
  const programs = programsResult.docs
  const events = eventsResult.docs

  const sameAs = (siteSettings.socialLinks || []).map((link) => link.url)

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Helping African founders build fundable, sustainable ventures.',
    founder: {
      '@type': 'Person',
      name: 'Liza Akinyi',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight tracking-tight">
                Build fundable,{' '}
                <span className="text-primary">sustainable</span> ventures
              </h1>
              <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-lg">
                Articles, tools, and programs to help African founders navigate
                funding, strategy, and growth — with heart and rigor.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#book-a-call"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Book a Call
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                >
                  Read Articles
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <Image
                  src="/hero.webp"
                  alt="Liza Akinyi-Owino"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text">Latest Articles</h2>
              <p className="mt-2 text-text-secondary">Insights on funding, strategy, and growth</p>
            </div>
            <Link
              href="/articles"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <Link
            href="/articles"
            className="mt-6 sm:hidden inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View all articles <ArrowRight size={14} />
          </Link>
        </section>
      )}

      {/* Featured Tools */}
      {tools.length > 0 && (
        <section className="bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text">Tools &amp; Resources</h2>
                <p className="mt-2 text-text-secondary">Practical tools to accelerate your venture</p>
              </div>
              <Link
                href="/tools"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            <Link
              href="/tools"
              className="mt-6 sm:hidden inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              View all tools <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* Programs */}
      {programs.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text">Programs</h2>
              <p className="mt-2 text-text-secondary">Guided programs to grow your business</p>
            </div>
            <Link
              href="/programs"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          <Link
            href="/programs"
            className="mt-6 sm:hidden inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View all programs <ArrowRight size={14} />
          </Link>
        </section>
      )}

      {/* Speaking / Events */}
      {events.length > 0 && (
        <section className="bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text">Speaking &amp; Events</h2>
                <p className="mt-2 text-text-secondary">Conferences, webinars, and workshops</p>
              </div>
              <Link
                href="/speaking"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <Link
              href="/speaking"
              className="mt-6 sm:hidden inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              View all events <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text">Stay in the loop</h2>
          <p className="mt-3 text-text-secondary max-w-md mx-auto">
            Get funding news, practical tools, and growth insights delivered to
            your inbox weekly.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <a
              href="#subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Subscribe Free
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
    </>
  )
}
