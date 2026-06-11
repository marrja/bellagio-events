import { useTranslation } from 'react-i18next'
import type { Venue } from '@/data/types'
import { useVenues } from '@/hooks/useVenue'
import { VenueCard } from './VenueCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/** Two cards linking to the other two spaces. */
export function OtherVenues({ current }: { current: Venue }) {
  const { t } = useTranslation()
  const { venues } = useVenues()
  const others = venues.filter((v) => v.slug !== current.slug).slice(0, 2)

  if (others.length === 0) return null

  return (
    <section className="container-bellagio py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t('nav.venues')}
          title={t('venue.otherVenuesTitle')}
          accentColor={current.accentColor}
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {others.map((v, i) => (
          <Reveal key={v.slug} delay={i * 80}>
            <VenueCard venue={v} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default OtherVenues
