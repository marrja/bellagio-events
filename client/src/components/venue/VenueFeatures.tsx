import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import type { Venue } from '@/data/types'
import { GemIcon } from '@/components/ui/GemIcon'
import { GoldRule } from '@/components/ui/GoldRule'
import { Reveal } from '@/components/ui/Reveal'

/** "About the space" — 2-column: description + specification card. */
export function VenueFeatures({ venue }: { venue: Venue }) {
  const { t } = useTranslation()
  const { L } = useL()

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-bellagio grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <GemIcon size={15} color={venue.accentColor} />
            <span className="label text-[0.62rem] text-gold-dk">{t('venue.aboutTitle')}</span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-light text-ink">{L(venue.name)}</h2>
          <div className="mt-6 space-y-5">
            {venue.description.map((p, i) => (
              <p key={i} className="leading-relaxed text-muted">
                {L(p)}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="rounded-2xl border border-gold/20 bg-pearl p-7 shadow-soft"
            style={{ '--accent': venue.accentColor } as React.CSSProperties}
          >
            <dl className="space-y-4">
              {[
                [t('common.capacity'), t('common.upToGuests', { count: venue.capacity })],
                [t('common.area'), venue.area],
                [t('common.ceiling'), L(venue.ceiling)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="label text-[0.58rem] text-faint">{k}</dt>
                  <dd className="text-right font-display text-lg text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <GoldRule className="my-6" gemColor={venue.accentColor} />

            <h3 className="label mb-4 text-[0.62rem] text-gold-dk">{t('common.features')}</h3>
            <ul className="space-y-3">
              {venue.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 shrink-0">
                    <GemIcon size={11} color={venue.accentColor} />
                  </span>
                  <span>{L(f)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default VenueFeatures
