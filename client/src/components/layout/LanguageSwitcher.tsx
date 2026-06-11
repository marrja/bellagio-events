import { useLanguageStore } from '@/store/languageStore'
import { SUPPORTED_LANGS, type AppLang } from '@/i18n'

const LABELS: Record<AppLang, string> = { fr: 'FR', en: 'EN', ar: 'ع' }

export function LanguageSwitcher({ className }: { className?: string }) {
  const lang = useLanguageStore((s) => s.lang)
  const setLang = useLanguageStore((s) => s.setLang)

  return (
    <div
      className={`flex items-center gap-1 ${className ?? ''}`}
      role="group"
      aria-label="Language"
    >
      {SUPPORTED_LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`label rounded-sm px-2 py-1 text-[0.65rem] transition-colors duration-200 ${
            lang === l
              ? 'text-electric-lt'
              : 'text-smoke hover:text-white'
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
