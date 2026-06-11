import { useScrollReveal } from '@/hooks/useScrollReveal'

interface RevealProps {
  children: React.ReactNode
  /** Stagger delay in ms (80ms between items per the motion spec). */
  delay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

/**
 * Scroll-reveal wrapper: 60px Y offset, fades + slides in on view.
 * Honours prefers-reduced-motion (reveals immediately).
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const Tag = as as 'div'

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
