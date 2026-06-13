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
import { Butterfly } from '@/components/ui/Butterfly'
import { FairyLights } from '@/components/ui/FairyLights'
import { Starfield } from '@/components/ui/Starfield'
import { GlowLink } from '@/components/ui/GlowButton'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const HERO_BG = '/venue/hall-aisle.jpg'

export default function Home() {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const [featured, setFeatured] = useState<GalleryItem[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getFeaturedGallery().then(setFeatured)
    getTestimonials().then(setTestimonials)
  }, [])

  // Subtle hero parallax
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setOffset(window.scrollY * 0.35))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <Seo
        title="Bellagio Event's — Salle de Mariage & Événements en Tunisie"
        description="Deux espaces d'exception — une salle de lumière et un jardin sous les étoiles — pour vos mariages, fiançailles et célébrations."
        jsonLd={localBusinessJsonLd()}
      />

      {/* [1] HERO */}
      <section className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10 scale-110 bg-cover bg-center"
          style={{
            backgroundImage: `url(${buildImageUrl(HERO_BG, { width: 1920 })})`,
            transform: `translateY(${offset}px) scale(1.1)`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noir/55 via-noir/35 to-noir/80" />

        <FairyLights count={27} className="absolute inset-x-0 top-24 opacity-90" />

        <div className="container-bellagio text-center">
          <div className="glow-halo">
            <div className="flex items-center justify-center gap-5" aria-hidden>
              <Butterfly size={30} color="var(--gold-lt)" className="animate-float" />
              <GemIcon size={30} color="var(--gold-lt)" />
              <Butterfly size={30} color="var(--gold-lt)" className="animate-float" />
            </div>
            <h1 className="mt-6 text-balance font-display text-5xl font-light leading-[1.05] text-pearl sm:text-7xl lg:text-8xl">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-4 font-script text-3xl text-gold-lt sm:text-5xl">
              {t('home.heroSubtitle')}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GlowLink to="/nos-espaces" variant="primary">
              {t('cta.discoverSpaces')}
            </GlowLink>
            <GlowLink to="/contact" variant="outlineLight">
              {t('cta.requestVisit')}
            </GlowLink>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="var(--gold-lt)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* [2] INTRO STRIP */}
      <section className="container-bellagio py-20 text-center sm:py-24">
        <Reveal>
          <GemIcon size={22} color="var(--gold)" className="mx-auto" />
          <p className="mx-auto mt-6 max-w-3xl text-balance font-display text-2xl font-light italic leading-relaxed text-ink sm:text-3xl">
            {t('home.introQuote')}
          </p>
          <FairyLights count={15} className="mt-8" />
        </Reveal>
      </section>

      {/* [3] TWO VENUES */}
      <section className="container-bellagio pb-20 sm:pb-28">
        <Reveal>
          <SectionHeading eyebrow={t('nav.venues')} title={t('home.venuesTitle')} intro={t('home.venuesIntro')} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {venues.map((v, i) => (
            <Reveal key={v.slug} delay={i * 100}>
              <VenueCard venue={v} eager={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* [4] PACKAGES TEASER — starlit dark */}
      <section className="section-noir relative overflow-hidden py-20 sm:py-28">
        <Starfield count={55} />
        <div className="container-bellagio relative">
          <Reveal>
            <SectionHeading eyebrow={t('nav.packages')} title={t('home.packagesTitle')} intro={t('home.packagesIntro')} dark />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/10 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.id} delay={(i % 4) * 80} className="h-full">
                <div className="flex h-full flex-col items-center gap-3 bg-noir p-8 text-center transition-colors duration-300 hover:bg-espresso">
                  <GemIcon size={20} color="var(--gold-lt)" filled={i === 3} />
                  <h3 className="label text-sm text-pearl">{tier.name}</h3>
                  <p className="font-display text-base italic text-pearl/60">{L(tier.motto)}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <GlowLink to="/formules" variant="outlineLight">
              {t('cta.seeAllPackages')}
            </GlowLink>
          </div>
        </div>
      </section>

      {/* [5] FEATURED GALLERY */}
      <section className="container-bellagio py-20 sm:py-28">
        <Reveal>
          <SectionHeading eyebrow={t('nav.gallery')} title={t('home.galleryTitle')} intro={t('home.galleryIntro')} />
        </Reveal>
        <div className="mt-12 columns-2 gap-4 [column-fill:_balance] lg:columns-3">
          {featured.slice(0, 6).map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 60} className="mb-4 block break-inside-avoid">
              <Link to="/galerie" className="group block overflow-hidden rounded-2xl shadow-soft">
                <LazyImage
                  src={item.src}
                  alt={L(item.caption)}
                  width={item.ratio === 'portrait' ? 600 : item.ratio === 'landscape' ? 800 : 600}
                  height={item.ratio === 'portrait' ? 800 : item.ratio === 'landscape' ? 600 : 600}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-105"
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

      {/* [6] TESTIMONIALS */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-bellagio">
          <Reveal>
            <SectionHeading eyebrow="❝" title={t('home.testimonialsTitle')} />
          </Reveal>
          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {testimonials.map((tm) => (
              <figure
                key={tm.id}
                className="w-[85vw] shrink-0 snap-center rounded-2xl border border-gold/15 bg-pearl p-7 shadow-soft sm:w-[420px]"
              >
                <div className="flex gap-1" aria-label={`${tm.rating}/5`}>
                  {Array.from({ length: tm.rating }).map((_, i) => (
                    <GemIcon key={i} size={13} color="var(--gold)" filled />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-xl font-light italic leading-relaxed text-ink">
                  “{L(tm.quote)}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <GemIcon size={14} color="var(--gold)" />
                  <span>
                    <span className="block text-sm text-ink">{tm.clientName}</span>
                    <span className="label text-[0.58rem] text-faint">{L(tm.eventType)}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* [7] CTA BANNER — starlit dark */}
      <section className="section-noir relative overflow-hidden py-24 sm:py-32">
        <Starfield count={70} />
        <FairyLights count={23} className="absolute inset-x-0 top-10 opacity-80" />
        <div className="container-bellagio relative text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4" aria-hidden>
              <Butterfly size={26} color="var(--gold-lt)" />
              <GemIcon size={26} color="var(--gold-lt)" />
              <Butterfly size={26} color="var(--gold-lt)" />
            </div>
            <h2 className="mt-6 text-balance font-display text-4xl font-light text-pearl sm:text-5xl">
              {t('home.ctaBannerTitle')}
            </h2>
            <p className="mt-4 text-pearl/70">{t('home.ctaBannerText')}</p>
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
