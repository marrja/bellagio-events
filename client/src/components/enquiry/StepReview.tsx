import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import { useEnquiryStore } from '@/store/enquiryStore'
import { GemIcon } from '@/components/ui/GemIcon'
import { FieldError } from '@/components/ui/FormField'

export function StepReview({ errors }: { errors: Record<string, string> }) {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const s = useEnquiryStore()

  const venueNames = venues
    .filter((v) => s.venues.includes(v.slug))
    .map((v) => L(v.name))
    .join(' · ')

  const tierLabel = s.tier === 'unsure' ? t('contact.tierUnsure') : s.tier
  const dateLabel = s.eventDate
    ? (() => {
        const [y, m, d] = s.eventDate.split('-').map(Number)
        return new Date(y, m - 1, d).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      })()
    : '—'

  const rows: [string, string][] = [
    [t('contact.fields.venues'), venueNames || '—'],
    [t('contact.fields.eventType'), t(`contact.eventTypes.${s.eventType}`)],
    [t('contact.fields.tier'), tierLabel],
    [t('contact.fields.date'), dateLabel],
    [t('contact.fields.guests'), String(s.guestCount)],
    [t('contact.fields.name'), s.name || '—'],
    [t('contact.fields.email'), s.email || '—'],
    [t('contact.fields.phone'), s.phone ? `+216 ${s.phone}` : '—'],
    [t('contact.fields.preferredContact'), t(`contact.contactMethods.${s.preferredContact}`)],
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gold/20 bg-pearl p-6 shadow-soft">
        <dl className="divide-y divide-gold/12">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-6 py-3 first:pt-0 last:pb-0">
              <dt className="label text-[0.64rem] text-faint">{k}</dt>
              <dd className="max-w-[60%] text-right text-sm text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        {s.notes && (
          <p className="mt-4 border-t border-gold/12 pt-4 text-sm italic text-muted">“{s.notes}”</p>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={s.consent}
          onChange={(e) => s.set({ consent: e.target.checked })}
          className="mt-1 h-4 w-4 shrink-0 accent-gold"
        />
        <span className="flex items-start gap-2 text-sm text-muted">
          <GemIcon size={12} color="var(--gold)" className="mt-0.5 shrink-0" />
          {t('contact.fields.consent')}
        </span>
      </label>
      <FieldError message={errors.consent && t(`contact.errors.${errors.consent}`)} />
    </div>
  )
}

export default StepReview
