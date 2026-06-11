import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import fr from './locales/fr.json'
import en from './locales/en.json'
import ar from './locales/ar.json'

export const SUPPORTED_LANGS = ['fr', 'en', 'ar'] as const
export type AppLang = (typeof SUPPORTED_LANGS)[number]

export const RTL_LANGS: AppLang[] = ['ar']

const STORAGE_KEY = 'bellagio.lang'

function detectInitialLang(): AppLang {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LANGS.includes(stored as AppLang)) {
    return stored as AppLang
  }
  return 'fr' // French is the default per spec
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: detectInitialLang(),
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
  returnNull: false,
})

/** Apply <html lang> and dir, and persist the choice. */
export function applyLang(lang: AppLang) {
  i18n.changeLanguage(lang)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lang)
  }
}

// Apply initial direction on load
applyLang(detectInitialLang())

export default i18n
