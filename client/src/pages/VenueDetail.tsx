import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useL } from '@/hooks/useL'
import { useVenue } from '@/hooks/useVenue'
import type { VenueSlug } from '@/data/types'
import { Seo } from '@/components/Seo'
import { eventVenueJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { VenueHero } from '@/components/venue/VenueHero'
import { VenueAtmosphere } from '@/components/venue/VenueAtmosphere'
import { VenueFeatures } from '@/components/venue/VenueFeatures'
import { VenueEvents } from '@/components/venue/VenueEvents'
import { VenuePackages } from '@/components/venue/VenuePackages'
import { VenueEnquiryForm } from '@/components/venue/VenueEnquiryForm'
import { OtherVenues } from '@/components/venue/OtherVenues'
import NotFound from './NotFound'

export default function VenueDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { venue, loading } = useVenue(slug as VenueSlug)
  const { L, lang } = useL()

  // Scroll to top on slug change.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>
  }
  if (!venue) return <NotFound />

  return (
    <div style={{ '--accent': venue.accentColor } as React.CSSProperties}>
      <Seo
        title={`${L(venue.name)} — Bellagio Event's`}
        description={`${venue.capacity} invités · ${venue.area} · ${L(venue.features[0])}`}
        ogImage={venue.heroImage}
        preloadImage={venue.heroImage}
        jsonLd={[
          eventVenueJsonLd(venue, lang),
          breadcrumbJsonLd([
            { name: 'Accueil', path: '/' },
            { name: 'Nos espaces', path: '/nos-espaces' },
            { name: L(venue.name), path: `/espaces/${venue.slug}` },
          ]),
        ]}
      />

      <VenueHero venue={venue} />
      <VenueAtmosphere venue={venue} />
      <VenueFeatures venue={venue} />
      <VenueEvents venue={venue} />
      <VenuePackages venue={venue} />
      <VenueEnquiryForm venue={venue} />
      <OtherVenues current={venue} />
    </div>
  )
}
