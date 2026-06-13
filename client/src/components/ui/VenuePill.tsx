interface VenuePillProps {
  children: React.ReactNode
  className?: string
  /** Use on dark/starlit backgrounds. */
  dark?: boolean
}

/** Small outlined capacity / area badge. */
export function VenuePill({ children, className, dark }: VenuePillProps) {
  return (
    <span
      className={`label inline-flex items-center rounded-full border px-4 py-1.5 text-[0.6rem] ${
        dark ? 'border-gold/35 text-pearl/85' : 'border-gold/30 text-muted'
      } ${className ?? ''}`}
    >
      {children}
    </span>
  )
}

export default VenuePill
