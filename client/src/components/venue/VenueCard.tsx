import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import type { Venue } from '@/data/types'
import { LazyImage } from '@/components/ui/LazyImage'
import { GemIcon } from '@/components/ui/GemIcon'

interface VenueCardProps {
  venue: Venue
  eager?: boolean
}

/** Full-bleed venue card with gem-on-hover + accent border glow. */
export function VenueCard({ venue, eager }: VenueCardProps) {
  const { t } = useTranslation()
  const { L } = useL()

  return (
    <Link
      to={`/espaces/${venue.slug}`}
      className="group relative block overflow-hidden rounded-md"
      style={{ '--accent': venue.accentColor } as React.CSSProperties}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <LazyImage
          src={venue.heroImage}
          alt={L(venue.name)}
          width={800}
          height={1000}
          eager={eager}
          sizes="(max-width: 768px) 100vw, 33vw"
          imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>

      {/* Gradient + accent border glow on hover */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <span
        className="pointer-events-none absolute inset-0 rounded-md border opacity-0 transition-all duration-700 ease-out group-hover:opacity-100"
        style={{
          borderColor: venue.accentColor,
          boxShadow: `0 0 28px ${venue.accentColor}55`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-3 -translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <GemIcon size={18} color={venue.accentColor} />
        </div>
        <h3 className="font-display text-2xl font-light text-white">
          {L(venue.name)}
        </h3>
        <p className="mt-1 text-sm text-silver">
          {t('common.upToGuests', { count: venue.capacity })}
        </p>
        <span
          className="label mt-4 inline-flex items-center gap-2 text-[0.65rem]"
          style={{ color: venue.accentColor }}
        >
          {t('cta.learnMore')}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  )
}

export default VenueCard
