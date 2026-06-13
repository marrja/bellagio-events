import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import type { Venue } from '@/data/types'
import { LazyImage } from '@/components/ui/LazyImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

// Asymmetric layout hints: portrait · square · landscape (+ extra)
const SHAPES = [
  { ratio: [4, 5], span: 'sm:row-span-2' },
  { ratio: [1, 1], span: '' },
  { ratio: [4, 3], span: '' },
  { ratio: [4, 3], span: 'sm:col-span-2' },
] as const

export function VenueAtmosphere({ venue }: { venue: Venue }) {
  const { t } = useTranslation()
  const { L } = useL()
  const images = venue.galleryImages.slice(0, 4)

  return (
    <section className="container-bellagio py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={t('venue.atmosphereTitle')}
          title={L(venue.name)}
          intro={L(venue.tagline)}
          accentColor={venue.accentColor}
        />
      </Reveal>

      {/* Mobile: horizontal scroll carousel / Desktop: asymmetric grid */}
      <Reveal delay={120}>
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:grid-rows-2 sm:overflow-visible sm:pb-0">
          {images.map((src, i) => {
            const shape = SHAPES[i % SHAPES.length]
            const eventName = venue.events[i % venue.events.length]?.name
            return (
              <div
                key={src}
                className={`group relative w-[78vw] shrink-0 snap-center overflow-hidden rounded-md sm:w-auto ${shape.span}`}
                style={
                  { '--accent': venue.accentColor } as React.CSSProperties
                }
              >
                <LazyImage
                  src={src}
                  alt={`${L(venue.name)} — ${L(eventName)}`}
                  width={shape.ratio[0] * 200}
                  height={shape.ratio[1] * 200}
                  sizes="(max-width: 640px) 78vw, 33vw"
                  className="h-full"
                  imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                {/* Accent overlay + event-type tag on hover */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to top, ${venue.accentColor}55, transparent 60%)`,
                  }}
                />
                <span className="label absolute bottom-4 start-4 translate-y-2 text-[0.64rem] text-pearl opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {L(eventName)}
                </span>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

export default VenueAtmosphere
