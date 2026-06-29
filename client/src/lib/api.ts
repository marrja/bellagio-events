// ============================================================
// Site content + the two dynamic touch-points (availability, enquiry).
// The site is fully STATIC — there is no backend. Content is served straight
// from src/data/*. The async signatures are kept so callers stay unchanged and
// a real source can be slotted into one place if ever needed.
// ============================================================

import type {
  Venue,
  VenueSlug,
  BlockedDate,
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

// ---- Availability — dynamic #1 -----------------------------
// The only dynamic *read*: which dates are already booked, so the date picker
// can grey them out. No source is wired yet → nothing is blocked. Plug a free
// calendar source (a published Google Calendar / Sheet) into this one function.
export const getAvailability = async (
  _slug: VenueSlug,
): Promise<BlockedDate[]> => []

// ---- Enquiry — dynamic #2 ----------------------------------
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

// Enquiries are delivered through WhatsApp — this market's primary channel.
// To ALSO capture leads by email, POST `payload` to a free form backend
// (Formspree / Web3Forms / Netlify Forms) from this one function.
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  return {
    delivered: 'whatsapp',
    whatsappUrl: whatsappUrl(buildEnquiryWhatsApp(payload)),
  }
}
