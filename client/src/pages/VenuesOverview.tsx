import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { VenueCard } from '@/components/venue/VenueCard'
import { LazyImage } from '@/components/ui/LazyImage'
import { GemIcon } from '@/components/ui/GemIcon'
import { VenuePill } from '@/components/ui/VenuePill'
import { GlowLink } from '@/components/ui/GlowButton'
import { Reveal } from '@/components/ui/Reveal'

export default function VenuesOverview() {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const [active, setActive] = useState(0)

  const current = venues[active]

  return (
    <>
      <Seo
        title="Nos espaces — Bellagio Event's"
        description="Trois lieux d'exception : La Grande Salle, Le Salon Privé et Les Jardins."
        jsonLd={breadcrumbJsonLd([
          { name: "Accueil", path: '/' },
          { name: 'Nos espaces', path: '/nos-espaces' },
        ])}
      />

      <InnerHero
        eyebrow={t('brand.name')}
        title={t('venuesPage.title')}
        intro={t('venuesPage.intro')}
      />

      {/* Tab switcher */}
      <div className="container-bellagio">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {venues.map((v, i) => (
            <button
              key={v.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`label rounded-full border px-5 py-2.5 text-[0.65rem] transition-all duration-300 ${
                i === active ? 'text-white' : 'border-white/15 text-smoke hover:text-white'
              }`}
              style={
                i === active
                  ? { borderColor: v.accentColor, boxShadow: `0 0 16px ${v.accentColor}44` }
                  : undefined
              }
            >
              {L(v.name)}
            </button>
          ))}
        </div>
      </div>

      {/* Active venue spotlight */}
      {current && (
        <section className="container-bellagio py-16">
          <div
            className="grid items-center gap-10 lg:grid-cols-2"
            style={{ '--accent': current.accentColor } as React.CSSProperties}
          >
            <Reveal>
              <LazyImage
                key={current.slug}
                src={current.heroImage}
                alt={L(current.name)}
                width={900}
                height={680}
                className="rounded-md"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <GemIcon size={24} color={current.accentColor} />
                <h2 className="mt-4 font-display text-4xl font-light text-white">
                  {L(current.name)}
                </h2>
                <p
                  className="mt-2 font-script text-2xl"
                  style={{ color: current.accentColor }}
                >
                  {L(current.tagline)}
                </p>
                <p className="mt-5 leading-relaxed text-smoke">
                  {L(current.description[0])}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <VenuePill>{t('common.upToGuests', { count: current.capacity })}</VenuePill>
                  <VenuePill>{current.area}</VenuePill>
                  <VenuePill>{L(current.ceiling)}</VenuePill>
                </div>
                <div className="mt-8">
                  <GlowLink to={`/espaces/${current.slug}`} variant="primary">
                    {t('cta.learnMore')}
                  </GlowLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* All venues at a glance */}
      <section className="container-bellagio pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((v, i) => (
            <Reveal key={v.slug} delay={(i % 3) * 80}>
              <VenueCard venue={v} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
