import { useEffect, useRef, useState } from 'react'
import { buildImageUrl, buildSrcSet, getLqip, type ImageOptions } from '@/lib/cloudinary'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  widths?: number[]
  sizes?: string
  className?: string
  /** Eager-load above-the-fold images (e.g. hero) + fetchpriority high. */
  eager?: boolean
  imgClassName?: string
  options?: ImageOptions
}

/**
 * <img> wrapper with Intersection Observer lazy-load + LQIP blur-up.
 * Reserves space via width/height to keep CLS at zero. Local venue
 * images get a base64 placeholder for an instant, smooth reveal.
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
  const lqip = getLqip(src)

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
      { rootMargin: '300px' },
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
      style={{
        aspectRatio: `${width} / ${height}`,
        ...(lqip && !loaded
          ? {
              backgroundImage: `url(${lqip})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : null),
      }}
    >
      {inView && (
        <img
          src={finalSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          // The wrapper's IntersectionObserver already defers render until near
          // the viewport; native loading="lazy" is a redundant second gate that
          // stalls under Lenis smooth-scroll (the img never starts loading). So
          // once we render, load immediately. ponytail: IO is the lazy gate.
          loading="eager"
          // @ts-expect-error fetchpriority is valid HTML but not yet in React types
          fetchpriority={eager ? 'high' : undefined}
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
