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

export type EnquiryResult = { ok: boolean; whatsappUrl: string }

// Public Web3Forms access key — safe to expose client-side (that's by design).
const WEB3FORMS_KEY = 'eda32d9a-6428-4ce3-bd1d-51d33411e28b'

// Submit the enquiry to Web3Forms (which emails it to the venue). `ok` reflects
// whether Web3Forms accepted it, so the UI can show a clear confirmation or an
// error. `whatsappUrl` is always returned so WhatsApp can be offered as an
// optional channel either way.
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  const wa = whatsappUrl(buildEnquiryWhatsApp(payload))
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
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
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null
    return { ok: res.ok && data?.success === true, whatsappUrl: wa }
  } catch {
    return { ok: false, whatsappUrl: wa }
  }
}
