import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useL } from '@/hooks/useL'
import { getFaq } from '@/lib/api'
import type { FaqItem } from '@/data/types'
import { Seo } from '@/components/Seo'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld'
import { InnerHero } from '@/components/layout/InnerHero'
import { GemIcon } from '@/components/ui/GemIcon'
import { GlowLink } from '@/components/ui/GlowButton'
import { Reveal } from '@/components/ui/Reveal'

export default function FAQ() {
  const { t } = useTranslation()
  const { L, lang } = useL()
  const [faq, setFaq] = useState<FaqItem[]>([])
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    getFaq().then(setFaq)
  }, [])

  // Group questions by category (preserving order).
  const groups = useMemo(() => {
    const map = new Map<string, FaqItem[]>()
    for (const item of faq) {
      const key = item.category.fr
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(item)
    }
    return Array.from(map.entries())
  }, [faq])

  return (
    <>
      <Seo
        title="FAQ — Bellagio Event's"
        description="Réponses aux questions fréquentes sur la réservation, les tarifs et la logistique."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Accueil', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          ...(faq.length ? [faqJsonLd(faq, lang)] : []),
        ]}
      />

      <InnerHero
        eyebrow={t('brand.name')}
        title={t('faqPage.title')}
        intro={t('faqPage.intro')}
      />

      <section className="container-bellagio py-12 pb-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map(([catKey, items], gi) => (
            <Reveal key={catKey} delay={gi * 60}>
              <div>
                <h2 className="label mb-5 flex items-center gap-2 text-[0.7rem] text-gold">
                  <GemIcon size={14} color="var(--gold)" />
                  {L(items[0].category)}
                </h2>
                <div className="divide-y divide-white/8 border-y border-white/8">
                  {items.map((item) => {
                    const id = item.question.fr
                    const isOpen = open === id
                    return (
                      <div key={id}>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                        >
                          <span className="font-display text-lg text-white">
                            {L(item.question)}
                          </span>
                          <span
                            className="shrink-0 text-electric transition-transform duration-300"
                            style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                            aria-hidden
                          >
                            +
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="pb-5 leading-relaxed text-smoke">
                                {L(item.answer)}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-smoke">{t('home.ctaBannerText')}</p>
          <div className="mt-5 flex justify-center">
            <GlowLink to="/contact" variant="primary">
              {t('cta.contactUs')}
            </GlowLink>
          </div>
        </div>
      </section>
    </>
  )
}
