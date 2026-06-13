import { GemIcon } from './GemIcon'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'center' | 'left'
  accentColor?: string
  /** Render light text for dark/starlit sections. */
  dark?: boolean
  className?: string
}

/** Reusable section heading: gem marker, eyebrow label, display title. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  accentColor,
  dark = false,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div
      className={`${centered ? 'mx-auto text-center' : 'text-left'} max-w-2xl ${
        className ?? ''
      }`}
    >
      <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-gold/50" aria-hidden />
        <GemIcon size={14} color={accentColor ?? 'var(--gold)'} />
        {eyebrow && (
          <span className="label text-[0.62rem] text-gold-dk">{eyebrow}</span>
        )}
        <GemIcon size={14} color={accentColor ?? 'var(--gold)'} />
        <span className="h-px w-8 bg-gold/50" aria-hidden />
      </div>
      <h2
        className={`mt-5 text-balance font-display text-4xl font-light sm:text-5xl ${
          dark ? 'text-pearl' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-balance ${dark ? 'text-pearl/70' : 'text-muted'}`}>
          {intro}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
