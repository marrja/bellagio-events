import { useEffect, useState } from 'react'
import type { Venue, VenueSlug } from '@/data/types'
import { getVenue, getVenues } from '@/lib/api'

/** Fetch a single venue by slug (CMS with seed fallback). */
export function useVenue(slug: VenueSlug | undefined) {
  const [venue, setVenue] = useState<Venue | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    if (!slug) {
      setLoading(false)
      return
    }
    setLoading(true)
    getVenue(slug).then((v) => {
      if (active) {
        setVenue(v)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [slug])

  return { venue, loading }
}

/** Fetch all active venues. */
export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getVenues().then((v) => {
      if (active) {
        setVenues(v)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [])

  return { venues, loading }
}
