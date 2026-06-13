import { Helmet } from 'react-helmet-async'
import { buildImageUrl, buildSrcSet } from '@/lib/cloudinary'

interface SeoProps {
  title: string
  description: string
  jsonLd?: object | object[]
  noindex?: boolean
  /** Social share image (absolute URL or local/Cloudinary ref). */
  ogImage?: string
  /** LCP hero image to preload (local venue ref). */
  preloadImage?: string
  preloadSizes?: string
}

const SITE = 'https://bellagioevent.com'

/** Per-page <head> manager: title, description, JSON-LD, OpenGraph, preloads. */
export function Seo({
  title,
  description,
  jsonLd,
  noindex,
  ogImage = '/venue/hall-aisle-1600.webp',
  preloadImage,
  preloadSizes = '100vw',
}: SeoProps) {
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  const ogAbs = ogImage.startsWith('http') ? ogImage : `${SITE}${ogImage}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}

      {/* Open Graph / Twitter */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bellagio Event's" />
      <meta property="og:image" content={ogAbs} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogAbs} />

      {/* Preload the LCP hero so the browser fetches it immediately */}
      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={buildImageUrl(preloadImage, { width: 1080 })}
          // @ts-expect-error imageSrcSet/imageSizes are valid on preload links
          imagesrcset={buildSrcSet(preloadImage, [768, 1080, 1600, 1920])}
          imagesizes={preloadSizes}
        />
      )}

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
