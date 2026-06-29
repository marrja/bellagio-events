import { Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Seo'
import { InnerHero } from '@/components/layout/InnerHero'
import { GemIcon } from '@/components/ui/GemIcon'
import { GoldRule } from '@/components/ui/GoldRule'
import { GlowLink } from '@/components/ui/GlowButton'

interface MerciState {
  name?: string
  whatsappUrl?: string
}

export default function ContactMerci() {
  const { t } = useTranslation()
  const location = useLocation()
  const state = (location.state as MerciState) ?? {}

  // Reaching this page without a submission is meaningless — send home.
  if (!state.whatsappUrl) {
    return <Navigate to="/contact" replace />
  }

  const name = state.name?.split(' ')[0] ?? ''

  return (
    <>
      <Seo title="Merci — Bellagio Event's" description="Votre demande a bien été reçue." noindex />

      <InnerHero
        eyebrow={t('brand.name')}
        title={name ? t('merci.title', { name }) : t('merci.titleNoName')}
      />

      <section className="container-bellagio pb-28">
        <div className="mx-auto max-w-xl text-center">
          {/* Clear confirmation that the form submission went through */}
          <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-cream px-6 py-3 shadow-soft">
            <GemIcon size={16} color="var(--gold)" filled />
            <span className="font-display text-lg text-ink">{t('merci.sent')}</span>
          </div>

          <p className="mt-6 text-balance leading-relaxed text-muted">{t('merci.text')}</p>

          {/* WhatsApp offered as an optional, secondary channel */}
          <GoldRule withGem className="mx-auto my-10 max-w-xs" />
          <p className="text-sm text-muted">{t('merci.alsoWhatsApp')}</p>
          <div className="mt-5 flex flex-col items-center gap-3">
            <GlowLink to={state.whatsappUrl} external variant="primary">
              {t('merci.openWhatsApp')}
            </GlowLink>
            <GlowLink to="/" variant="outline">
              {t('merci.backHome')}
            </GlowLink>
          </div>
        </div>
      </section>
    </>
  )
}
