import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Venue } from '@/data/types'
import { useEnquiryStore } from '@/store/enquiryStore'
import { EnquiryWizard } from '@/components/enquiry/EnquiryWizard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/** Inline enquiry form, pre-filled with this venue. */
export function VenueEnquiryForm({ venue }: { venue: Venue }) {
  const { t } = useTranslation()
  const prefillVenue = useEnquiryStore((s) => s.prefillVenue)

  useEffect(() => {
    prefillVenue(venue.slug)
  }, [venue.slug, prefillVenue])

  return (
    <section
      id="enquiry"
      className="scroll-mt-24 bg-cream py-20 sm:py-28"
      style={{ '--accent': venue.accentColor } as React.CSSProperties}
    >
      <div className="container-bellagio">
        <Reveal>
          <SectionHeading
            eyebrow={t('nav.contact')}
            title={t('venue.enquiryTitle')}
            intro={t('venue.enquiryIntro')}
            accentColor={venue.accentColor}
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12">
            <EnquiryWizard />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default VenueEnquiryForm
