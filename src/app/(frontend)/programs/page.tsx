import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { pageMetadata } from '@/lib/metadata'
import { ProgramCard } from '@/components/ProgramCard'

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: 'Programs',
    description:
      'Coaching programs, accelerators, and workshops by Liza Akinyi for African founders.',
    path: '/programs',
  })
}

export default async function ProgramsPage() {
  const payload = await getPayloadClient()
  const { docs: programs } = await payload.find({
    collection: 'programs',
    limit: 50,
    sort: 'title',
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text">Programs</h1>
        <p className="mt-2 text-text-secondary">
          Coaching, accelerators, and workshops to scale your business.
        </p>
      </div>

      {programs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <p className="text-text-secondary py-12 text-center">No programs available yet.</p>
      )}
    </section>
  )
}
