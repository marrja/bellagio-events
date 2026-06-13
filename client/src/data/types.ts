// ============================================================
// Domain types — shared across the client.
// These mirror the eventual Payload CMS collection shapes so the
// API layer can swap embedded seed data for live CMS data later.
// ============================================================

export type Lang = 'fr' | 'en' | 'ar'

/** A string localised in the three supported languages. */
export type Localized = Record<Lang, string>

export type VenueSlug = 'la-salle' | 'le-jardin'

export type TierId = 'ESPACE' | 'LUMIERE' | 'SAVEUR' | 'PRESTIGE'

export interface VenueEventType {
  name: Localized
  description: Localized
}

export interface Venue {
  slug: VenueSlug
  name: Localized
  subtitle: Localized
  tagline: Localized
  capacity: number
  area: string
  ceiling: Localized
  /** Four short paragraphs describing the space. */
  description: Localized[]
  heroImage: string
  galleryImages: string[]
  features: Localized[]
  events: VenueEventType[]
  accentColor: string
  /** "à partir de X TND" base for the ESPACE tier, in TND. */
  fromPrice: number
  isActive: boolean
}

export interface Tier {
  id: TierId
  name: string
  motto: Localized
  inclusions: Localized[]
  footnote: Localized
}

export interface PackagePrice {
  venueSlug: VenueSlug
  tier: TierId
  basePrice: number
  currency: 'TND' | 'EUR'
  priceType: 'per_day' | 'per_person' | 'flat'
}

export interface Testimonial {
  id: string
  clientName: string
  eventType: Localized
  venueSlug: VenueSlug
  quote: Localized
  rating: number
  date: string
}

export type GalleryEventType =
  | 'wedding'
  | 'corporate'
  | 'gala'
  | 'garden'
  | 'cocktail'
  | 'other'

export interface GalleryItem {
  id: string
  src: string
  mediaType: 'photo' | 'video'
  venueSlug: VenueSlug
  eventTypes: GalleryEventType[]
  caption: Localized
  isFeatured: boolean
  /** Aspect ratio hint for the masonry grid. */
  ratio: 'portrait' | 'square' | 'landscape'
}

export interface FaqItem {
  category: Localized
  question: Localized
  answer: Localized
}

/** A blocked date returned by the availability endpoint. */
export interface BlockedDate {
  venueSlug: VenueSlug
  date: string // ISO yyyy-mm-dd
  blockType: 'booked' | 'maintenance' | 'private'
  label?: string
}
