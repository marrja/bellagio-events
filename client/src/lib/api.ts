// ============================================================
// Typed API layer — the SINGLE place the client talks to the backend.
// Components must never call fetch() directly (see constraint #12).
//
// Each endpoint attempts the live API first, then falls back to
// embedded seed data so the SPA is fully demonstrable standalone
// while the CMS / Express API is still being decided.
// ============================================================

import type {
  Venue,
  VenueSlug,
  BlockedDate,
  Testimonial,
  GalleryItem,
  FaqItem,
  Tier,
} from '@/data/types'
import { VENUES, getVenueBySlug } from '@/data/venues'
import { TIERS, PACKAGE_PRICES } from '@/data/tiers'
import { TESTIMONIALS } from '@/data/testimonials'
import { GALLERY } from '@/data/gallery'
import { FAQ } from '@/data/faq'
import { buildEnquiryWhatsApp, whatsappUrl } from '@/lib/contact'

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

// In-flight + resolved promise cache, keyed by path. Several components
// (header, cards, wizard…) read the same resources; without this, every
// mount would issue its own request once the live API exists.
const cache = new Map<string, Promise<unknown>>()
const CACHE_TTL = 5 * 60_000

/** Attempt a live request (deduped + cached); fall back to seed data. */
function withFallback<T>(path: string, fallback: () => T): Promise<T> {
  const hit = cache.get(path)
  if (hit) return hit as Promise<T>

  const promise = (async () => {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) throw new ApiError(`Request failed: ${path}`, res.status)
      return (await res.json()) as T
    } catch {
      // CMS not wired up yet — serve embedded seed data.
      return fallback()
    }
  })()

  cache.set(path, promise)
  // Expire so fresh CMS edits show up without a hard reload.
  setTimeout(() => cache.delete(path), CACHE_TTL)
  return promise
}

// ---- Venues -------------------------------------------------
export const getVenues = (): Promise<Venue[]> =>
  withFallback('/venues', () => VENUES.filter((v) => v.isActive))

export const getVenue = (slug: VenueSlug): Promise<Venue | undefined> =>
  withFallback(`/venues/${slug}`, () => getVenueBySlug(slug))

// ---- Tiers / pricing ---------------------------------------
export const getTiers = (): Promise<Tier[]> =>
  withFallback('/pricing/tiers', () => TIERS)

export const getPackagePrices = () =>
  withFallback('/pricing', () => PACKAGE_PRICES)

// ---- Availability ------------------------------------------
// Until the CMS is connected we return NO blocked dates rather than
// fabricating "booked" days — showing fake unavailability would turn
// real couples away. The date picker still disables past dates.
export const getAvailability = (slug: VenueSlug): Promise<BlockedDate[]> =>
  withFallback(`/availability?venue=${slug}`, () => [])

// ---- Gallery -----------------------------------------------
export const getGallery = (): Promise<GalleryItem[]> =>
  withFallback('/gallery', () => GALLERY)

export const getFeaturedGallery = (): Promise<GalleryItem[]> =>
  withFallback('/gallery?featured=true', () =>
    GALLERY.filter((g) => g.isFeatured),
  )

// ---- Testimonials ------------------------------------------
export const getTestimonials = (): Promise<Testimonial[]> =>
  withFallback('/testimonials', () => TESTIMONIALS)

// ---- FAQ ---------------------------------------------------
export const getFaq = (): Promise<FaqItem[]> =>
  withFallback('/faq', () => FAQ)

// ---- Enquiry submission ------------------------------------
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

// Result discriminates how the enquiry was actually delivered, so the UI
// never claims a server received it when no backend exists yet.
export type EnquiryResult =
  | { delivered: 'api'; reference: string }
  | { delivered: 'whatsapp'; whatsappUrl: string }

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new ApiError('Enquiry submission failed', res.status)
    const data = (await res.json()) as { reference: string }
    return { delivered: 'api', reference: data.reference }
  } catch {
    // No backend yet: deliver the enquiry through WhatsApp (this market's
    // primary channel) instead of pretending a server accepted it.
    return {
      delivered: 'whatsapp',
      whatsappUrl: whatsappUrl(buildEnquiryWhatsApp(payload)),
    }
  }
}
