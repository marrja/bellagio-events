import type { Tier, PackagePrice, VenueSlug } from './types'

// ============================================================
// The four service tiers, available across all three venues.
// Prices are in TND; always rendered as "à partir de X TND".
// ============================================================

export const TIERS: Tier[] = [
  {
    id: 'ESPACE',
    name: 'ESPACE',
    motto: {
      fr: 'Votre toile, votre vision',
      en: 'Your canvas, your vision',
      ar: 'لوحتك، رؤيتك',
    },
    inclusions: [
      { fr: "Accès complet à l'espace pour les heures convenues", en: 'Full venue access for agreed hours', ar: 'وصول كامل للمكان خلال الساعات المتفق عليها' },
      { fr: 'Infrastructure audiovisuelle intégrée', en: 'Integrated AV infrastructure', ar: 'بنية صوتية ومرئية مدمجة' },
      { fr: 'Agencement mobilier de base', en: 'Basic furniture layout', ar: 'تجهيز أساسي للأثاث' },
      { fr: 'Coordinateur sur site (8h)', en: 'On-site coordinator (8h)', ar: 'منسّق في الموقع (8 ساعات)' },
      { fr: 'Parking + support logistique', en: 'Parking + logistics support', ar: 'موقف سيارات ودعم لوجستي' },
      { fr: 'Temps de montage et démontage inclus', en: 'Setup & breakdown time included', ar: 'وقت التجهيز والتفكيك مشمول' },
    ],
    footnote: {
      fr: 'Événements auto-organisés. Ajoutez décoration, traiteur ou animation à la carte.',
      en: 'Self-planned events. Add styling, catering, or entertainment à la carte.',
      ar: 'فعاليات تنظّمها بنفسك. أضف الديكور أو الضيافة حسب الطلب.',
    },
  },
  {
    id: 'LUMIERE',
    name: 'LUMIÈRE',
    motto: {
      fr: 'Chaque détail compte',
      en: 'Every detail considered',
      ar: 'كل تفصيل مدروس',
    },
    inclusions: [
      { fr: 'Toutes les prestations ESPACE', en: 'All ESPACE inclusions', ar: 'جميع خدمات ESPACE' },
      { fr: 'Décoration et design floral complets', en: 'Full decor & floral design', ar: 'ديكور وتنسيق أزهار كامل' },
      { fr: "Conception d'ambiance lumineuse sur mesure", en: 'Custom lighting atmosphere design', ar: 'تصميم إضاءة وأجواء مخصّص' },
      { fr: 'Linge et habillage de chaises premium', en: 'Premium linen & chair styling', ar: 'مفروشات وتنسيق كراسي فاخر' },
      { fr: "Équipe de coordination ×2 sur site", en: 'Coordination team ×2 on-site', ar: 'فريق تنسيق من شخصين في الموقع' },
      { fr: 'Signalétique et papeterie stylisées', en: 'Signage & stationery styling', ar: 'لافتات وقرطاسية منسّقة' },
    ],
    footnote: {
      fr: 'Célébrations portées par le design. Ajoutez traiteur, animation et photographie séparément.',
      en: 'Design-led celebrations. Add catering, entertainment, photography separately.',
      ar: 'احتفالات يقودها التصميم. أضف الضيافة والترفيه بشكل منفصل.',
    },
  },
  {
    id: 'SAVEUR',
    name: 'SAVEUR',
    motto: {
      fr: 'Pensé pour le palais',
      en: 'Crafted for the palate',
      ar: 'مصمّم للذوق',
    },
    inclusions: [
      { fr: 'Toutes les prestations ESPACE', en: 'All ESPACE inclusions', ar: 'جميع خدمات ESPACE' },
      { fr: 'Menu 3 services composé par le chef', en: 'Chef-curated 3-course menu', ar: 'قائمة من 3 أطباق من إعداد الشيف' },
      { fr: 'Canapés et heure du cocktail', en: 'Canapés & cocktail hour', ar: 'مقبّلات وساعة كوكتيل' },
      { fr: 'Open bar (5h) avec cocktail signature', en: 'Open bar (5h) with signature cocktail', ar: 'بار مفتوح (5 ساعات) مع كوكتيل مميّز' },
      { fr: 'Personnel de service complet', en: 'Full service staff', ar: 'طاقم خدمة كامل' },
      { fr: 'Pièce montée personnalisée', en: 'Custom celebration cake', ar: 'كعكة احتفال مخصّصة' },
    ],
    footnote: {
      fr: 'Occasions centrées sur la gastronomie. Ajoutez décoration, animation, hébergement séparément.',
      en: 'Food-centred occasions. Add styling, entertainment, accommodation separately.',
      ar: 'مناسبات تتمحور حول الطعام. أضف الديكور والترفيه بشكل منفصل.',
    },
  },
  {
    id: 'PRESTIGE',
    name: 'PRESTIGE',
    motto: {
      fr: 'Rien laissé au hasard',
      en: 'Nothing left to chance',
      ar: 'لا شيء متروك للصدفة',
    },
    inclusions: [
      { fr: 'Toutes les prestations LUMIÈRE + SAVEUR', en: 'All LUMIÈRE + SAVEUR inclusions', ar: 'جميع خدمات LUMIÈRE وSAVEUR' },
      { fr: "Wedding / event planner dédié", en: 'Dedicated wedding/event planner', ar: 'منظّم فعاليات مخصّص' },
      { fr: 'Photographe + vidéaste (8h)', en: 'Photographer + videographer (8h)', ar: 'مصوّر فوتوغرافي ومصوّر فيديو (8 ساعات)' },
      { fr: 'Option musique live ou DJ', en: 'Live music or DJ option', ar: 'خيار موسيقى حية أو دي جي' },
      { fr: 'Suite nuptiale + nuitée', en: 'Bridal suite + overnight accommodation', ar: 'جناح عرائس + إقامة ليلية' },
      { fr: 'Service VIP lune de miel / transferts', en: 'VIP honeymoon / transfer service', ar: 'خدمة VIP لشهر العسل والتنقّلات' },
    ],
    footnote: {
      fr: 'Luxe complet, sans stress. Options sur mesure disponibles à la demande.',
      en: 'Complete no-stress luxury. Bespoke add-ons available on request.',
      ar: 'رفاهية كاملة دون أي قلق. إضافات مخصّصة عند الطلب.',
    },
  },
]

export const getTier = (id: string) => TIERS.find((t) => t.id === id)

// Base "à partir de" price per venue × tier, in TND.
// Derived from each venue's ESPACE base with tier multipliers.
const TIER_MULTIPLIER: Record<string, number> = {
  ESPACE: 1,
  LUMIERE: 1.6,
  SAVEUR: 2.1,
  PRESTIGE: 3.2,
}

export const PACKAGE_PRICES: PackagePrice[] = (
  [
    ['la-salle', 9000],
    ['le-jardin', 7500],
  ] as [VenueSlug, number][]
).flatMap(([venueSlug, base]) =>
  TIERS.map((tier) => ({
    venueSlug,
    tier: tier.id,
    basePrice: Math.round((base * TIER_MULTIPLIER[tier.id]) / 100) * 100,
    currency: 'TND' as const,
    priceType: 'per_day' as const,
  })),
)

export const getPrice = (venueSlug: string, tier: string): number | undefined =>
  PACKAGE_PRICES.find((p) => p.venueSlug === venueSlug && p.tier === tier)
    ?.basePrice
