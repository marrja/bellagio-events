// ============================================================
// Image URL builder.
// - Local /venue/* assets resolve to pre-generated responsive WebP
//   variants (see scripts/optimize-images.mjs) with a base64 LQIP.
// - Absolute URLs (Unsplash demo seed) get width/quality query hints.
// - Bare strings are treated as Cloudinary public IDs for production.
// Image dimensions are never hardcoded in components — always derived here.
// ============================================================

import { LQIP, VENUE_WIDTHS } from '@/data/lqip'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD ?? 'bellagio'

export interface ImageOptions {
  width?: number
  height?: number
  quality?: number | 'auto'
  format?: 'auto' | 'webp' | 'jpg'
  crop?: 'fill' | 'fit' | 'scale' | 'thumb'
  dpr?: number
}

const isAbsolute = (src: string) => /^https?:\/\//.test(src)
const isLocalVenue = (src: string) => /^\/venue\/.+\.(jpe?g|png)$/i.test(src)

/** Pick the smallest generated width >= requested (else the largest). */
function nearestWidth(width?: number): number {
  if (!width) return 1080
  return VENUE_WIDTHS.find((w) => w >= width) ?? VENUE_WIDTHS[VENUE_WIDTHS.length - 1]
}

/** Map a local /venue/name.jpg reference to its WebP variant. */
function venueWebp(src: string, width?: number): string {
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  return `${base}-${nearestWidth(width)}.webp`
}

export function buildImageUrl(src: string, opts: ImageOptions = {}): string {
  const { width, height, quality = 'auto', format = 'auto', crop = 'fill', dpr } = opts

  // Local venue photography → pre-generated responsive WebP.
  if (isLocalVenue(src)) return venueWebp(src, width)
  // Any other local asset → as-is.
  if (src.startsWith('/')) return src

  // Absolute URLs (Unsplash demo seed).
  if (isAbsolute(src)) {
    const url = new URL(src)
    if (width) url.searchParams.set('w', String(width))
    if (height) url.searchParams.set('h', String(height))
    url.searchParams.set('q', quality === 'auto' ? '72' : String(quality))
    url.searchParams.set('fm', 'webp')
    return url.toString()
  }

  // Cloudinary public ID.
  const t: string[] = [`f_${format}`, `q_${quality}`, `c_${crop}`]
  if (width) t.push(`w_${width}`)
  if (height) t.push(`h_${height}`)
  if (dpr) t.push(`dpr_${dpr}`)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t.join(',')}/${src}`
}

/** Build a responsive srcset string. */
export function buildSrcSet(src: string, widths: number[], opts: ImageOptions = {}): string {
  const list = isLocalVenue(src) ? VENUE_WIDTHS.slice() : widths
  return list.map((w) => `${buildImageUrl(src, { ...opts, width: w })} ${w}w`).join(', ')
}

/** Base64 LQIP for local venue assets, else undefined. */
export function getLqip(src: string): string | undefined {
  return LQIP[src]
}
