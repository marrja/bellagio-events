// ============================================================
// Site content + the enquiry form (the only dynamic feature).
// The site is fully STATIC — there is no backend. Content is served straight
// from src/data/*. The async signatures are kept so callers stay unchanged.
// ============================================================

import type {
  Venue,
  VenueSlug,
  Testimonial,
  GalleryItem,
  FaqItem,
} from '@/data/types'
import { VENUES, getVenueBySlug } from '@/data/venues'
import { TESTIMONIALS } from '@/data/testimonials'
import { GALLERY } from '@/data/gallery'
import { FAQ } from '@/data/faq'
import { buildEnquiryWhatsApp, whatsappUrl } from '@/lib/contact'

// ---- Static content ----------------------------------------
export const getVenues = async (): Promise<Venue[]> =>
  VENUES.filter((v) => v.isActive)

export const getVenue = async (slug: VenueSlug): Promise<Venue | undefined> =>
  getVenueBySlug(slug)

export const getGallery = async (): Promise<GalleryItem[]> => GALLERY

export const getFeaturedGallery = async (): Promise<GalleryItem[]> =>
  GALLERY.filter((g) => g.isFeatured)

export const getTestimonials = async (): Promise<Testimonial[]> => TESTIMONIALS

export const getFaq = async (): Promise<FaqItem[]> => FAQ

// ---- Enquiry form (the one dynamic feature) ----------------
export interface EnquiryPayload {
  venues: VenueSlug[]
  tier: string
  eventType: string
  eventDate: string
  guestCount: number
  notes?: string
  name: string
  email: string
  phone?: string
  source: string
  preferredContact: string
  consent: boolean
}

export type EnquiryResult = { delivered: 'whatsapp'; whatsappUrl: string }

// Public Web3Forms access key — safe to expose client-side (that's by design).
const WEB3FORMS_KEY = 'eda32d9a-6428-4ce3-bd1d-51d33411e28b'

// Two channels: the enquiry is emailed to the venue via Web3Forms (so no lead
// is lost) and the visitor is handed off to WhatsApp — this market's primary
// channel. The email is best-effort: a failure never blocks the WhatsApp step.
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Nouvelle demande — ${payload.name || 'Site Bellagio'}`,
        from_name: "Bellagio Event's — Site",
        replyto: payload.email,
        Nom: payload.name,
        Email: payload.email,
        Téléphone: payload.phone || '—',
        'Espace(s)': payload.venues.join(', '),
        "Type d'événement": payload.eventType,
        Formule: payload.tier,
        'Date souhaitée': payload.eventDate || 'à définir',
        Invités: payload.guestCount,
        'Contact préféré': payload.preferredContact,
        Source: payload.source,
        Précisions: payload.notes || '—',
      }),
    })
  } catch {
    // Network / Web3Forms hiccup — fall through to the WhatsApp hand-off.
  }
  return {
    delivered: 'whatsapp',
    whatsappUrl: whatsappUrl(buildEnquiryWhatsApp(payload)),
  }
}
