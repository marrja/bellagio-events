// ============================================================
// JSON-LD structured data builders, injected via <Helmet>.
// ============================================================

import type { Venue, FaqItem, Lang } from '@/data/types'

const SITE_URL = 'https://bellagioevent.com'
const ORG_NAME = "Bellagio Event's"
const PHONE = '+216 70 000 000'
const EMAIL = 'events@bellagioevent.com'

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: ORG_NAME,
    description:
      "Trois espaces d'exception pour vos mariages, galas, et événements privés en Tunisie.",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TN',
      addressLocality: 'Tunis',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/bellagioevents',
      'https://www.facebook.com/bellagioevents',
    ],
  }
}

export function eventVenueJsonLd(venue: Venue, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: `${venue.name[lang]} — ${ORG_NAME}`,
    description: venue.tagline[lang],
    url: `${SITE_URL}/espaces/${venue.slug}`,
    maximumAttendeeCapacity: venue.capacity,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TN',
      addressLocality: 'Tunis',
    },
    image: venue.heroImage,
  }
}

export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function faqJsonLd(faq: FaqItem[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang],
      },
    })),
  }
}
