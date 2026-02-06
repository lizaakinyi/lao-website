import Link from 'next/link'
import Image from 'next/image'
import { Lock, Download, Cpu } from 'lucide-react'
import type { Tool, Media } from '@/payload-types'

const typeConfig = {
  downloadable: { label: 'Download', icon: Download },
  interactive: { label: 'Interactive', icon: Cpu },
}

export function ToolCard({ tool }: { tool: Tool }) {
  const thumbnail = tool.thumbnail as Media | null
  const { label, icon: TypeIcon } = typeConfig[tool.type]

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-bg-card transition-shadow hover:shadow-md"
    >
      {thumbnail?.url ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-elevated">
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || tool.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-bg-elevated flex items-center justify-center">
          <TypeIcon className="text-text-secondary/30" size={40} />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary bg-bg-elevated px-2 py-0.5 rounded-full">
            <TypeIcon size={12} />
            {label}
          </span>
          {tool.gated && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              <Lock size={10} />
              Gated
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-text leading-snug group-hover:text-primary transition-colors">
          {tool.title}
        </h3>
      </div>
    </Link>
  )
}
