import Link from 'next/link'
import Image from 'next/image'
import type { Program, Media } from '@/payload-types'

const statusConfig: Record<string, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-status-open/10 text-status-open' },
  waitlist: { label: 'Waitlist', className: 'bg-status-waitlist/10 text-status-waitlist' },
  closed: { label: 'Closed', className: 'bg-status-closed/10 text-status-closed' },
}

export function ProgramCard({ program }: { program: Program }) {
  const thumbnail = program.listingMetadata?.thumbnail as Media | null
  const status = statusConfig[program.status || 'open'] || statusConfig.open

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-bg-card transition-shadow hover:shadow-md"
    >
      {thumbnail?.url ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-elevated">
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || program.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-bg-elevated flex items-center justify-center">
          <span className="text-4xl text-text-secondary/30">🎓</span>
        </div>
      )}
      <div className="p-5">
        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 ${status.className}`}>
          {status.label}
        </span>
        <h3 className="text-lg font-semibold text-text leading-snug mb-2 group-hover:text-primary transition-colors">
          {program.title}
        </h3>
        {program.listingMetadata?.summary && (
          <p className="text-sm text-text-secondary line-clamp-2">{program.listingMetadata.summary}</p>
        )}
      </div>
    </Link>
  )
}
