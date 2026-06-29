// Direct-contact helpers. The clientele is phone/WhatsApp-first, so these
// power the floating contact button and the enquiry form's delivery channel.

export const PHONE_DISPLAY = '+216 52 359 900'
export const PHONE_E164 = '+21652359900'
export const WHATSAPP_NUMBER = '21652359900' // wa.me expects digits only
export const EMAIL = 'bellagioclub.events@gmail.com'

export const telUrl = () => `tel:${PHONE_E164}`

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

interface EnquiryLike {
  venues: string[]
  eventType: string
  tier: string
  eventDate?: string
  guestCount: number
  name: string
  notes?: string
}

const VENUE_LABEL: Record<string, string> = {
  'la-salle': 'La Salle Bellagio',
  'le-jardin': 'Le Jardin Bellagio',
}

/** A pre-filled French WhatsApp message summarising an enquiry. */
export function buildEnquiryWhatsApp(e: EnquiryLike): string {
  const venues = e.venues.map((v) => VENUE_LABEL[v] ?? v).join(', ') || '—'
  const tier = e.tier === 'unsure' ? 'À déterminer' : e.tier
  const lines = [
    'Bonjour Bellagio Event’s,',
    '',
    'Je souhaite une demande de devis / visite :',
    `• Nom : ${e.name || '—'}`,
    `• Espace(s) : ${venues}`,
    `• Type d’événement : ${e.eventType}`,
    `• Formule : ${tier}`,
    `• Date souhaitée : ${e.eventDate || 'à définir'}`,
    `• Invités : ${e.guestCount}`,
  ]
  if (e.notes) lines.push(`• Précisions : ${e.notes}`)
  lines.push('', 'Merci !')
  return lines.join('\n')
}
