import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import type { Venue } from '@/data/types'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { RevealText } from '@/components/ui/RevealText'
import { GemIcon } from '@/components/ui/GemIcon'
import { Butterfly } from '@/components/ui/Butterfly'
import { FairyLights } from '@/components/ui/FairyLights'
import { VenuePill } from '@/components/ui/VenuePill'
import { GlowButton } from '@/components/ui/GlowButton'
import { scrollToEl } from '@/lib/smoothScroll'

/** 100vh full-bleed hero with parallax background + gem above the title. */
export function VenueHero({ venue }: { venue: Venue }) {
  const { t } = useTranslation()
  const { L } = useL()

  return (
    <section className="relative flex h-[100svh] min-h-[580px] items-center justify-center overflow-hidden">
      <ParallaxImage src={venue.heroImage} alt="" priority strength={140} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noir/70 via-noir/45 to-noir/85" />

      <FairyLights count={23} className="absolute inset-x-0 top-24 opacity-80" />

      <div className="container-bellagio text-center">
        <div className="glow-halo">
          <div className="flex items-center justify-center gap-4" aria-hidden>
            <Butterfly size={26} color="var(--gold-lt)" className="animate-float" />
            <GemIcon size={26} color="var(--gold-lt)" />
            <Butterfly size={26} color="var(--gold-lt)" className="animate-float" />
          </div>
          <p className="label mt-5 text-[0.62rem] text-gold-lt">{L(venue.subtitle)}</p>
          <RevealText
            as="h1"
            text={L(venue.name)}
            delay={0.1}
            className="mt-3 font-display text-5xl font-light text-pearl sm:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-script text-3xl text-gold-lt sm:text-4xl"
          >
            {L(venue.tagline)}
          </motion.p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <VenuePill dark>{t('common.upToGuests', { count: venue.capacity })}</VenuePill>
          <VenuePill dark>{venue.area}</VenuePill>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton variant="primary" onClick={() => scrollToEl('#packages')}>
            {t('cta.seePackages')}
          </GlowButton>
          <GlowButton variant="outlineLight" onClick={() => scrollToEl('#enquiry')}>
            {t('cta.bookVisit')}
          </GlowButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="var(--gold-lt)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

export default VenueHero
