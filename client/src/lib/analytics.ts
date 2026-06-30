// Sends custom events to Google Analytics 4 (gtag) and Plausible — whichever
// snippet is present. No-ops if both are blocked/absent, so it's always safe.
type Props = Record<string, string | number | boolean>

export function track(event: string, props?: Props) {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    gtag?: (command: string, event: string, props?: Props) => void
    plausible?: (e: string, o?: { props: Props }) => void
  }
  w.gtag?.('event', event, props)
  w.plausible?.(event, props ? { props } : undefined)
}
