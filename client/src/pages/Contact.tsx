import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEnquiryStore } from '@/store/enquiryStore'
import { VENUES } from '@/data/venues'
import { TIERS } from '@/data/tiers'
import type { VenueSlug } from '@/data/types'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { EnquiryWizard } from '@/components/enquiry/EnquiryWizard'

export default function Contact() {
  const { t } = useTranslation()
  const [params] = useSearchParams()
  const store = useEnquiryStore()

  // Pre-fill from ?venue= & ?tier= (e.g. coming from a tier card).
  useEffect(() => {
    const venue = params.get('venue')
    const tier = params.get('tier')
    if (venue && VENUES.some((v) => v.slug === venue)) {
      store.prefillVenue(venue as VenueSlug)
    }
    if (tier && TIERS.some((ti) => ti.id === tier)) {
      store.set({ tier })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Seo
        title="Contactez-nous — Bellagio Event's"
        description="Réservez une visite ou faites une demande de devis."
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <InnerHero
        eyebrow={t('brand.name')}
        title={t('contact.title')}
        intro={t('contact.intro')}
      />

      <section className="container-bellagio py-12 pb-24">
        <EnquiryWizard />
      </section>
    </>
  )
}
