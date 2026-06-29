import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  compact?: boolean
  /** Light (white) emblem for dark backgrounds (e.g. footer / dark hero). */
  dark?: boolean
}

/**
 * The real Bellagio Event's emblem — gem + facing "BB" monogram over the
 * wordmark — rendered from a compressed WebP (the source vectors live in
 * public/bellagio-events-logo{,-gold,-white}.svg). Gold on light, white on dark.
 */
export function Logo({ className, compact = false, dark = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className ?? ''}`}
      aria-label="Bellagio Event's — accueil"
    >
      <img
        src={dark ? '/logo-white.webp' : '/logo-gold.webp'}
        alt=""
        width={172}
        height={240}
        className="h-11 w-auto transition-transform duration-300 group-hover:scale-[1.04]"
      />
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
