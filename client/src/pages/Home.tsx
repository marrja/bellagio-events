import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import { getFeaturedGallery, getTestimonials } from '@/lib/api'
import type { GalleryItem, Testimonial } from '@/data/types'
import { TIERS } from '@/data/tiers'
import { buildImageUrl } from '@/lib/cloudinary'
import { Seo } from '@/components/Seo'
import { localBusinessJsonLd } from '@/lib/jsonld'
import { VenueCard } from '@/components/venue/VenueCard'
import { LazyImage } from '@/components/ui/LazyImage'
import { GemIcon } from '@/components/ui/GemIcon'
import { GlowLink } from '@/components/ui/GlowButton'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const HERO_BG =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop'

export default function Home() {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const [featured, setFeatured] = useState<GalleryItem[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    getFeaturedGallery().then(setFeatured)
    getTestimonials().then(setTestimonials)
  }, [])

  return (
    <>
      <Seo
        title="Bellagio Event's — Salle de Mariage & Événements en Tunisie"
        description="Trois espaces d'exception pour vos mariages, galas, et événements privés en Tunisie."
        jsonLd={localBusinessJsonLd()}
      />

      {/* [1] HERO */}
      <section className="relative flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${buildImageUrl(HERO_BG, { width: 1920 })})` }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-black" />

        <div className="container-bellagio text-center">
          <div className="glow-halo">
            <div className="flex justify-center">
              <GemIcon size={40} color="var(--electric)" />
            </div>
            <h1 className="mt-6 text-balance font-display text-5xl font-light leading-tight text-white sm:text-7xl lg:text-8xl">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-4 font-script text-3xl text-gold sm:text-4xl">
              {t('home.heroSubtitle')}
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <GlowLink to="/nos-espaces" variant="primary">
              {t('cta.discoverSpaces')}
            </GlowLink>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* [2] THREE VENUES */}
      <section className="container-bellagio py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={t('nav.venues')}
            title={t('home.venuesTitle')}
            intro={t('home.venuesIntro')}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((v, i) => (
            <Reveal key={v.slug} delay={(i % 3) * 80}>
              <VenueCard venue={v} eager={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* [3] PACKAGES TEASER */}
      <section className="bg-deep py-20 sm:py-28">
        <div className="container-bellagio">
          <Reveal>
            <SectionHeading
              eyebrow={t('nav.packages')}
              title={t('home.packagesTitle')}
              intro={t('home.packagesIntro')}
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.id} delay={(i % 4) * 80} className="h-full">
                <div className="flex h-full flex-col items-center gap-3 bg-black p-8 text-center transition-colors duration-300 hover:bg-surface/40">
                  <GemIcon size={20} color={i === 3 ? 'var(--gold)' : 'var(--electric)'} filled={i === 3} />
                  <h3 className="label text-sm text-white">{tier.name}</h3>
                  <p className="font-display text-base italic text-smoke">
                    {L(tier.motto)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <GlowLink to="/formules" variant="outline">
              {t('cta.seeAllPackages')}
            </GlowLink>
          </div>
        </div>
      </section>

      {/* [4] FEATURED GALLERY */}
      <section className="container-bellagio py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={t('nav.gallery')}
            title={t('home.galleryTitle')}
            intro={t('home.galleryIntro')}
          />
        </Reveal>
        <div className="mt-12 columns-2 gap-4 [column-fill:_balance] lg:columns-3">
          {featured.slice(0, 6).map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 60} className="mb-4 block break-inside-avoid">
              <Link to="/galerie" className="group block overflow-hidden rounded-md">
                <LazyImage
                  src={item.src}
                  alt={L(item.caption)}
                  width={item.ratio === 'portrait' ? 600 : item.ratio === 'landscape' ? 800 : 600}
                  height={item.ratio === 'portrait' ? 800 : item.ratio === 'landscape' ? 600 : 600}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <GlowLink to="/galerie" variant="outline">
            {t('cta.seeFullGallery')}
          </GlowLink>
        </div>
      </section>

      {/* [5] TESTIMONIALS */}
      <section className="bg-deep py-20 sm:py-28">
        <div className="container-bellagio">
          <Reveal>
            <SectionHeading eyebrow="❝" title={t('home.testimonialsTitle')} />
          </Reveal>
          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {testimonials.map((tm) => (
              <figure
                key={tm.id}
                className="w-[85vw] shrink-0 snap-center rounded-md border border-white/10 bg-surface/40 p-7 sm:w-[420px]"
              >
                <div className="flex gap-1" aria-label={`${tm.rating}/5`}>
                  {Array.from({ length: tm.rating }).map((_, i) => (
                    <GemIcon key={i} size={13} color="var(--gold)" filled />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-xl font-light italic leading-relaxed text-white">
                  “{L(tm.quote)}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <GemIcon size={14} color="var(--electric)" />
                  <span>
                    <span className="block text-sm text-white">{tm.clientName}</span>
                    <span className="label text-[0.6rem] text-smoke">
                      {L(tm.eventType)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* [6] CTA BANNER */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(30,130,255,0.22), transparent 70%)',
          }}
          aria-hidden
        />
        <div className="container-bellagio text-center">
          <Reveal>
            <GemIcon size={28} color="var(--electric)" className="mx-auto" />
            <h2 className="mt-6 text-balance font-display text-4xl font-light text-white sm:text-5xl">
              {t('home.ctaBannerTitle')}
            </h2>
            <p className="mt-4 text-smoke">{t('home.ctaBannerText')}</p>
            <GoldRule withGem className="mx-auto my-8 max-w-xs" />
            <GlowLink to="/contact" variant="primary">
              {t('cta.requestVisit')}
            </GlowLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
