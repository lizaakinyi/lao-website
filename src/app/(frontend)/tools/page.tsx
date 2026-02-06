import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { pageMetadata } from '@/lib/metadata'
import { ToolCard } from '@/components/ToolCard'

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: 'Tools',
    description:
      'Free tools, templates, and calculators for African founders — budget planners, grant eligibility checks, and more.',
    path: '/tools',
  })
}

export default async function ToolsPage() {
  const payload = await getPayloadClient()

  const { docs: tools } = await payload.find({
    collection: 'tools',
    sort: 'title',
    limit: 50,
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text">Tools</h1>
        <p className="mt-2 text-text-secondary">
          Free resources, templates, and interactive tools to help you grow.
        </p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="text-text-secondary py-12 text-center">
          No tools available yet. Check back soon!
        </p>
      )}
    </section>
  )
}
