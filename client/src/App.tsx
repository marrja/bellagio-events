import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { initSmoothScroll } from '@/lib/smoothScroll'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { GemIcon } from '@/components/ui/GemIcon'

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-24">
      <GemIcon size={28} color="var(--gold)" className="animate-pulse-soft" />
    </div>
  )
}

/** Root layout: header + animated page content + footer. */
export default function App() {
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => initSmoothScroll(), [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Keyboard users can jump the header straight to the page content. */}
      <a
        href="#main-content"
        className="sr-only rounded-md focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-pearl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {t('a11y.skipToContent')}
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Keyed by pathname so each page plays the enter transition. */}
        <Suspense fallback={<RouteFallback />}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  )
}
