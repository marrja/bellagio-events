// Thin wrapper over the Plausible snippet in index.html. No-ops if the
// script is blocked or absent, so it's always safe to call.
type Props = Record<string, string | number | boolean>

export function track(event: string, props?: Props) {
  if (typeof window === 'undefined') return
  const p = (window as unknown as { plausible?: (e: string, o?: { props: Props }) => void })
    .plausible
  p?.(event, props ? { props } : undefined)
}
