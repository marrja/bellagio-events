import { z } from 'zod'

// Zod validation for the enquiry wizard. Validated per-step and again
// in full before submission.
export const enquirySchema = z.object({
  venues: z.array(z.string()).min(1, 'venuesRequired'),
  eventType: z.string().min(1),
  tier: z.string().min(1),
  eventDate: z.string().optional(),
  guestCount: z.number().min(10).max(600),
  notes: z.string().optional(),
  name: z.string().trim().min(2, 'nameRequired'),
  email: z.string().trim().min(1, 'emailRequired').email('emailInvalid'),
  phone: z.string().optional(),
  source: z.string().min(1),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'consentRequired' }),
  }),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

// Per-step field groups for partial validation.
export const stepFields: Record<number, (keyof EnquiryInput)[]> = {
  0: ['venues', 'eventType', 'tier', 'guestCount'],
  1: ['name', 'email', 'source', 'preferredContact'],
  2: ['consent'],
}
