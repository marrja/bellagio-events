import { motion, useReducedMotion } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  /** Seconds before the stagger starts. */
  delay?: number
  /** Render element. */
  as?: 'h1' | 'h2' | 'p' | 'span'
}

/**
 * Headline reveal: words rise + fade in sequence behind a clipping mask,
 * for an editorial, couture entrance. Falls back to a plain render when
 * the user prefers reduced motion.
 */
export function RevealText({ text, className, delay = 0, as = 'h1' }: RevealTextProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  const words = text.split(' ')

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '105%', opacity: 0 },
              show: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {/* \u00A0: a plain trailing space inside an inline-block is
                collapsed by the browser, so use a no-break space. */}
            {i < words.length - 1 ? word + '\u00A0' : word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

export default RevealText
