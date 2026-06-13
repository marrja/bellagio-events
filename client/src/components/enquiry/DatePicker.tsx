import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { GemIcon } from '@/components/ui/GemIcon'

interface DatePickerProps {
  value: string
  onChange: (iso: string) => void
  isBlocked: (iso: string) => boolean
  accentColor?: string
}

// Build an ISO date string from LOCAL parts. Using toISOString() here would
// shift the day backwards for any timezone east of UTC (e.g. Tunisia, UTC+1).
const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// Parse an ISO date as LOCAL midnight (not UTC) for display.
const fromIso = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Month-grid date picker. Blocked dates (from CMS availability) are greyed. */
export function DatePicker({
  value,
  onChange,
  isBlocked,
  accentColor = 'var(--gold)',
}: DatePickerProps) {
  const { t } = useTranslation()
  const { lang } = useL()
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const [view, setView] = useState(() => {
    const base = value ? fromIso(value) : new Date()
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })

  const locale = lang === 'ar' ? 'ar-TN' : lang === 'en' ? 'en-GB' : 'fr-FR'
  const monthLabel = view.toLocaleDateString(locale, { month: 'long', year: 'numeric' })

  const days = useMemo(() => {
    const year = view.getFullYear()
    const month = view.getMonth()
    const first = new Date(year, month, 1)
    const startDow = (first.getDay() + 6) % 7
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
    <div className="rounded-xl border border-gold/25 bg-pearl p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-gold/10 hover:text-ink"
          aria-label={t('contact.prevMonth')}
        >
          ‹
        </button>
        <span className="font-display text-lg capitalize text-ink">{monthLabel}</span>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-gold/10 hover:text-ink"
          aria-label={t('contact.nextMonth')}
        >
          ›
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {weekdays.map((w) => (
          <span key={w} className="label text-[0.64rem] text-faint">
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
              className={`relative flex h-9 items-center justify-center rounded-full text-sm transition-colors duration-150 ${
                selected
                  ? 'text-ink'
                  : disabled
                    ? 'cursor-not-allowed text-faint/40 line-through'
                    : 'text-muted hover:bg-gold/10 hover:text-ink'
              }`}
              style={selected ? { backgroundColor: accentColor, color: '#2B241A' } : undefined}
            >
              {d.getDate()}
              {blocked && !past && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-faint/60" aria-hidden />
              )}
            </button>
          )
        })}
      </div>

      {value && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted">
          <GemIcon size={11} color={accentColor} />
          {fromIso(value).toLocaleDateString(locale, {
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
