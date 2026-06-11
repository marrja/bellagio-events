import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/store/languageStore'
import { GemIcon } from '@/components/ui/GemIcon'

interface DatePickerProps {
  value: string // ISO yyyy-mm-dd
  onChange: (iso: string) => void
  /** Returns true if a date should be greyed out / unselectable. */
  isBlocked: (iso: string) => boolean
  accentColor?: string
}

const toIso = (d: Date) => d.toISOString().slice(0, 10)

/** Month-grid date picker. Blocked dates (from CMS availability) are greyed. */
export function DatePicker({
  value,
  onChange,
  isBlocked,
  accentColor = '#1E82FF',
}: DatePickerProps) {
  const { t } = useTranslation()
  const lang = useLanguageStore((s) => s.lang)
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const [view, setView] = useState(() => {
    const base = value ? new Date(value) : new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })

  const locale = lang === 'ar' ? 'ar-TN' : lang === 'en' ? 'en-GB' : 'fr-FR'

  const monthLabel = view.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })

  // Build the day grid (Monday-first).
  const days = useMemo(() => {
    const year = view.getFullYear()
    const month = view.getMonth()
    const first = new Date(year, month, 1)
    const startDow = (first.getDay() + 6) % 7 // Mon = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (Date | null)[] = []
    for (let i = 0; i < startDow; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
    return cells
  }, [view])

  const weekdays =
    lang === 'ar'
      ? ['إث', 'ثل', 'أر', 'خم', 'جم', 'سب', 'أح']
      : lang === 'en'
        ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
        : ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

  const shiftMonth = (delta: number) =>
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1))

  return (
    <div
      className="rounded-md border border-white/10 bg-surface/60 p-4"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-sm text-silver transition-colors hover:text-white"
          aria-label="−"
        >
          ‹
        </button>
        <span className="font-display text-lg capitalize text-white">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="flex h-8 w-8 items-center justify-center rounded-sm text-silver transition-colors hover:text-white"
          aria-label="+"
        >
          ›
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {weekdays.map((w) => (
          <span key={w} className="label text-[0.55rem] text-smoke">
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (!d) return <span key={`e${i}`} />
          const iso = toIso(d)
          const past = d < today
          const blocked = isBlocked(iso)
          const disabled = past || blocked
          const selected = value === iso
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-pressed={selected}
              title={blocked ? t('contact.blockedDate') : undefined}
              className={`relative flex h-9 items-center justify-center rounded-sm text-sm transition-colors duration-150 ${
                selected
                  ? 'text-white'
                  : disabled
                    ? 'cursor-not-allowed text-smoke/30 line-through'
                    : 'text-silver hover:text-white'
              }`}
              style={
                selected
                  ? { backgroundColor: accentColor }
                  : undefined
              }
            >
              {d.getDate()}
              {blocked && !past && (
                <span
                  className="absolute bottom-1 h-1 w-1 rounded-full bg-smoke/50"
                  aria-hidden
                />
              )}
            </button>
          )
        })}
      </div>

      {value && (
        <p className="mt-3 flex items-center gap-2 text-xs text-silver">
          <GemIcon size={11} color={accentColor} />
          {new Date(value).toLocaleDateString(locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      )}
    </div>
  )
}

export default DatePicker
