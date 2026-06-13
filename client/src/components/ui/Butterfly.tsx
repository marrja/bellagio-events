interface ButterflyProps {
  size?: number
  color?: string
  className?: string
}

/**
 * Delicate line-art butterfly — echoing the illuminated butterflies
 * that frame the venue's stage of honour. Decorative accent.
 */
export function Butterfly({ size = 28, color = 'var(--gold)', className }: ButterflyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Body */}
      <path d="M24 12 V36" stroke={color} strokeWidth={1.1} strokeLinecap="round" />
      {/* Antennae */}
      <path d="M24 12 C22 8 20 7 18 6 M24 12 C26 8 28 7 30 6" stroke={color} strokeWidth={0.9} strokeLinecap="round" />
      {/* Upper wings */}
      <path
        d="M24 16 C16 6 4 8 6 18 C7 24 16 24 24 20 Z"
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
        fill={color}
        fillOpacity={0.07}
      />
      <path
        d="M24 16 C32 6 44 8 42 18 C41 24 32 24 24 20 Z"
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
        fill={color}
        fillOpacity={0.07}
      />
      {/* Lower wings */}
      <path
        d="M24 22 C18 24 10 26 11 33 C12 39 20 36 24 30 Z"
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
        fill={color}
        fillOpacity={0.07}
      />
      <path
        d="M24 22 C30 24 38 26 37 33 C36 39 28 36 24 30 Z"
        stroke={color}
        strokeWidth={1}
        strokeLinejoin="round"
        fill={color}
        fillOpacity={0.07}
      />
    </svg>
  )
}

export default Butterfly
