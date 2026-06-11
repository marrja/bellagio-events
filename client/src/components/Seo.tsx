import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
  /** One or more JSON-LD objects to inject. */
  jsonLd?: object | object[]
  /** Override the document language (defaults handled globally). */
  noindex?: boolean
}

/** Per-page <head> manager: title, description, JSON-LD, OpenGraph. */
export function Seo({ title, description, jsonLd, noindex }: SeoProps) {
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bellagio Event's" />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
