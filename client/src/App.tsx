import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { GemIcon } from '@/components/ui/GemIcon'

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-24">
      <GemIcon size={28} color="var(--electric)" className="animate-pulse-glow" />
    </div>
  )
}

/** Root layout: header + animated page content + footer. */
export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <SiteHeader />
      <div className="flex-1">
        {/* Keyed by pathname so each page plays the enter transition. */}
        <Suspense fallback={<RouteFallback />}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </Suspense>
      </div>
      <SiteFooter />
    </div>
  )
}
