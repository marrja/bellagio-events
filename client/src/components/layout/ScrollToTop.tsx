import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop } from '@/lib/smoothScroll'

/** Reset scroll to top on route change (ignores hash links). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    scrollToTop(true)
  }, [pathname, hash])
  return null
}

export default ScrollToTop
