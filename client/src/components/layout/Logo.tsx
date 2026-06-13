import { Link } from 'react-router-dom'
import { GemIcon } from '@/components/ui/GemIcon'

interface LogoProps {
  className?: string
  compact?: boolean
  /** Light text for dark backgrounds (e.g. footer). */
  dark?: boolean
}

/**
 * The Bellagio emblem: the diamond gem above the facing "BB" monogram,
 * beside the wordmark — echoing the venue's gold logo.
 */
export function Logo({ className, compact = false, dark = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className ?? ''}`}
      aria-label="Bellagio Event's — accueil"
    >
      <span className="relative inline-flex flex-col items-center leading-none">
        <GemIcon size={13} color="var(--gold)" className="mb-[-2px]" />
        <span
          className="font-display text-2xl italic text-gold transition-colors duration-300 group-hover:text-gold-lt"
          style={{ letterSpacing: '-0.16em' }}
        >
          <span className="inline-block">B</span>
          <span className="inline-block" style={{ transform: 'scaleX(-1)' }}>B</span>
        </span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-lg tracking-elegant ${dark ? 'text-pearl' : 'text-ink'}`}
          >
            Bellagio
          </span>
          <span className="label text-[0.5rem] text-gold-dk">Event's</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
