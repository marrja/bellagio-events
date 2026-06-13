import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import { getGallery } from '@/lib/api'
import type { GalleryItem, GalleryEventType, VenueSlug } from '@/data/types'
import { buildImageUrl } from '@/lib/cloudinary'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { LazyImage } from '@/components/ui/LazyImage'
import { GemIcon } from '@/components/ui/GemIcon'
import { Reveal } from '@/components/ui/Reveal'

const TYPES: GalleryEventType[] = ['wedding', 'corporate', 'gala', 'garden', 'cocktail', 'other']

const ratioDims = (r: GalleryItem['ratio']) =>
  r === 'portrait' ? [600, 800] : r === 'landscape' ? [800, 560] : [640, 640]

export default function Gallery() {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [venueFilter, setVenueFilter] = useState<VenueSlug | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<GalleryEventType | 'all'>('all')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  useEffect(() => {
    getGallery().then(setItems)
  }, [])

  // Lock scroll + close on Escape when the lightbox is open.
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const filtered = items.filter(
    (it) =>
      (venueFilter === 'all' || it.venueSlug === venueFilter) &&
      (typeFilter === 'all' || it.eventTypes.includes(typeFilter)),
  )

  const chip = (active: boolean) =>
    `label rounded-full border px-4 py-2 text-[0.58rem] transition-all duration-300 ${
      active ? 'border-gold bg-gold/10 text-gold-dk' : 'border-gold/25 text-faint hover:text-ink'
    }`

  return (
    <>
      <Seo
        title="Galerie Photos & Vidéos — Bellagio Event's"
        description="Découvrez nos espaces en images."
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Galerie', path: '/galerie' },
        ])}
      />

      <InnerHero
        eyebrow={t('brand.name')}
        title={t('galleryPage.title')}
        intro={t('galleryPage.intro')}
      />

      {/* Filters */}
      <div className="container-bellagio space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => setVenueFilter('all')} className={chip(venueFilter === 'all')}>
            {t('galleryPage.all')}
          </button>
          {venues.map((v) => (
            <button
              key={v.slug}
              type="button"
              onClick={() => setVenueFilter(v.slug)}
              className={chip(venueFilter === v.slug)}
            >
              {L(v.name)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => setTypeFilter('all')} className={chip(typeFilter === 'all')}>
            {t('galleryPage.all')}
          </button>
          {TYPES.map((ty) => (
            <button
              key={ty}
              type="button"
              onClick={() => setTypeFilter(ty)}
              className={chip(typeFilter === ty)}
            >
              {t(`filters.${ty}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <section className="container-bellagio py-16">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted">{t('galleryPage.empty')}</p>
        ) : (
          <div className="columns-2 gap-4 [column-fill:_balance] lg:columns-3">
            {filtered.map((item, i) => {
              const [w, h] = ratioDims(item.ratio)
              return (
                <Reveal
                  key={item.id}
                  delay={(i % 3) * 50}
                  className="mb-4 block break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="group block w-full overflow-hidden rounded-md"
                    aria-label={L(item.caption)}
                  >
                    <LazyImage
                      src={item.src}
                      alt={L(item.caption)}
                      width={w}
                      height={h}
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </button>
                </Reveal>
              )
            })}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-2xl text-pearl transition-colors hover:border-gold-lt hover:text-gold-lt"
              aria-label="Fermer"
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
            <motion.figure
              className="max-h-[88vh] max-w-5xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={buildImageUrl(lightbox.src, { width: 1600 })}
                alt={L(lightbox.caption)}
                className="max-h-[80vh] w-auto rounded-md object-contain"
              />
              <figcaption className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-pearl/80">
                <GemIcon size={12} color="var(--gold)" />
                {L(lightbox.caption)}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
