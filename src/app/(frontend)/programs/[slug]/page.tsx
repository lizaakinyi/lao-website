import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

import { getPayloadClient } from '@/lib/payload'
import { pageMetadata } from '@/lib/metadata'
import { RenderBlocks } from '@/components/blocks'
import type { Program, Media } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'programs',
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
    collection: 'programs',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const program = docs[0]
  if (!program) return {}

  const thumbnail = program.listingMetadata?.thumbnail as Media | null

  return pageMetadata({
    title: program.title,
    description: program.listingMetadata?.summary || `${program.title} — Program by Liza Akinyi`,
    image: thumbnail?.url || undefined,
    path: `/programs/${slug}`,
  })
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const program = docs[0]
  if (!program) notFound()

  const statusConfig: Record<string, { label: string; className: string }> = {
    open: { label: 'Open', className: 'bg-status-open/10 text-status-open' },
    waitlist: { label: 'Waitlist', className: 'bg-status-waitlist/10 text-status-waitlist' },
    closed: { label: 'Closed', className: 'bg-status-closed/10 text-status-closed' },
  }
  const status = statusConfig[program.status || 'open'] || statusConfig.open

  const blocks = (program.layout || []) as NonNullable<Program['layout']>

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Programs
        </Link>
      </div>

      {blocks.length === 0 && (
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-text">{program.title}</h1>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${status.className}`}>
              {status.label}
            </span>
          </div>
          {program.listingMetadata?.summary && (
            <p className="text-text-secondary text-lg">{program.listingMetadata.summary}</p>
          )}
        </div>
      )}

      {blocks.length > 0 && <RenderBlocks blocks={blocks} />}

      {program.checkoutUrl && (
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <a
            href={program.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-primary px-8 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Enroll Now
          </a>
        </div>
      )}
    </>
  )
}
