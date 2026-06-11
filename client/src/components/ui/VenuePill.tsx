interface VenuePillProps {
  children: React.ReactNode
  className?: string
}

/** Small outlined capacity / area badge. */
export function VenuePill({ children, className }: VenuePillProps) {
  return (
    <span
      className={`label inline-flex items-center rounded-full border border-white/25 px-4 py-1.5 text-[0.65rem] text-silver ${
        className ?? ''
      }`}
    >
      {children}
    </span>
  )
}

export default VenuePill
