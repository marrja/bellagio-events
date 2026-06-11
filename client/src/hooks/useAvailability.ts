import { useEffect, useMemo, useState } from 'react'
import type { BlockedDate, VenueSlug } from '@/data/types'
import { getAvailability } from '@/lib/api'

/**
 * Fetch blocked dates for one or more venues. Returns a Set of ISO
 * date strings (yyyy-mm-dd) plus a helper to test a given date.
 * Used by the enquiry date picker to grey out unavailable dates.
 */
export function useAvailability(slugs: VenueSlug[]) {
  const [blocked, setBlocked] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(false)

  // Stable key so the effect only re-runs when the set of slugs changes.
  const key = slugs.slice().sort().join(',')

  useEffect(() => {
    let active = true
    if (slugs.length === 0) {
      setBlocked([])
      return
    }
    setLoading(true)
    Promise.all(slugs.map((s) => getAvailability(s))).then((results) => {
      if (active) {
        setBlocked(results.flat())
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const blockedSet = useMemo(
    () => new Set(blocked.map((b) => b.date)),
    [blocked],
  )

  const isBlocked = (iso: string) => blockedSet.has(iso)

  return { blocked, blockedSet, isBlocked, loading }
}
