import { create } from 'zustand'
import i18n, { applyLang, type AppLang } from '@/i18n'

interface LanguageState {
  lang: AppLang
  isRtl: boolean
  setLang: (lang: AppLang) => void
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: (i18n.language as AppLang) ?? 'fr',
  isRtl: i18n.language === 'ar',
  setLang: (lang) => {
    applyLang(lang)
    set({ lang, isRtl: lang === 'ar' })
  },
}))
