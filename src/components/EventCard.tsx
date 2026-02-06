import { Calendar, MapPin } from 'lucide-react'
import type { Event } from '@/payload-types'

const typeLabels: Record<string, string> = {
  webinar: 'Webinar',
  speaking: 'Speaking',
  workshop: 'Workshop',
}

export function EventCard({ event }: { event: Event }) {
  const date = new Date(event.date)
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = date.getDate()

  return (
    <div className="flex gap-4 rounded-xl border border-border bg-bg-card p-4 transition-shadow hover:shadow-md">
      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-primary leading-none">{month}</span>
        <span className="text-xl font-bold text-primary leading-none">{day}</span>
      </div>
      <div className="min-w-0">
        {event.type && (
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {typeLabels[event.type] || event.type}
          </span>
        )}
        <h3 className="text-base font-semibold text-text leading-snug mt-0.5">{event.title}</h3>
        <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} />
            {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} />
              {event.location}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
