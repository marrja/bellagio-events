import { GemIcon } from '@/components/ui/GemIcon'
import { FairyLights } from '@/components/ui/FairyLights'

interface InnerHeroProps {
  eyebrow?: string
  title: string
  intro?: string
  accentColor?: string
}

/** Compact luminous hero band for inner (non-home) pages. */
export function InnerHero({ eyebrow, title, intro, accentColor }: InnerHeroProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-[140px] sm:pt-[168px]">
      {/* Warm radial glow backdrop */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 opacity-70"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${
            accentColor ?? 'var(--gold-lt)'
          }33, transparent 70%)`,
        }}
        aria-hidden
      />
      <FairyLights count={17} className="mb-8 opacity-80" />
      <div className="container-bellagio text-center">
        <div className="glow-halo">
          {eyebrow && <p className="label mb-4 text-[0.62rem] text-gold-dk">{eyebrow}</p>}
          <h1 className="text-balance font-display text-5xl font-light text-ink sm:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mx-auto mt-4 max-w-2xl text-balance text-muted">{intro}</p>
          )}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-px w-16 bg-gold/40" />
          <GemIcon size={14} color={accentColor ?? 'var(--gold)'} />
          <span className="h-px w-16 bg-gold/40" />
        </div>
      </div>
    </section>
  )
}

export default InnerHero
