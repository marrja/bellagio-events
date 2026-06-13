import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'
import { GemIcon } from '@/components/ui/GemIcon'
import { FairyLights } from '@/components/ui/FairyLights'

const EXPLORE = [
  { to: '/nos-espaces', key: 'nav.venues' },
  { to: '/formules', key: 'nav.packages' },
  { to: '/galerie', key: 'nav.gallery' },
  { to: '/a-propos', key: 'nav.about' },
  { to: '/faq', key: 'nav.faq' },
]

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/bellagioevents' },
  { label: 'Facebook', href: 'https://www.facebook.com/bellagioevents' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@bellagioevents' },
]

export function SiteFooter() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="section-noir relative mt-24 overflow-hidden">
      <FairyLights count={21} className="absolute inset-x-0 top-6 opacity-70" />
      <div className="container-bellagio py-16 pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-pearl/60">
              {t('footer.tagline')}
            </p>
          </div>

          <nav aria-label={t('footer.explore')}>
            <h4 className="label mb-4 text-[0.62rem] text-gold">{t('footer.explore')}</h4>
            <ul className="space-y-2.5">
              {EXPLORE.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-pearl/70 transition-colors hover:text-gold-lt">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="label mb-4 text-[0.62rem] text-gold">{t('footer.follow')}</h4>
            <ul className="space-y-2.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-sm text-pearl/70 transition-colors hover:text-gold-lt">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-4 text-[0.62rem] text-gold">{t('footer.contact')}</h4>
            <ul className="space-y-2.5 text-sm text-pearl/70">
              <li>
                <a href="tel:+21652359900" className="transition-colors hover:text-gold-lt">
                  +216 52 359 900
                </a>
              </li>
              <li>
                <a href="mailto:events@bellagioevent.com" className="transition-colors hover:text-gold-lt">
                  events@bellagioevent.com
                </a>
              </li>
              <li className="text-pearl/50">{t('footer.hours')}</li>
              <li className="text-pearl/50">Tunisie</li>
            </ul>
          </div>
        </div>

        <div className="gold-rule my-10 opacity-60" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-pearl/50">
            <GemIcon size={12} color="var(--gold)" />
            © {year} Bellagio Event's. {t('footer.rights')}
          </p>
          <p className="label text-[0.64rem] text-pearl/40">{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
