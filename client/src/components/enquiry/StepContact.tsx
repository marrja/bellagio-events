import { useTranslation } from 'react-i18next'
import { useEnquiryStore, type ContactMethod } from '@/store/enquiryStore'
import {
  FieldLabel,
  FieldError,
  Input,
  Select,
} from '@/components/ui/FormField'

const SOURCES = ['instagram', 'facebook', 'google', 'wordofmouth', 'other']
const METHODS: ContactMethod[] = ['email', 'phone', 'whatsapp']

export function StepContact({ errors }: { errors: Record<string, string> }) {
  const { t } = useTranslation()
  const s = useEnquiryStore()

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <FieldLabel htmlFor="name" required>
            {t('contact.fields.name')}
          </FieldLabel>
          <Input
            id="name"
            value={s.name}
            autoComplete="name"
            onChange={(e) => s.set({ name: e.target.value })}
          />
          <FieldError message={errors.name && t(`contact.errors.${errors.name}`)} />
        </div>

        {/* Email */}
        <div>
          <FieldLabel htmlFor="email" required>
            {t('contact.fields.email')}
          </FieldLabel>
          <Input
            id="email"
            type="email"
            value={s.email}
            autoComplete="email"
            onChange={(e) => s.set({ email: e.target.value })}
          />
          <FieldError
            message={errors.email && t(`contact.errors.${errors.email}`)}
          />
        </div>
      </div>

      {/* Phone with +216 prefix */}
      <div>
        <FieldLabel htmlFor="phone">{t('contact.fields.phone')}</FieldLabel>
        <div className="flex items-stretch gap-2">
          <span className="label flex items-center rounded-sm border border-white/15 bg-surface/60 px-3 text-sm text-silver">
            +216
          </span>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            value={s.phone}
            autoComplete="tel"
            placeholder="20 000 000"
            onChange={(e) => s.set({ phone: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Source */}
        <div>
          <FieldLabel htmlFor="source">{t('contact.fields.source')}</FieldLabel>
          <Select
            id="source"
            value={s.source}
            onChange={(e) => s.set({ source: e.target.value })}
          >
            {SOURCES.map((src) => (
              <option key={src} value={src}>
                {t(`contact.sources.${src}`)}
              </option>
            ))}
          </Select>
        </div>

        {/* Preferred contact */}
        <div>
          <FieldLabel>{t('contact.fields.preferredContact')}</FieldLabel>
          <div className="flex gap-2">
            {METHODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => s.set({ preferredContact: m })}
                aria-pressed={s.preferredContact === m}
                className={`label flex-1 rounded-sm border px-2 py-3 text-[0.6rem] transition-colors duration-200 ${
                  s.preferredContact === m
                    ? 'border-electric bg-electric/10 text-electric-lt'
                    : 'border-white/15 text-silver hover:text-white'
                }`}
              >
                {t(`contact.contactMethods.${m}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepContact
