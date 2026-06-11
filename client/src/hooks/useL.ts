import { useLanguageStore } from '@/store/languageStore'
import type { Localized } from '@/data/types'

/**
 * Returns the active language plus `L()`, a helper that picks the
 * correct string from a Localized object (with French fallback).
 */
export function useL() {
  const lang = useLanguageStore((s) => s.lang)
  const L = (value: Localized | undefined): string =>
    value ? value[lang] ?? value.fr : ''
  return { lang, L }
}
