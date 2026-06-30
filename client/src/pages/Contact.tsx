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
import { GemIcon } from '@/components/ui/GemIcon'
import { GlowLink } from '@/components/ui/GlowButton'
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, EMAIL, telUrl } from '@/lib/contact'

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

      <section className="border-t border-gold/10">
        <div className="container-bellagio grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="label text-[0.64rem] text-gold-dk">{t('brand.name')}</p>
            <h2 className="mt-3 font-display text-3xl font-light text-ink sm:text-4xl">
              {t('contact.findUs')}
            </h2>
            <ul className="mt-8 space-y-4 text-muted">
              <li className="flex items-start gap-3">
                <GemIcon size={13} color="var(--gold)" className="mt-1.5 shrink-0" />
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                  {ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <GemIcon size={13} color="var(--gold)" className="shrink-0" />
                <a href={telUrl()} className="transition-colors hover:text-ink">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-3">
                <GemIcon size={13} color="var(--gold)" className="shrink-0" />
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-ink">{EMAIL}</a>
              </li>
              <li className="flex items-center gap-3">
                <GemIcon size={13} color="var(--gold)" className="shrink-0" />
                <span>{t('footer.hours')}</span>
              </li>
            </ul>
            <div className="mt-8">
              <GlowLink to={MAPS_URL} external variant="outline">
                {t('contact.viewOnGoogle')}
              </GlowLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lift">
            <iframe
              title="Bellagio Event's — Google Maps"
              src="https://www.google.com/maps?q=36.942757,10.087766&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[360px] w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  )
}
