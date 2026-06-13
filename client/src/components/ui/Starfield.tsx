import { useMemo } from 'react'

interface StarfieldProps {
  /** Number of stars. */
  count?: number
  className?: string
}

/**
 * A subtle field of twinkling stars — evokes the kosha's starlit
 * backdrop. Layer behind content in dark ("starlit") sections.
 */
export function Starfield({ count = 60, className }: StarfieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4,
        duration: Math.random() * 2.5 + 2,
      })),
    [count],
  )

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gold-lt"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 6px 1px rgba(227,203,142,0.7)',
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default Starfield
