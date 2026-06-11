interface GemIconProps {
  /** Pixel size of the square viewport. */
  size?: number
  /** Stroke / fill color. Defaults to the active accent CSS var. */
  color?: string
  /** Solid fill instead of outline. */
  filled?: boolean
  className?: string
  /** Decorative by default; pass a title to expose to AT. */
  title?: string
}

/**
 * The diamond gem motif — the crown shape from the Bellagio "B" logo.
 * Pure SVG, recoloured via props. Used as bullets, section markers,
 * decorative dividers and icon replacements throughout the site.
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
      {/* Outer diamond */}
      <path
        d="M12 2 L20 9 L12 22 L4 9 Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.9 : 0}
      />
      {/* Crown girdle */}
      <path d="M4 9 L20 9" stroke={color} strokeWidth={1.4} />
      {/* Crown facets */}
      <path
        d="M8 5.4 L12 9 L16 5.4"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Pavilion center line */}
      <path
        d="M12 9 L12 22"
        stroke={color}
        strokeWidth={0.9}
        opacity={0.5}
      />
    </svg>
  )
}

export default GemIcon
