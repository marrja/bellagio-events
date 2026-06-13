import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { GlowLink } from '@/components/ui/GlowButton'

const NAV: { to: string; key: string }[] = [
  { to: '/nos-espaces', key: 'nav.venues' },
  { to: '/formules', key: 'nav.packages' },
  { to: '/evenements', key: 'nav.events' },
  { to: '/galerie', key: 'nav.gallery' },
  { to: '/a-propos', key: 'nav.about' },
  { to: '/faq', key: 'nav.faq' },
]

export function SiteHeader() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // These routes open on a full-bleed dark hero, so the transparent header
  // needs light text until the user scrolls onto the ivory background.
  const hasDarkHero =
    location.pathname === '/' || location.pathname.startsWith('/espaces/')
  const solid = scrolled || menuOpen
  const overDark = hasDarkHero && !solid

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `label text-[0.66rem] transition-colors duration-200 ${
      isActive
        ? overDark
          ? 'text-gold-lt'
          : 'text-gold-dk'
        : overDark
          ? 'text-pearl/85 hover:text-pearl'
          : 'text-muted hover:text-ink'
    }`

  const barColor = overDark ? 'bg-pearl' : 'bg-ink'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        solid
          ? 'border-b border-gold/15 bg-ivory/90 backdrop-blur-md'
          : hasDarkHero
            ? 'bg-gradient-to-b from-noir/50 to-transparent'
            : 'bg-gradient-to-b from-ivory/80 to-transparent'
      }`}
    >
      <div className="container-bellagio flex h-[76px] items-center justify-between">
        <Logo dark={overDark} />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher dark={overDark} />
          <span className={`h-5 w-px ${overDark ? 'bg-pearl/30' : 'bg-gold/30'}`} aria-hidden />
          <GlowLink to="/contact" variant="primary" className="!px-6 !py-2.5">
            {t('cta.requestVisit')}
          </GlowLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`block h-[1.5px] w-6 ${barColor} transition-transform duration-300 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block h-[1.5px] w-6 ${barColor} transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[1.5px] w-6 ${barColor} transition-transform duration-300 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gold/15 bg-ivory/97 backdrop-blur-md transition-[max-height] duration-500 ease-out lg:hidden ${
          menuOpen ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <nav className="container-bellagio flex flex-col gap-1 py-5">
          <NavLink to="/" className={({ isActive }) => `label py-3 text-[0.66rem] ${isActive ? 'text-gold-dk' : 'text-muted hover:text-ink'}`} end>
            {t('nav.home')}
          </NavLink>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `label py-3 text-[0.66rem] ${isActive ? 'text-gold-dk' : 'text-muted hover:text-ink'}`}
            >
              {t(item.key)}
            </NavLink>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-5">
            <LanguageSwitcher />
            <GlowLink to="/contact" variant="primary" className="!px-5 !py-2.5">
              {t('cta.requestVisit')}
            </GlowLink>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
