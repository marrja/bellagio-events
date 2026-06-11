import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import type { Tier } from '@/data/types'
import { GemIcon } from './GemIcon'
import { GlowLink } from './GlowButton'

interface TierCardProps {
  tier: Tier
  /** "à partir de X TND" price, in TND. */
  price?: number
  accentColor?: string
  /** Where the "Demander un devis" CTA points. */
  enquireTo: string
  /** Start expanded (used on the packages comparison page). */
  defaultOpen?: boolean
  highlight?: boolean
}

export function TierCard({
  tier,
  price,
  accentColor = '#1E82FF',
  enquireTo,
  defaultOpen = false,
  highlight = false,
}: TierCardProps) {
  const { t } = useTranslation()
  const { L } = useL()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={`flex flex-col rounded-md border bg-deep/60 p-6 transition-colors duration-300 ${
        highlight ? 'border-gold/60' : 'border-white/10'
      }`}
      style={
        { '--accent': accentColor } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="label text-sm text-white">{tier.name}</h3>
          <p className="mt-1 font-display text-lg italic text-silver">
            {L(tier.motto)}
          </p>
        </div>
        <GemIcon size={20} color={accentColor} filled={highlight} />
      </div>

      {price !== undefined && (
        <p className="mt-4 text-smoke">
          <span className="text-xs uppercase tracking-wide">
            {t('common.from')}
          </span>{' '}
          <span className="font-display text-2xl text-white">
            {price.toLocaleString('fr-FR')}
          </span>{' '}
          <span className="text-sm text-silver">TND</span>
        </p>
      )}

      {/* Expandable inclusions */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="label mt-5 flex items-center gap-2 text-[0.65rem] text-silver transition-colors hover:text-white"
      >
        {t('packagesPage.inclusions')}
        <span
          className="transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <li className="h-3" aria-hidden />
            {tier.inclusions.map((inc, i) => (
              <li
                key={i}
                className="flex items-start gap-3 py-1.5 text-sm text-silver"
              >
                <span className="mt-1 shrink-0">
                  <GemIcon size={11} color={accentColor} />
                </span>
                <span>{L(inc)}</span>
              </li>
            ))}
            <li className="mt-3 border-t border-white/10 pt-3 text-xs italic text-smoke">
              {L(tier.footnote)}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="mt-6 flex-1" />
      <GlowLink to={enquireTo} variant="outline" fullWidth className="mt-2">
        {t('cta.requestQuote')}
      </GlowLink>
    </div>
  )
}

export default TierCard
