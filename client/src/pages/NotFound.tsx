import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Seo'
import { GemIcon } from '@/components/ui/GemIcon'
import { GlowLink } from '@/components/ui/GlowButton'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <Seo title="404 — Bellagio Event's" description={t('notFound.text')} noindex />
      <section className="flex min-h-[70vh] items-center justify-center pt-24">
        <div className="container-bellagio text-center">
          <div className="glow-halo">
            <GemIcon size={40} color="var(--electric)" className="mx-auto" />
            <p className="mt-6 font-display text-7xl font-light text-white">404</p>
            <h1 className="mt-2 font-display text-3xl font-light text-silver">
              {t('notFound.title')}
            </h1>
          </div>
          <p className="mx-auto mt-4 max-w-md text-smoke">{t('notFound.text')}</p>
          <div className="mt-8 flex justify-center">
            <GlowLink to="/" variant="primary">
              {t('notFound.back')}
            </GlowLink>
          </div>
        </div>
      </section>
    </>
  )
}
