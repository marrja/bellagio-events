import { create } from 'zustand'
import type { VenueSlug } from '@/data/types'

export type ContactMethod = 'email' | 'phone' | 'whatsapp'

export interface EnquiryState {
  // Step 1 — event details
  venues: VenueSlug[]
  eventType: string
  tier: string
  eventDate: string
  guestCount: number
  notes: string

  // Step 2 — contact
  name: string
  email: string
  phone: string
  source: string
  preferredContact: ContactMethod

  // Step 3 — consent
  consent: boolean

  // wizard
  step: number
}

interface EnquiryActions {
  set: (patch: Partial<EnquiryState>) => void
  toggleVenue: (slug: VenueSlug) => void
  setStep: (step: number) => void
  next: () => void
  prev: () => void
  reset: () => void
  /** Pre-fill the venue (used on venue detail pages). */
  prefillVenue: (slug: VenueSlug) => void
}

const initial: EnquiryState = {
  venues: [],
  eventType: 'mariage',
  tier: 'unsure',
  eventDate: '',
  guestCount: 120,
  notes: '',
  name: '',
  email: '',
  phone: '',
  source: 'instagram',
  preferredContact: 'email',
  consent: false,
  step: 0,
}

export const useEnquiryStore = create<EnquiryState & EnquiryActions>(
  (set, get) => ({
    ...initial,
    set: (patch) => set(patch),
    toggleVenue: (slug) =>
      set((s) => ({
        venues: s.venues.includes(slug)
          ? s.venues.filter((v) => v !== slug)
          : [...s.venues, slug],
      })),
    setStep: (step) => set({ step }),
    next: () => set((s) => ({ step: Math.min(s.step + 1, 2) })),
    prev: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
    reset: () => set({ ...initial }),
    prefillVenue: (slug) => {
      if (!get().venues.includes(slug)) {
        set((s) => ({ venues: [...s.venues, slug] }))
      }
    },
  }),
)
