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
        description="Deux lieux d'exception : La Salle Bellagio (intérieur) et Le Jardin Bellagio (extérieur)."
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Nos espaces', path: '/nos-espaces' },
        ])}
      />

      <InnerHero
        eyebrow={t('brand.name')}
        title={t('venuesPage.title')}
        intro={t('venuesPage.intro')}
        accentColor={current?.accentColor}
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
              className={`label rounded-full border px-6 py-2.5 text-[0.62rem] transition-all duration-300 ${
                i === active ? 'text-ink' : 'border-gold/25 text-faint hover:text-ink'
              }`}
              style={
                i === active
                  ? { borderColor: v.accentColor, boxShadow: `0 0 18px ${v.accentColor}44` }
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
                className="rounded-2xl shadow-soft"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <GemIcon size={22} color={current.accentColor} />
                <p className="label mt-3 text-[0.6rem] text-gold-dk">{L(current.subtitle)}</p>
                <h2 className="mt-2 font-display text-4xl font-light text-ink">{L(current.name)}</h2>
                <p className="mt-2 font-script text-2xl" style={{ color: current.accentColor }}>
                  {L(current.tagline)}
                </p>
                <p className="mt-5 leading-relaxed text-muted">{L(current.description[0])}</p>
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

      {/* Both spaces */}
      <section className="container-bellagio pb-24">
        <div className="grid gap-5 sm:grid-cols-2">
          {venues.map((v, i) => (
            <Reveal key={v.slug} delay={(i % 2) * 80}>
              <VenueCard venue={v} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
