import { useEffect, useRef, useState } from 'react'
import { buildImageUrl, buildSrcSet, type ImageOptions } from '@/lib/cloudinary'

interface LazyImageProps {
  /** Cloudinary public ID or absolute URL. */
  src: string
  alt: string
  /** Intrinsic width/height to reserve layout space (avoid CLS). */
  width: number
  height: number
  /** Responsive widths for the srcset. */
  widths?: number[]
  sizes?: string
  className?: string
  /** Eager-load above-the-fold images (e.g. hero). */
  eager?: boolean
  imgClassName?: string
  options?: ImageOptions
}

/**
 * <img> wrapper with Intersection Observer lazy-load + blur-up.
 * Reserves space via width/height to keep CLS at zero.
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  widths = [480, 768, 1080, 1600],
  sizes = '100vw',
  className,
  imgClassName,
  eager = false,
  options,
}: LazyImageProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(eager)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (eager || inView) return
    const node = wrapRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [eager, inView])

  const finalSrc = buildImageUrl(src, { width: widths[widths.length - 1], ...options })
  const srcSet = buildSrcSet(src, widths, options)

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-sand ${className ?? ''}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {inView && (
        <img
          src={finalSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`img-blur-up h-full w-full object-cover ${
            loaded ? 'is-loaded' : ''
          } ${imgClassName ?? ''}`}
        />
      )}
    </div>
  )
}

export default LazyImage
