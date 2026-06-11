import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { LazyImage } from '@/components/ui/LazyImage'
import { GemIcon } from '@/components/ui/GemIcon'
import { GoldRule } from '@/components/ui/GoldRule'
import { GlowLink } from '@/components/ui/GlowButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const STORY_IMG =
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop'

export default function About() {
  const { t } = useTranslation()

  const values = [
    { title: t('about.value1Title'), text: t('about.value1Text') },
    { title: t('about.value2Title'), text: t('about.value2Text') },
    { title: t('about.value3Title'), text: t('about.value3Text') },
  ]

  return (
    <>
      <Seo
        title="À propos — Bellagio Event's"
        description="Un domaine pensé pour l'événement d'exception en Tunisie."
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'À propos', path: '/a-propos' },
        ])}
      />

      <InnerHero
        eyebrow={t('brand.name')}
        title={t('about.title')}
        intro={t('about.intro')}
      />

      {/* Story */}
      <section className="container-bellagio py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <LazyImage
              src={STORY_IMG}
              alt={t('about.storyTitle')}
              width={900}
              height={680}
              className="rounded-md"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="flex items-center gap-3">
                <GemIcon size={16} color="var(--electric)" />
                <span className="label text-[0.65rem] text-gold">
                  {t('about.storyTitle')}
                </span>
              </div>
              <p className="mt-5 leading-relaxed text-smoke">{t('about.story1')}</p>
              <p className="mt-4 leading-relaxed text-smoke">{t('about.story2')}</p>
              <GoldRule className="my-7 max-w-xs" />
              <GlowLink to="/contact" variant="outline">
                {t('cta.requestVisit')}
              </GlowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-deep py-20 sm:py-28">
        <div className="container-bellagio">
          <Reveal>
            <SectionHeading eyebrow={t('brand.name')} title={t('about.valuesTitle')} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-md border border-white/10 bg-surface/40 p-7 text-center">
                  <GemIcon size={24} color="var(--electric)" className="mx-auto" />
                  <h3 className="mt-4 font-display text-2xl text-white">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
