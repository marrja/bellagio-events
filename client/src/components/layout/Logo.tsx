import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  compact?: boolean
}

/**
 * The Bellagio wordmark: a script "B" monogram crowned with the
 * diamond gem, beside the brand name. Pure SVG + type.
 */
export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className ?? ''}`}
      aria-label="Bellagio Event's — accueil"
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center">
        {/* Diamond gem crown */}
        <svg
          viewBox="0 0 40 44"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path
            d="M20 2 L28 9 L20 15 L12 9 Z"
            fill="none"
            stroke="#C8A864"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M12 9 L28 9" stroke="#C8A864" strokeWidth="1.4" />
          <path
            d="M15.5 5.6 L20 9 L24.5 5.6"
            fill="none"
            stroke="#C8A864"
            strokeWidth="1.2"
          />
        </svg>
        {/* Script B */}
        <span className="font-script text-3xl leading-none text-electric translate-y-1.5 transition-colors duration-300 group-hover:text-electric-lt">
          B
        </span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-wide text-white">
            Bellagio
          </span>
          <span className="label text-[0.55rem] text-gold">Event's</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
