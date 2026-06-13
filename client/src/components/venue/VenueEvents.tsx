import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import type { Venue } from '@/data/types'
import { GemIcon } from '@/components/ui/GemIcon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/** Event types — horizontal scroll on mobile, grid on desktop. */
export function VenueEvents({ venue }: { venue: Venue }) {
  const { t } = useTranslation()
  const { L } = useL()

  return (
    <section className="container-bellagio py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t('venue.eventsTitle')}
          title={t('venue.eventsTitle')}
          accentColor={venue.accentColor}
        />
      </Reveal>

      <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
        {venue.events.map((ev, i) => (
          <Reveal key={i} delay={(i % 3) * 80}>
            <article
              className="group h-full w-[80vw] shrink-0 snap-center rounded-2xl border border-gold/15 bg-cream p-6 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift sm:w-auto"
              style={{ '--accent': venue.accentColor } as React.CSSProperties}
            >
              <GemIcon size={20} color={venue.accentColor} />
              <h3 className="mt-4 font-display text-2xl text-ink">{L(ev.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{L(ev.description)}</p>
              <span
                className="mt-5 block h-px w-0 transition-all duration-500 ease-out group-hover:w-full"
                style={{ backgroundColor: venue.accentColor }}
                aria-hidden
              />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default VenueEvents
