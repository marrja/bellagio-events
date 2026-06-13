interface FairyLightsProps {
  /** Number of light dots. */
  count?: number
  className?: string
}

/**
 * A strand of warm, twinkling fairy lights — the venue's signature
 * ceiling motif, used here as an elegant section divider.
 */
export function FairyLights({ count = 13, className }: FairyLightsProps) {
  return (
    <div className={`fairy-strand ${className ?? ''}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${(i % 5) * 0.4}s`,
            // gentle scallop: dip the middle lights lower
            transform: `translateY(${Math.sin((i / count) * Math.PI) * 6}px)`,
          }}
        />
      ))}
    </div>
  )
}

export default FairyLights
