// ============================================================
// Cloudinary URL builder.
// In production, seed images become Cloudinary public IDs and this
// utility constructs delivery URLs with transformation parameters.
// During the demo, seed images are already absolute URLs (Unsplash),
// so we pass those through while still applying width/quality hints.
// Image dimensions are never hardcoded in components — always derived here.
// ============================================================

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD ?? 'bellagio'

export interface ImageOptions {
  width?: number
  height?: number
  quality?: number | 'auto'
  format?: 'auto' | 'webp' | 'jpg'
  crop?: 'fill' | 'fit' | 'scale' | 'thumb'
  /** Device pixel ratio multiplier for retina screens. */
  dpr?: number
}

const isAbsolute = (src: string) => /^https?:\/\//.test(src)
const isLocalAsset = (src: string) => src.startsWith('/')

/**
 * Build a delivery URL for an image reference.
 * @param src Cloudinary public ID, or an absolute URL (passed through).
 */
export function buildImageUrl(src: string, opts: ImageOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    dpr,
  } = opts

  // Local public assets (e.g. /venue/hall.jpg) are served statically by
  // Vite/Nginx — return untouched, no transformation params.
  if (isLocalAsset(src)) return src

  // Pass-through for absolute URLs (demo seed). Apply sizing where the host
  // supports query params (Unsplash & most CDNs honour w/q/fm).
  if (isAbsolute(src)) {
    const url = new URL(src)
    if (width) url.searchParams.set('w', String(width))
    if (height) url.searchParams.set('h', String(height))
    if (quality !== 'auto') url.searchParams.set('q', String(quality))
    else url.searchParams.set('q', '75')
    if (format === 'webp') url.searchParams.set('fm', 'webp')
    return url.toString()
  }

  // Cloudinary transformation segment.
  const t: string[] = [`f_${format}`, `q_${quality}`, `c_${crop}`]
  if (width) t.push(`w_${width}`)
  if (height) t.push(`h_${height}`)
  if (dpr) t.push(`dpr_${dpr}`)

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t.join(',')}/${src}`
}

/** Build a responsive srcset string for the given widths. */
export function buildSrcSet(src: string, widths: number[], opts: ImageOptions = {}): string {
  return widths
    .map((w) => `${buildImageUrl(src, { ...opts, width: w })} ${w}w`)
    .join(', ')
}

/** A tiny blurred placeholder URL for blur-up loading. */
export function buildBlurUrl(src: string): string {
  return buildImageUrl(src, { width: 24, quality: 30 })
}
