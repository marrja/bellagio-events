import { GemIcon } from './GemIcon'

interface GoldRuleProps {
  /** Show a centered gem in the middle of the rule. */
  withGem?: boolean
  className?: string
  gemColor?: string
}

/** Thin horizontal gold divider — optionally centered with a gem. */
export function GoldRule({ withGem, className, gemColor }: GoldRuleProps) {
  if (withGem) {
    return (
      <div
        className={`flex items-center justify-center gap-4 ${className ?? ''}`}
        aria-hidden
      >
        <span className="gold-rule flex-1 max-w-[140px]" />
        <GemIcon size={14} color={gemColor ?? 'var(--gold)'} />
        <span className="gold-rule flex-1 max-w-[140px]" />
      </div>
    )
  }
  return <div className={`gold-rule ${className ?? ''}`} aria-hidden />
}

export default GoldRule
