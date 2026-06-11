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
    ? new Date(s.eventDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
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
    [
      t('contact.fields.preferredContact'),
      t(`contact.contactMethods.${s.preferredContact}`),
    ],
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-white/10 bg-surface/50 p-6">
        <dl className="divide-y divide-white/8">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="flex items-start justify-between gap-6 py-3 first:pt-0 last:pb-0"
            >
              <dt className="label text-[0.6rem] text-smoke">{k}</dt>
              <dd className="max-w-[60%] text-right text-sm text-white">{v}</dd>
            </div>
          ))}
        </dl>
        {s.notes && (
          <p className="mt-4 border-t border-white/8 pt-4 text-sm italic text-silver">
            “{s.notes}”
          </p>
        )}
      </div>

      {/* GDPR consent */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={s.consent}
          onChange={(e) => s.set({ consent: e.target.checked })}
          className="mt-1 h-4 w-4 shrink-0 accent-electric"
        />
        <span className="flex items-start gap-2 text-sm text-silver">
          <GemIcon size={12} color="var(--gold)" className="mt-0.5 shrink-0" />
          {t('contact.fields.consent')}
        </span>
      </label>
      <FieldError
        message={errors.consent && t(`contact.errors.${errors.consent}`)}
      />
    </div>
  )
}

export default StepReview
