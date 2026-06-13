import { useL } from '@/hooks/useL'
import { applyLang, SUPPORTED_LANGS, type AppLang } from '@/i18n'

const LABELS: Record<AppLang, string> = { fr: 'FR', en: 'EN', ar: 'ع' }

export function LanguageSwitcher({
  className,
  dark = false,
}: {
  className?: string
  dark?: boolean
}) {
  const { lang } = useL()

  return (
    <div className={`flex items-center gap-1 ${className ?? ''}`} role="group" aria-label="Language">
      {SUPPORTED_LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => applyLang(l)}
          aria-pressed={lang === l}
          className={`label rounded-full px-2.5 py-1 text-[0.6rem] transition-colors duration-200 ${
            lang === l
              ? dark
                ? 'text-gold-lt'
                : 'text-gold-dk'
              : dark
                ? 'text-pearl/50 hover:text-pearl'
                : 'text-faint hover:text-ink'
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
