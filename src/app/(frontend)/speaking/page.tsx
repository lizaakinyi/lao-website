import type { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, MapPin, ExternalLink, Mic } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { pageMetadata } from '@/lib/metadata'
import type { Event, Media } from '@/payload-types'

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: 'Speaking',
    description:
      'Upcoming and past speaking engagements by Liza Akinyi — webinars, workshops, and conferences on funding, business, and tech in Africa.',
    path: '/speaking',
  })
}

const typeLabels: Record<string, string> = {
  webinar: 'Webinar',
  speaking: 'Speaking',
  workshop: 'Workshop',
}

function UpcomingEventCard({ event }: { event: Event }) {
  const date = new Date(event.date)
  const thumbnail = typeof event.thumbnail === 'object' ? (event.thumbnail as Media) : null

  return (
    <div className="flex flex-col md:flex-row gap-6 rounded-xl border border-border bg-bg-card p-6 transition-shadow hover:shadow-md">
      {thumbnail?.url && (
        <div className="relative w-full md:w-48 h-40 md:h-auto rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || event.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          {event.type && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              <Mic size={12} />
              {typeLabels[event.type] || event.type}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-text">{event.title}</h3>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            {' at '}
            {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {event.location}
            </span>
          )}
        </div>
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Register Now
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

function PastEventCard({ event }: { event: Event }) {
  const date = new Date(event.date)
  const thumbnail = typeof event.thumbnail === 'object' ? (event.thumbnail as Media) : null

  return (
    <div className="group rounded-xl border border-border bg-bg-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-40 bg-bg-elevated">
        {thumbnail?.url ? (
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Mic size={32} className="text-text-secondary/30" />
          </div>
        )}
        {event.type && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {typeLabels[event.type] || event.type}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-text leading-snug group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} />
            {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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

export default async function SpeakingPage() {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const [{ docs: upcomingEvents }, { docs: pastEvents }] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { date: { greater_than: now } },
      sort: 'date',
      limit: 50,
    }),
    payload.find({
      collection: 'events',
      where: { date: { less_than_equal: now } },
      sort: '-date',
      limit: 50,
    }),
  ])

  const eventJsonLd = upcomingEvents.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    location: {
      '@type': event.location === 'Virtual' ? 'VirtualLocation' : 'Place',
      name: event.location || 'Virtual',
      ...(event.location === 'Virtual' ? { url: event.registrationLink } : {}),
    },
    eventAttendanceMode:
      event.location === 'Virtual'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    organizer: {
      '@type': 'Person',
      name: 'Liza Akinyi',
    },
  }))

  return (
    <>
      {eventJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-text">Speaking</h1>
          <p className="mt-2 text-text-secondary max-w-2xl">
            Webinars, workshops, and conference talks on funding, business growth, and technology
            across Africa.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-status-open" />
            Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="flex flex-col gap-4">
              {upcomingEvents.map((event) => (
                <UpcomingEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary py-8 text-center rounded-xl border border-dashed border-border">
              No upcoming events scheduled. Check back soon!
            </p>
          )}
        </div>

        {/* Past Engagements */}
        <div>
          <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
            Past Engagements
          </h2>
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <PastEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary py-8 text-center rounded-xl border border-dashed border-border">
              No past events to display yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
