interface GemIconProps {
  size?: number
  /** Stroke / fill color. Defaults to the active accent (champagne gold). */
  color?: string
  filled?: boolean
  className?: string
  title?: string
}

/**
 * The diamond gem motif from the Bellagio monogram — a brilliant-cut
 * diamond. Pure SVG, recoloured via props. Used as bullets, section
 * markers and decorative marks throughout the site.
 */
export function GemIcon({
  size = 16,
  color = 'var(--accent)',
  filled = false,
  className,
  title,
}: GemIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {/* Table + crown */}
      <path
        d="M7 4 H17 L21 9 L12 21 L3 9 Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.9 : 0}
      />
      {/* Girdle */}
      <path d="M3 9 H21" stroke={color} strokeWidth={1.2} />
      {/* Crown facets */}
      <path d="M7 4 L9.5 9 L12 4 L14.5 9 L17 4" stroke={color} strokeWidth={1} strokeLinejoin="round" fill="none" opacity={0.85} />
      {/* Pavilion facets */}
      <path d="M3 9 L12 21 M21 9 L12 21 M9.5 9 L12 21 M14.5 9 L12 21" stroke={color} strokeWidth={0.8} opacity={0.5} />
    </svg>
  )
}

export default GemIcon
