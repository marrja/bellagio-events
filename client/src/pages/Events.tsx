import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import type { GalleryEventType, VenueSlug } from '@/data/types'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { LazyImage } from '@/components/ui/LazyImage'
import { GemIcon } from '@/components/ui/GemIcon'
import { Reveal } from '@/components/ui/Reveal'

const TYPES: GalleryEventType[] = ['wedding', 'corporate', 'gala', 'garden', 'cocktail', 'other']

function categorize(nameFr: string): GalleryEventType {
  const n = nameFr.toLowerCase()
  if (n.includes('mariage')) return 'wedding'
  if (n.includes('gala') || n.includes('prix') || n.includes('récompense')) return 'gala'
  if (n.includes('corporate') || n.includes('séminaire') || n.includes('pique')) return 'corporate'
  if (n.includes('cocktail') || n.includes('fiançailles') || n.includes('henné')) return 'cocktail'
  if (n.includes('jardin') || n.includes('plein air') || n.includes('crépuscule') || n.includes('festival') || n.includes('chapiteau')) return 'garden'
  return 'other'
}

interface EventEntry {
  venueSlug: VenueSlug
  accentColor: string
  venueName: string
  image: string
  name: string
  description: string
  type: GalleryEventType
}

export default function Events() {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const [venueFilter, setVenueFilter] = useState<VenueSlug | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<GalleryEventType | 'all'>('all')

  const entries = useMemo<EventEntry[]>(
    () =>
      venues.flatMap((v) =>
        v.events.map((ev, i) => ({
          venueSlug: v.slug,
          accentColor: v.accentColor,
          venueName: L(v.name),
          image: v.galleryImages[i % v.galleryImages.length] ?? v.heroImage,
          name: L(ev.name),
          description: L(ev.description),
          type: categorize(ev.name.fr),
        })),
      ),
    [venues, L],
  )

  const filtered = entries.filter(
    (e) =>
      (venueFilter === 'all' || e.venueSlug === venueFilter) &&
      (typeFilter === 'all' || e.type === typeFilter),
  )

  const chip = (active: boolean) =>
    `label rounded-full border px-4 py-2 text-[0.64rem] transition-all duration-300 ${
      active ? 'border-gold bg-gold/10 text-gold-dk' : 'border-gold/25 text-faint hover:text-ink'
    }`

  return (
    <>
      <Seo
        title="Types d'événements — Bellagio Event's"
        description="Mariages, fiançailles, soirées de henné, galas et événements dans nos deux espaces."
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Événements', path: '/evenements' },
        ])}
      />

      <InnerHero eyebrow={t('brand.name')} title={t('eventsPage.title')} intro={t('eventsPage.intro')} />

      <div className="container-bellagio space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => setVenueFilter('all')} className={chip(venueFilter === 'all')}>
            {t('eventsPage.allVenues')}
          </button>
          {venues.map((v) => (
            <button key={v.slug} type="button" onClick={() => setVenueFilter(v.slug)} className={chip(venueFilter === v.slug)}>
              {L(v.name)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => setTypeFilter('all')} className={chip(typeFilter === 'all')}>
            {t('eventsPage.allTypes')}
          </button>
          {TYPES.map((ty) => (
            <button key={ty} type="button" onClick={() => setTypeFilter(ty)} className={chip(typeFilter === ty)}>
              {t(`filters.${ty}`)}
            </button>
          ))}
        </div>
      </div>

      <section className="container-bellagio py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <Reveal key={`${e.venueSlug}-${e.name}`} delay={(i % 3) * 60}>
              <Link
                to={`/espaces/${e.venueSlug}`}
                className="group relative block overflow-hidden rounded-2xl shadow-soft"
                style={{ '--accent': e.accentColor } as React.CSSProperties}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <LazyImage
                    src={e.image}
                    alt={e.name}
                    width={800}
                    height={600}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent" />
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ borderColor: e.accentColor }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2">
                    <GemIcon size={13} color="var(--gold-lt)" />
                    <span className="label text-[0.64rem] text-gold-lt">{e.venueName}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl text-pearl">{e.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-pearl/75">{e.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && <p className="py-16 text-center text-muted">{t('galleryPage.empty')}</p>}
      </section>
    </>
  )
}
