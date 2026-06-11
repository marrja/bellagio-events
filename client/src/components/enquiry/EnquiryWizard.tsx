import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useEnquiryStore } from '@/store/enquiryStore'
import { enquirySchema, stepFields, type EnquiryInput } from '@/lib/enquirySchema'
import { submitEnquiry } from '@/lib/api'
import type { VenueSlug } from '@/data/types'
import { GemIcon } from '@/components/ui/GemIcon'
import { GlowButton } from '@/components/ui/GlowButton'
import { FieldError } from '@/components/ui/FormField'
import { StepEventDetails } from './StepEventDetails'
import { StepContact } from './StepContact'
import { StepReview } from './StepReview'

const STEP_KEYS = ['contact.step1', 'contact.step2', 'contact.step3']

export function EnquiryWizard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const store = useEnquiryStore()
  const { step, next, prev } = store
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const snapshot = (): EnquiryInput =>
    ({
      venues: store.venues,
      eventType: store.eventType,
      tier: store.tier,
      eventDate: store.eventDate,
      guestCount: store.guestCount,
      notes: store.notes,
      name: store.name,
      email: store.email,
      phone: store.phone,
      source: store.source,
      preferredContact: store.preferredContact,
      consent: store.consent,
    }) as EnquiryInput

  /** Validate only the fields belonging to the current step. */
  function validateStep(current: number): boolean {
    const result = enquirySchema.safeParse(snapshot())
    if (result.success) {
      setErrors({})
      return true
    }
    const fields = stepFields[current] ?? []
    const stepErrors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (fields.includes(field as keyof EnquiryInput)) {
        stepErrors[field] = issue.message
      }
    }
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  function handleNext() {
    if (validateStep(step)) {
      setErrors({})
      next()
    }
  }

  async function handleSubmit() {
    if (!validateStep(2)) return
    const parsed = enquirySchema.safeParse(snapshot())
    if (!parsed.success) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await submitEnquiry({
        ...parsed.data,
        venues: parsed.data.venues as VenueSlug[],
        eventDate: parsed.data.eventDate ?? '',
      })
      const name = store.name
      store.reset()
      navigate('/contact/merci', {
        state: { name, reference: res.reference },
      })
    } catch {
      setSubmitError(t('contact.errors.submit'))
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress indicator */}
      <ol className="mb-10 flex items-center justify-between">
        {STEP_KEYS.map((key, i) => {
          const active = i === step
          const done = i < step
          return (
            <li key={key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors duration-300 ${
                    active
                      ? 'border-electric bg-electric/15 text-electric-lt'
                      : done
                        ? 'border-electric/50 text-electric-lt'
                        : 'border-white/15 text-smoke'
                  }`}
                >
                  {done ? <GemIcon size={14} color="var(--electric-lt)" filled /> : i + 1}
                </span>
                <span
                  className={`label hidden text-[0.55rem] sm:block ${
                    active ? 'text-white' : 'text-smoke'
                  }`}
                >
                  {t(key)}
                </span>
              </div>
              {i < STEP_KEYS.length - 1 && (
                <span
                  className={`mx-2 h-px flex-1 transition-colors duration-300 ${
                    done ? 'bg-electric/50' : 'bg-white/10'
                  }`}
                />
              )}
            </li>
          )
        })}
      </ol>

      <p className="label mb-6 text-center text-[0.6rem] text-smoke sm:hidden">
        {t('contact.stepOf', { current: step + 1, total: 3 })}
      </p>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && <StepEventDetails errors={errors} />}
          {step === 1 && <StepContact errors={errors} />}
          {step === 2 && <StepReview errors={errors} />}
        </motion.div>
      </AnimatePresence>

      {submitError && (
        <div className="mt-6">
          <FieldError message={submitError} />
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <GlowButton variant="ghost" onClick={prev} disabled={submitting}>
            ← {t('cta.back')}
          </GlowButton>
        ) : (
          <span />
        )}

        {step < 2 ? (
          <GlowButton variant="primary" onClick={handleNext}>
            {t('cta.next')} →
          </GlowButton>
        ) : (
          <GlowButton variant="primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                {t('cta.submitting')}
              </>
            ) : (
              t('cta.submit')
            )}
          </GlowButton>
        )}
      </div>
    </div>
  )
}

export default EnquiryWizard
