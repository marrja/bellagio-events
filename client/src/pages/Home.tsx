import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import { getFeaturedGallery, getTestimonials } from '@/lib/api'
import type { GalleryItem, Testimonial } from '@/data/types'
import { TIERS } from '@/data/tiers'
import { Seo } from '@/components/Seo'
import { localBusinessJsonLd } from '@/lib/jsonld'
import { VenueCard } from '@/components/venue/VenueCard'
import { LazyImage } from '@/components/ui/LazyImage'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { GemIcon } from '@/components/ui/GemIcon'
import { Butterfly } from '@/components/ui/Butterfly'
import { FairyLights } from '@/components/ui/FairyLights'
import { Starfield } from '@/components/ui/Starfield'
import { GlowLink } from '@/components/ui/GlowButton'
import { GoldRule } from '@/components/ui/GoldRule'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { RevealText } from '@/components/ui/RevealText'
import { motion } from 'framer-motion'

const HERO_BG = '/venue/hall/hall-aisle.jpg'

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
        description="Deux espaces d'exception — une salle de lumière et un jardin sous les étoiles — pour vos mariages, fiançailles et célébrations."
        jsonLd={localBusinessJsonLd()}
        preloadImage={HERO_BG}
      />

      {/* [1] HERO */}
      <section className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden">
        <ParallaxImage src={HERO_BG} alt="" priority strength={140} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noir/55 via-noir/35 to-noir/80" />

        <FairyLights count={27} className="absolute inset-x-0 top-24 opacity-90" />

        <div className="container-bellagio text-center">
          <div className="glow-halo">
            <div className="flex items-center justify-center gap-5" aria-hidden>
              <Butterfly size={30} color="var(--gold-lt)" className="animate-float" />
              <GemIcon size={30} color="var(--gold-lt)" />
              <Butterfly size={30} color="var(--gold-lt)" className="animate-float" />
            </div>
            <RevealText
              as="h1"
              text={t('home.heroTitle')}
              delay={0.15}
              className="mt-6 text-balance font-display text-5xl font-light leading-[1.05] text-pearl sm:text-7xl lg:text-8xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-script text-3xl text-gold-lt sm:text-5xl"
            >
              {t('home.heroSubtitle')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <GlowLink to="/nos-espaces" variant="primary">
              {t('cta.discoverSpaces')}
            </GlowLink>
            <GlowLink to="/contact" variant="outlineLight">
              {t('cta.requestVisit')}
            </GlowLink>
          </motion.div>
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

      {/* [3b] SIGNATURE — asymmetric editorial split */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <div className="container-bellagio">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Imagery */}
            <div className="relative lg:col-span-7">
              <Reveal variant="mask">
                <LazyImage
                  src="/venue/hall/hall-kosha.jpg"
                  alt={t('home.experienceTitle')}
                  width={1080}
                  height={760}
                  className="rounded-2xl shadow-lift"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </Reveal>
              {/* Overlapping accent image */}
              <Reveal
                variant="mask"
                delay={180}
                className="absolute -bottom-8 end-4 hidden w-44 sm:block lg:w-56"
              >
                <LazyImage
                  src="/venue/hall/table-setting.jpg"
                  alt=""
                  width={440}
                  height={560}
                  className="rounded-2xl border-4 border-cream shadow-lift"
                  sizes="220px"
                />
              </Reveal>
              {/* Vertical side label */}
              <span
                className="label absolute -start-3 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[0.6rem] text-gold-dk lg:block"
                aria-hidden
              >
                Bellagio Event's
              </span>
            </div>

            {/* Copy */}
            <div className="lg:col-span-5">
              <Reveal>
                <p className="label text-[0.64rem] text-gold-dk">{t('home.experienceEyebrow')}</p>
                <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
                  {t('home.experienceTitle')}
                </h2>
                <p className="mt-5 leading-relaxed text-muted">{t('home.experienceText')}</p>
                <ul className="mt-8 space-y-4">
                  {[t('home.sig1'), t('home.sig2'), t('home.sig3')].map((sig, i) => (
                    <li key={sig} className="flex items-center gap-4">
                      <span className="font-display text-2xl text-gold/70">
                        0{i + 1}
                      </span>
                      <span className="h-px w-8 bg-gold/40" />
                      <span className="font-display text-xl text-ink">{sig}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <GlowLink to="/a-propos" variant="outline">
                    {t('cta.learnMore')}
                  </GlowLink>
                </div>
              </Reveal>
            </div>
          </div>
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
            <Reveal key={item.id} variant="mask" delay={(i % 3) * 90} className="mb-4 block break-inside-avoid">
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
                    <span className="label text-[0.64rem] text-faint">{L(tm.eventType)}</span>
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
