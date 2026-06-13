import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { useVenues } from '@/hooks/useVenue'
import { useAvailability } from '@/hooks/useAvailability'
import { useEnquiryStore } from '@/store/enquiryStore'
import { TIERS } from '@/data/tiers'
import { GemIcon } from '@/components/ui/GemIcon'
import { FieldLabel, FieldError, Select, Textarea } from '@/components/ui/FormField'
import { DatePicker } from './DatePicker'

const EVENT_TYPES = ['mariage', 'corporate', 'gala', 'prive', 'autre']

export function StepEventDetails({ errors }: { errors: Record<string, string> }) {
  const { t } = useTranslation()
  const { L } = useL()
  const { venues } = useVenues()
  const s = useEnquiryStore()
  const { isBlocked } = useAvailability(s.venues)

  return (
    <div className="space-y-8">
      {/* Venue selection — multi-select cards */}
      <fieldset>
        <FieldLabel required>{t('contact.fields.venues')}</FieldLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {venues.map((v) => {
            const checked = s.venues.includes(v.slug)
            return (
              <button
                key={v.slug}
                type="button"
                onClick={() => s.toggleVenue(v.slug)}
                aria-pressed={checked}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                  checked ? 'bg-pearl' : 'border-gold/20 bg-cream hover:border-gold/40'
                }`}
                style={
                  checked
                    ? { borderColor: v.accentColor, boxShadow: `0 0 16px ${v.accentColor}33` }
                    : undefined
                }
              >
                <GemIcon size={18} color={checked ? v.accentColor : 'var(--faint)'} filled={checked} />
                <span>
                  <span className="block font-display text-base text-ink">{L(v.name)}</span>
                  <span className="text-xs text-faint">
                    {t('common.upToGuests', { count: v.capacity })}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
        <FieldError message={errors.venues && t(`contact.errors.${errors.venues}`)} />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="eventType">{t('contact.fields.eventType')}</FieldLabel>
          <Select id="eventType" value={s.eventType} onChange={(e) => s.set({ eventType: e.target.value })}>
            {EVENT_TYPES.map((et) => (
              <option key={et} value={et}>
                {t(`contact.eventTypes.${et}`)}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FieldLabel htmlFor="tier">{t('contact.fields.tier')}</FieldLabel>
          <Select id="tier" value={s.tier} onChange={(e) => s.set({ tier: e.target.value })}>
            {TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name}
              </option>
            ))}
            <option value="unsure">{t('contact.tierUnsure')}</option>
          </Select>
        </div>
      </div>

      {/* Guest count slider */}
      <div>
        <FieldLabel htmlFor="guests">
          {t('contact.fields.guests')} — <span className="text-gold-dk">{s.guestCount}</span>
        </FieldLabel>
        <input
          id="guests"
          type="range"
          min={10}
          max={600}
          step={10}
          value={s.guestCount}
          onChange={(e) => s.set({ guestCount: Number(e.target.value) })}
          className="w-full accent-gold"
        />
        <div className="mt-1 flex justify-between text-[0.58rem] text-faint">
          <span>10</span>
          <span>600</span>
        </div>
      </div>

      <div>
        <FieldLabel>{t('contact.fields.date')}</FieldLabel>
        <DatePicker value={s.eventDate} onChange={(iso) => s.set({ eventDate: iso })} isBlocked={isBlocked} />
      </div>

      <div>
        <FieldLabel htmlFor="notes">{t('contact.fields.notes')}</FieldLabel>
        <Textarea
          id="notes"
          rows={4}
          placeholder={t('contact.fields.notesPlaceholder')}
          value={s.notes}
          onChange={(e) => s.set({ notes: e.target.value })}
        />
      </div>
    </div>
  )
}

export default StepEventDetails
