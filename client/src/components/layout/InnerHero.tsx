import { GemIcon } from '@/components/ui/GemIcon'
import { GoldRule } from '@/components/ui/GoldRule'

interface InnerHeroProps {
  eyebrow?: string
  title: string
  intro?: string
  accentColor?: string
}

/** Compact hero band for inner (non-home) pages. */
export function InnerHero({ eyebrow, title, intro, accentColor }: InnerHeroProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-[136px] sm:pt-[160px]">
      {/* Subtle radial glow backdrop */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-50"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${
            accentColor ?? '#1E82FF'
          }22, transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="container-bellagio text-center">
        <div className="glow-halo">
          <div className="flex justify-center">
            <GemIcon size={26} color={accentColor ?? 'var(--electric)'} />
          </div>
          {eyebrow && (
            <p className="label mt-4 text-[0.65rem] text-gold">{eyebrow}</p>
          )}
          <h1 className="mt-3 text-balance font-display text-5xl font-light text-white sm:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mx-auto mt-4 max-w-2xl text-balance text-smoke">
              {intro}
            </p>
          )}
        </div>
        <GoldRule withGem className="mx-auto mt-8 max-w-md" />
      </div>
    </section>
  )
}

export default InnerHero
