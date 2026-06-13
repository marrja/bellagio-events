import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { LazyImage } from '@/components/ui/LazyImage'
import { GemIcon } from '@/components/ui/GemIcon'
import { GoldRule } from '@/components/ui/GoldRule'
import { GlowLink } from '@/components/ui/GlowButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Starfield } from '@/components/ui/Starfield'
import { Reveal } from '@/components/ui/Reveal'

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
        description="Un lieu pensé pour l'événement d'exception en Tunisie."
        jsonLd={breadcrumbJsonLd([
          { name: 'Accueil', path: '/' },
          { name: 'À propos', path: '/a-propos' },
        ])}
      />

      <InnerHero eyebrow={t('brand.name')} title={t('about.title')} intro={t('about.intro')} />

      <section className="container-bellagio py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <LazyImage
              src="/venue/hall/entrance.jpg"
              alt={t('about.storyTitle')}
              width={900}
              height={1000}
              className="rounded-2xl shadow-soft"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="flex items-center gap-3">
                <GemIcon size={15} color="var(--gold)" />
                <span className="label text-[0.62rem] text-gold-dk">{t('about.storyTitle')}</span>
              </div>
              <p className="mt-5 leading-relaxed text-muted">{t('about.story1')}</p>
              <p className="mt-4 leading-relaxed text-muted">{t('about.story2')}</p>
              <GoldRule className="my-7 max-w-xs" />
              <GlowLink to="/contact" variant="outline">
                {t('cta.requestVisit')}
              </GlowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values — starlit dark section */}
      <section className="section-noir relative overflow-hidden py-20 sm:py-28">
        <Starfield count={50} />
        <div className="container-bellagio relative">
          <Reveal>
            <SectionHeading eyebrow={t('brand.name')} title={t('about.valuesTitle')} dark />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-gold/20 bg-espresso/70 p-7 text-center backdrop-blur-sm">
                  <GemIcon size={24} color="var(--gold-lt)" className="mx-auto" />
                  <h3 className="mt-4 font-display text-2xl text-pearl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-pearl/65">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
