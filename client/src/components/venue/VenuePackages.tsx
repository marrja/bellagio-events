import { useTranslation } from 'react-i18next'
import type { Venue } from '@/data/types'
import { TIERS, getPrice } from '@/data/tiers'
import { TierCard } from '@/components/ui/TierCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/** Four tier cards for this venue, prices "à partir de X TND". */
export function VenuePackages({ venue }: { venue: Venue }) {
  const { t } = useTranslation()

  return (
    <section id="packages" className="scroll-mt-24 bg-sand py-20 sm:py-28">
      <div className="container-bellagio">
        <Reveal>
          <SectionHeading
            eyebrow={t('packagesPage.title')}
            title={t('venue.packagesTitle')}
            accentColor={venue.accentColor}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.id} delay={(i % 4) * 80}>
              <TierCard
                tier={tier}
                price={getPrice(venue.slug, tier.id)}
                accentColor={venue.accentColor}
                enquireTo={`/contact?venue=${venue.slug}&tier=${tier.id}`}
                highlight={tier.id === 'PRESTIGE'}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VenuePackages
