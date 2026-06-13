import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { buildImageUrl, buildSrcSet } from '@/lib/cloudinary'

interface ParallaxImageProps {
  src: string
  alt: string
  /** Parallax strength (px of travel across the viewport). */
  strength?: number
  /** Eager + high priority — use for above-the-fold heroes. */
  priority?: boolean
  className?: string
}

/**
 * Full-bleed background image with GPU parallax driven by Framer Motion's
 * scroll motion values (no per-frame React re-renders). Honours
 * prefers-reduced-motion by disabling the transform.
 */
export function ParallaxImage({
  src,
  alt,
  strength = 120,
  priority = false,
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : strength])

  return (
    <div ref={ref} className={`absolute inset-0 -z-10 overflow-hidden ${className ?? ''}`} aria-hidden={!alt}>
      <motion.img
        src={buildImageUrl(src, { width: 1920 })}
        srcSet={buildSrcSet(src, [768, 1080, 1600, 1920])}
        sizes="100vw"
        alt={alt}
        style={{ y }}
        loading={priority ? 'eager' : 'lazy'}
        // @ts-expect-error fetchpriority is valid HTML, missing from React types
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
        className="h-[120%] w-full object-cover"
      />
    </div>
  )
}

export default ParallaxImage
