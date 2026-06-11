import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import type { Venue } from '@/data/types'
import { buildImageUrl } from '@/lib/cloudinary'
import { GemIcon } from '@/components/ui/GemIcon'
import { VenuePill } from '@/components/ui/VenuePill'
import { GlowLink } from '@/components/ui/GlowButton'

/** 100vh full-bleed hero with parallax background + diamond gem above title. */
export function VenueHero({ venue }: { venue: Venue }) {
  const { t } = useTranslation()
  const { L } = useL()
  const [offset, setOffset] = useState(0)

  // Background parallax at 0.4x scroll speed.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setOffset(window.scrollY * 0.4))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 -z-10 scale-110 bg-cover bg-center"
        style={{
          backgroundImage: `url(${buildImageUrl(venue.heroImage, {
            width: 1920,
          })})`,
          transform: `translateY(${offset}px) scale(1.1)`,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black" />

      <div className="container-bellagio text-center">
        <div className="glow-halo">
          <div className="flex justify-center">
            <GemIcon size={34} color={venue.accentColor} />
          </div>
          <h1 className="mt-6 font-display text-5xl font-light text-white sm:text-7xl">
            {L(venue.name)}
          </h1>
          <p
            className="mt-3 font-script text-3xl sm:text-4xl"
            style={{ color: venue.accentColor }}
          >
            {L(venue.tagline)}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <VenuePill>
            {t('common.upToGuests', { count: venue.capacity })}
          </VenuePill>
          <VenuePill>{venue.area}</VenuePill>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowLink to="#packages" variant="primary">
            {t('cta.seePackages')}
          </GlowLink>
          <GlowLink to="#enquiry" variant="outline">
            {t('cta.bookVisit')}
          </GlowLink>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 9l6 6 6-6"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}

export default VenueHero
