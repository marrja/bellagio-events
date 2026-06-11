import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset scroll to top on route change (ignores hash links). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

export default ScrollToTop
