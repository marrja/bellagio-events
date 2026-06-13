import Lenis from 'lenis'

// Singleton Lenis instance for buttery, momentum-based scrolling.
// Disabled entirely when the user prefers reduced motion.
let lenis: Lenis | null = null

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  lenis = new Lenis({
    duration: 1.1,
    // ease-out expo — refined, no bounce
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  let raf = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  }
}

/** Jump to the top — immediate on route change. */
export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0 })
}

/** Lock / unlock page scroll (e.g. while a modal is open). */
export function stopScroll() {
  if (lenis) lenis.stop()
  document.body.style.overflow = 'hidden'
}
export function startScroll() {
  if (lenis) lenis.start()
  document.body.style.overflow = ''
}

/** Smoothly scroll an in-page anchor into view. */
export function scrollToEl(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -76 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
