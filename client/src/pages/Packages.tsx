import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import { TIERS, getPrice } from '@/data/tiers'
import type { Localized, TierId } from '@/data/types'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { TierCard } from '@/components/ui/TierCard'
import { GemIcon } from '@/components/ui/GemIcon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

// Explicit capability matrix — ESPACE is the base; LUMIÈRE and SAVEUR
// are parallel add-ons; PRESTIGE includes everything.
const COMPARE_ROWS: { label: Localized; tiers: TierId[] }[] = [
  {
    label: { fr: "Location de l'espace & AV", en: 'Venue & AV', ar: 'المكان والصوتيات' },
    tiers: ['ESPACE', 'LUMIERE', 'SAVEUR', 'PRESTIGE'],
  },
  {
    label: { fr: 'Coordinateur sur site', en: 'On-site coordinator', ar: 'منسّق في الموقع' },
    tiers: ['ESPACE', 'LUMIERE', 'SAVEUR', 'PRESTIGE'],
  },
  {
    label: { fr: 'Décoration & design floral', en: 'Decor & floral design', ar: 'الديكور والأزهار' },
    tiers: ['LUMIERE', 'PRESTIGE'],
  },
  {
    label: { fr: 'Éclairage sur mesure', en: 'Custom lighting', ar: 'إضاءة مخصّصة' },
    tiers: ['LUMIERE', 'PRESTIGE'],
  },
  {
    label: { fr: 'Menu du chef & open bar', en: 'Chef menu & open bar', ar: 'قائمة الشيف وبار مفتوح' },
    tiers: ['SAVEUR', 'PRESTIGE'],
  },
  {
    label: { fr: 'Pièce montée', en: 'Celebration cake', ar: 'كعكة الاحتفال' },
    tiers: ['SAVEUR', 'PRESTIGE'],
  },
  {
    label: { fr: 'Planner dédié', en: 'Dedicated planner', ar: 'منظّم مخصّص' },
    tiers: ['PRESTIGE'],
  },
  {
    label: { fr: 'Photographe & vidéaste', en: 'Photo & video', ar: 'تصوير وفيديو' },
    tiers: ['PRESTIGE'],
  },
  {
    label: { fr: 'Suite nuptiale & nuitée', en: 'Bridal suite & stay', ar: 'جناح وإقامة' },
    tiers: ['PRESTIGE'],
  },
]

export default function Packages() {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const [venueIdx, setVenueIdx] = useState(0)
  const venue = venues[venueIdx]

  return (
    <>
      <Seo
        title="Nos Formules — Bellagio Event's"
        description="De la location simple au tout-inclus Prestige."
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Nos formules', path: '/formules' },
        ])}
      />

      <InnerHero
        eyebrow={t('brand.name')}
        title={t('packagesPage.title')}
        intro={t('packagesPage.intro')}
        accentColor={venue?.accentColor}
      />

      {/* Venue selector — prices update per venue */}
      <div className="container-bellagio">
        <p className="label mb-3 text-center text-[0.6rem] text-faint">
          {t('common.from')} · {venue ? L(venue.name) : ''}
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {venues.map((v, i) => (
            <button
              key={v.slug}
              type="button"
              onClick={() => setVenueIdx(i)}
              aria-pressed={i === venueIdx}
              className={`label rounded-full border px-5 py-2.5 text-[0.65rem] transition-all duration-300 ${
                i === venueIdx ? 'text-ink' : 'border-gold/25 text-faint hover:text-ink'
              }`}
              style={
                i === venueIdx
                  ? { borderColor: v.accentColor, boxShadow: `0 0 16px ${v.accentColor}44` }
                  : undefined
              }
            >
              {L(v.name)}
            </button>
          ))}
        </div>
      </div>

      {/* Tier cards */}
      {venue && (
        <section className="container-bellagio py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.id} delay={(i % 4) * 80}>
                <TierCard
                  tier={tier}
                  price={getPrice(venue.slug, tier.id)}
                  accentColor={venue.accentColor}
                  enquireTo={`/contact?venue=${venue.slug}&tier=${tier.id}`}
                  defaultOpen
                  highlight={tier.id === 'PRESTIGE'}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Comparison table */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="container-bellagio">
          <Reveal>
            <SectionHeading
              eyebrow={t('nav.packages')}
              title={t('packagesPage.compareTitle')}
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-1/3 py-4 text-left" />
                    {TIERS.map((tier) => (
                      <th key={tier.id} className="px-4 py-4 text-center">
                        <span className="label text-xs text-ink">{tier.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-t border-gold/12">
                      <td className="py-3 pr-4 text-muted">{L(row.label)}</td>
                      {TIERS.map((tier) => (
                        <td key={tier.id} className="px-4 py-3 text-center">
                          {row.tiers.includes(tier.id) ? (
                            <GemIcon
                              size={13}
                              color={tier.id === 'PRESTIGE' ? 'var(--gold)' : 'var(--gold-dk)'}
                              filled={tier.id === 'PRESTIGE'}
                              className="mx-auto"
                            />
                          ) : (
                            <span className="text-faint/40">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
