import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'outlineLight' | 'ghost'

interface BaseProps {
  variant?: Variant
  fullWidth?: boolean
  className?: string
}

const base =
  'label text-[0.7rem] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  // Champagne gold CTA — works on light or dark backgrounds
  primary: 'shine bg-gold text-ink hover:bg-gold-lt hover:shadow-glow active:bg-gold-dk',
  // Outlined for light backgrounds
  outline: 'border border-gold/45 text-ink hover:border-gold hover:bg-gold/10',
  // Outlined for dark / starlit backgrounds
  outlineLight: 'border border-gold/50 text-pearl hover:border-gold-lt hover:bg-gold/15 hover:shadow-glow',
  ghost: 'text-muted hover:text-ink',
}

function classes(variant: Variant, fullWidth?: boolean, extra?: string) {
  return [base, variants[variant], fullWidth ? 'w-full' : '', extra ?? '']
    .filter(Boolean)
    .join(' ')
}

export const GlowButton = forwardRef<
  HTMLButtonElement,
  BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
>(function GlowButton(
  { variant = 'primary', fullWidth, className, children, ...rest },
  ref,
) {
  return (
    <button ref={ref} className={classes(variant, fullWidth, className)} {...rest}>
      {children}
    </button>
  )
})

interface LinkButtonProps extends BaseProps {
  to: string
  children: React.ReactNode
  external?: boolean
}

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
