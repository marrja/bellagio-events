import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'
import { GemIcon } from '@/components/ui/GemIcon'
import { GoldRule } from '@/components/ui/GoldRule'

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
    <footer className="relative mt-24 border-t border-white/5 bg-deep">
      <div className="container-bellagio py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-smoke">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label={t('footer.explore')}>
            <h4 className="label mb-4 text-[0.65rem] text-gold">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-2.5">
              {EXPLORE.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-silver transition-colors hover:text-electric-lt"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h4 className="label mb-4 text-[0.65rem] text-gold">
              {t('footer.follow')}
            </h4>
            <ul className="space-y-2.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-silver transition-colors hover:text-electric-lt"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label mb-4 text-[0.65rem] text-gold">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2.5 text-sm text-silver">
              <li>
                <a
                  href="tel:+21670000000"
                  className="transition-colors hover:text-electric-lt"
                >
                  +216 70 000 000
                </a>
              </li>
              <li>
                <a
                  href="mailto:events@bellagioevent.com"
                  className="transition-colors hover:text-electric-lt"
                >
                  events@bellagioevent.com
                </a>
              </li>
              <li className="text-smoke">{t('footer.hours')}</li>
              <li className="text-smoke">Tunis, Tunisie</li>
            </ul>
          </div>
        </div>

        <GoldRule className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-smoke">
            <GemIcon size={12} color="var(--gold)" />
            © {year} Bellagio Event's. {t('footer.rights')}
          </p>
          <p className="label text-[0.6rem] text-smoke">
            {t('home.heroSubtitle')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
