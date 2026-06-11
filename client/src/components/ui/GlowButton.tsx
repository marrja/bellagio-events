import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'ghost'

interface BaseProps {
  variant?: Variant
  fullWidth?: boolean
  className?: string
}

const base =
  'label text-xs sm:text-[0.8rem] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lt disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  // Electric blue glow CTA
  primary:
    'bg-electric text-white hover:bg-electric-lt hover:shadow-glow active:bg-electric-dim',
  outline:
    'border border-white/25 text-white hover:border-electric hover:text-electric-lt hover:shadow-glow',
  ghost: 'text-silver hover:text-white',
}

function classes(variant: Variant, fullWidth?: boolean, extra?: string) {
  return [base, variants[variant], fullWidth ? 'w-full' : '', extra ?? '']
    .filter(Boolean)
    .join(' ')
}

/** Electric blue glow CTA button. */
export const GlowButton = forwardRef<
  HTMLButtonElement,
  BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
>(function GlowButton(
  { variant = 'primary', fullWidth, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={classes(variant, fullWidth, className)}
      {...rest}
    >
      {children}
    </button>
  )
})

interface LinkButtonProps extends BaseProps {
  to: string
  children: React.ReactNode
  /** Render as <a> for external links. */
  external?: boolean
}

/** Same look as GlowButton, rendered as a router Link (or anchor). */
export function GlowLink({
  to,
  variant = 'primary',
  fullWidth,
  className,
  external,
  children,
}: LinkButtonProps) {
  const cls = classes(variant, fullWidth, className)
  if (external) {
    return (
      <a href={to} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}

export default GlowButton
