import { useScrollReveal } from '@/hooks/useScrollReveal'

type Variant = 'rise' | 'mask' | 'fade'

interface RevealProps {
  children: React.ReactNode
  /** Stagger delay in ms. */
  delay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  /** 'rise' = slide up · 'mask' = clip-path wipe (for images) · 'fade'. */
  variant?: Variant
}

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

/**
 * Scroll-reveal wrapper. 'rise' slides + fades content in; 'mask' performs
 * an elegant clip-path wipe (ideal for imagery). Honours reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  variant = 'rise',
}: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const Tag = as as 'div'

  const base: React.CSSProperties = { willChange: 'opacity, transform, clip-path' }
  let style: React.CSSProperties

  if (variant === 'mask') {
    style = {
      ...base,
      clipPath: visible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
      transform: visible ? 'scale(1)' : 'scale(1.06)',
      transition: `clip-path 1100ms ${EASE} ${delay}ms, transform 1400ms ${EASE} ${delay}ms`,
    }
  } else if (variant === 'fade') {
    style = {
      ...base,
      opacity: visible ? 1 : 0,
      transition: `opacity 900ms ${EASE} ${delay}ms`,
    }
  } else {
    style = {
      ...base,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(56px)',
      transition: `opacity 800ms ${EASE} ${delay}ms, transform 800ms ${EASE} ${delay}ms`,
    }
  }

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} style={style}>
      {children}
    </Tag>
  )
}

export default Reveal
