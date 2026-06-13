import { GemIcon } from './GemIcon'

interface MonogramProps {
  size?: number
  color?: string
  className?: string
}

/**
 * The Bellagio "BB" monogram — two facing serif B's crowned by the
 * diamond gem, echoing the venue's gold emblem. Pure SVG + type.
 */
export function Monogram({ size = 56, color = 'var(--gold)', className }: MonogramProps) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className ?? ''}`}
      style={{ color }}
      aria-hidden
    >
      <GemIcon size={size * 0.32} color={color} />
      <span
        className="relative font-display italic"
        style={{ fontSize: size, marginTop: -size * 0.12, letterSpacing: '-0.18em' }}
      >
        {/* Facing B's: the second is mirrored */}
        <span style={{ display: 'inline-block' }}>B</span>
        <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>B</span>
      </span>
    </span>
  )
}

export default Monogram
