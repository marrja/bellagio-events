import { useTranslation } from 'react-i18next'
import type { AppLang } from '@/i18n'
import type { Localized } from '@/data/types'

/**
 * Returns the active language plus `L()`, a helper that picks the
 * correct string from a Localized object (with French fallback).
 * Reads straight from i18next — the single source of truth for language —
 * and re-renders on its `languageChanged` event via useTranslation.
 */
export function useL() {
  const { i18n } = useTranslation()
  const lang = (i18n.language as AppLang) ?? 'fr'
  const L = (value: Localized | undefined): string =>
    value ? value[lang] ?? value.fr : ''
  return { lang, L }
}
