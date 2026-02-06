import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import { ArrowLeft, Download, Cpu } from 'lucide-react'

import { getPayloadClient } from '@/lib/payload'
import { pageMetadata } from '@/lib/metadata'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import { GatedContent } from '@/components/GatedContent'
import type { Media } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'tools',
    limit: 100,
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
    collection: 'tools',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const tool = docs[0]
  if (!tool) return {}

  const thumbnail = tool.thumbnail as Media | null

  return pageMetadata({
    title: tool.title,
    description: `${tool.type === 'downloadable' ? 'Download' : 'Use'} ${tool.title} — a free tool for founders by Liza Akinyi.`,
    image: thumbnail?.url || undefined,
    path: `/tools/${slug}`,
  })
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'tools',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const tool = docs[0]
  if (!tool) notFound()

  const thumbnail = tool.thumbnail as Media | null
  const file = tool.file as Media | null
  const isDownloadable = tool.type === 'downloadable'

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <div className="mb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Tools
        </Link>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary bg-bg-elevated px-2.5 py-1 rounded-full">
            {isDownloadable ? <Download size={12} /> : <Cpu size={12} />}
            {isDownloadable ? 'Download' : 'Interactive'}
          </span>
          {tool.gated && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              Subscribers Only
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text leading-tight">
          {tool.title}
        </h1>
      </header>

      {thumbnail?.url && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-8 bg-bg-elevated">
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || tool.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {tool.description && (
        <div className="prose prose-lg max-w-none mb-8 [&_p]:text-text [&_h2]:text-text [&_h3]:text-text [&_a]:text-primary [&_li]:text-text">
          <RichTextRenderer data={tool.description as unknown as SerializedEditorState} />
        </div>
      )}

      {isDownloadable && file?.url && (
        tool.gated ? (
          <GatedContent>
            <a
              href={file.url}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <Download size={16} />
              Download {tool.title}
            </a>
          </GatedContent>
        ) : (
          <a
            href={file.url}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            <Download size={16} />
            Download {tool.title}
          </a>
        )
      )}

      {!isDownloadable && (
        tool.gated ? (
          <GatedContent>
            <div className="rounded-xl border border-border bg-bg-card p-8 text-center">
              <Cpu className="mx-auto mb-3 text-text-secondary" size={32} />
              <p className="text-text-secondary">
                Interactive tool will load here.
              </p>
            </div>
          </GatedContent>
        ) : (
          <div className="rounded-xl border border-border bg-bg-card p-8 text-center">
            <Cpu className="mx-auto mb-3 text-text-secondary" size={32} />
            <p className="text-text-secondary">
              Interactive tool will load here.
            </p>
          </div>
        )
      )}
    </section>
  )
}
