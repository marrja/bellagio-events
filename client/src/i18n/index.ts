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
  // 1. Shared links carry the language as ?lang= (also used by hreflang).
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl && SUPPORTED_LANGS.includes(fromUrl as AppLang)) {
    return fromUrl as AppLang
  }
  // 2. Returning visitor preference.
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

/** Apply <html lang>/dir, persist the choice, and reflect it in the URL. */
export function applyLang(lang: AppLang) {
  i18n.changeLanguage(lang)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lang)
    // Keep ?lang= in the address bar so shared links carry the language.
    const url = new URL(window.location.href)
    if (lang === 'fr') url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    window.history.replaceState(window.history.state, '', url)
  }
}

// Apply initial direction on load
applyLang(detectInitialLang())

export default i18n
