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
      {/* Crest: gem set into a thin gold ring above the facing BB monogram */}
      <span className="relative mt-1.5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 transition-colors duration-300 group-hover:border-gold">
        <span className="absolute -top-[9px]">
          <GemIcon size={12} color="var(--gold)" />
        </span>
        <span
          className="font-display text-xl italic leading-none text-gold transition-colors duration-300 group-hover:text-gold-lt"
          style={{ letterSpacing: '-0.18em' }}
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
