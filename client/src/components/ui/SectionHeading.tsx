import { GemIcon } from './GemIcon'

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string
  title: string
  intro?: string
  align?: 'center' | 'left'
  accentColor?: string
  className?: string
}

/** Reusable section heading: gem marker, eyebrow label, display title. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  accentColor,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div
      className={`${centered ? 'mx-auto text-center' : 'text-left'} max-w-2xl ${
        className ?? ''
      }`}
    >
      <div
        className={`flex items-center gap-3 ${
          centered ? 'justify-center' : ''
        }`}
      >
        <GemIcon size={16} color={accentColor ?? 'var(--accent)'} />
        {eyebrow && (
          <span className="label text-[0.65rem] text-gold">{eyebrow}</span>
        )}
      </div>
      <h2 className="mt-4 text-balance font-display text-4xl font-light text-white sm:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-balance text-smoke">{intro}</p>
      )}
    </div>
  )
}

export default SectionHeading
