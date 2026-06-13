import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { telUrl, whatsappUrl, PHONE_DISPLAY } from '@/lib/contact'
import { track } from '@/lib/analytics'

const WA_MESSAGE =
  'Bonjour Bellagio Event’s, je souhaite des informations pour un événement.'

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.4-8.24 8.4Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.65 4.2 3.71.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Floating WhatsApp + call actions, fixed bottom corner on every page. */
export function FloatingContact() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 z-40 flex flex-col items-end gap-3 end-5">
      {/* Expanded actions */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ease-out ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <a
          href={telUrl()}
          onClick={() => track('Call Click')}
          className="group flex items-center gap-3 rounded-full bg-cream py-2 ps-4 pe-2 shadow-lift ring-1 ring-gold/20"
          aria-label={`${t('contact.contactMethods.phone')} ${PHONE_DISPLAY}`}
        >
          <span className="label text-[0.62rem] text-ink">{PHONE_DISPLAY}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink">
            <PhoneIcon />
          </span>
        </a>
        <a
          href={whatsappUrl(WA_MESSAGE)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('WhatsApp Click')}
          className="group flex items-center gap-3 rounded-full bg-cream py-2 ps-4 pe-2 shadow-lift ring-1 ring-gold/20"
          aria-label="WhatsApp"
        >
          <span className="label text-[0.62rem] text-ink">WhatsApp</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon size={20} />
          </span>
        </a>
      </div>

      {/* Toggle FAB */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t('cta.contactUs')}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>
          {open ? <span className="text-2xl leading-none">×</span> : <WhatsAppIcon size={26} />}
        </span>
      </button>
    </div>
  )
}

export default FloatingContact
