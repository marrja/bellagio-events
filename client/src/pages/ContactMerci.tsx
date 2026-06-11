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
      <Seo
        title="Merci — Bellagio Event's"
        description="Votre demande a bien été reçue."
        noindex
      />

      <InnerHero eyebrow={t('brand.name')} title={t('merci.title', { name })} />

      <section className="container-bellagio pb-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-balance leading-relaxed text-smoke">
            {t('merci.text')}
          </p>

          {state.reference && (
            <div className="mt-10 inline-flex flex-col items-center gap-2 rounded-md border border-white/10 bg-surface/40 px-10 py-6">
              <span className="label text-[0.6rem] text-smoke">
                {t('merci.reference')}
              </span>
              <span className="flex items-center gap-2 font-display text-2xl text-white">
                <GemIcon size={16} color="var(--electric)" />
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
