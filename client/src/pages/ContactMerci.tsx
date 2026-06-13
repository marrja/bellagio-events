import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Seo'
import { InnerHero } from '@/components/layout/InnerHero'
import { GemIcon } from '@/components/ui/GemIcon'
import { GoldRule } from '@/components/ui/GoldRule'
import { GlowLink } from '@/components/ui/GlowButton'

interface MerciState {
  name?: string
  reference?: string
}

export default function ContactMerci() {
  const { t } = useTranslation()
  const location = useLocation()
  const state = (location.state as MerciState) ?? {}
  const name = state.name?.split(' ')[0] ?? ''

  return (
    <>
      <Seo title="Merci — Bellagio Event's" description="Votre demande a bien été reçue." noindex />

      <InnerHero eyebrow={t('brand.name')} title={t('merci.title', { name })} />

      <section className="container-bellagio pb-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-balance leading-relaxed text-muted">{t('merci.text')}</p>

          {state.reference && (
            <div className="mt-10 inline-flex flex-col items-center gap-2 rounded-2xl border border-gold/20 bg-cream px-10 py-6 shadow-soft">
              <span className="label text-[0.58rem] text-faint">{t('merci.reference')}</span>
              <span className="flex items-center gap-2 font-display text-2xl text-ink">
                <GemIcon size={16} color="var(--gold)" />
                {state.reference}
              </span>
            </div>
          )}

          <GoldRule withGem className="mx-auto my-10 max-w-xs" />

          <GlowLink to="/" variant="primary">
            {t('merci.backHome')}
          </GlowLink>
        </div>
      </section>
    </>
  )
}
