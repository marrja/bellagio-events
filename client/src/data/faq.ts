import type { FaqItem } from './types'

const RESERVATION = { fr: 'Réservation', en: 'Booking', ar: 'الحجز' }
const TARIFS = { fr: 'Tarifs & formules', en: 'Pricing & packages', ar: 'الأسعار والباقات' }
const LOGISTIQUE = { fr: 'Logistique', en: 'Logistics', ar: 'اللوجستيات' }
const TRAITEUR = { fr: 'Traiteur', en: 'Catering', ar: 'الضيافة' }

export const FAQ: FaqItem[] = [
  {
    category: RESERVATION,
    question: {
      fr: 'Comment réserver une date ?',
      en: 'How do I reserve a date?',
      ar: 'كيف أحجز موعدًا؟',
    },
    answer: {
      fr: "Remplissez le formulaire de contact en sélectionnant votre espace et votre date souhaitée. Nous vérifions la disponibilité et revenons vers vous sous 48 h pour planifier une visite et établir un devis.",
      en: 'Fill in the contact form, selecting your venue and preferred date. We check availability and reply within 48 hours to schedule a visit and prepare a quote.',
      ar: 'املأ نموذج الاتصال مع اختيار المكان والتاريخ. نتحقق من التوفّر ونعود إليك خلال 48 ساعة.',
    },
  },
  {
    category: RESERVATION,
    question: {
      fr: "Combien de temps à l'avance faut-il réserver ?",
      en: 'How far in advance should I book?',
      ar: 'كم من الوقت يجب الحجز مسبقًا؟',
    },
    answer: {
      fr: "Pour un mariage en haute saison (juillet à septembre, décembre), nous recommandons 9 à 12 mois à l'avance. Pour les autres périodes et les événements corporate, 3 à 6 mois suffisent généralement.",
      en: 'For a peak-season wedding (July–September, December) we recommend 9–12 months ahead. For other periods and corporate events, 3–6 months is generally enough.',
      ar: 'لحفلات الزفاف في الموسم العالي ننصح بالحجز قبل 9 إلى 12 شهرًا.',
    },
  },
  {
    category: TARIFS,
    question: {
      fr: 'Les prix varient-ils selon la saison ?',
      en: 'Do prices vary by season?',
      ar: 'هل تختلف الأسعار حسب الموسم؟',
    },
    answer: {
      fr: "Oui. La haute saison (juillet–septembre, décembre) applique une majoration, la saison intermédiaire (mars–juin, octobre) reste au tarif de base, et la basse saison (janvier–février, novembre) bénéficie d'un tarif réduit. Tous nos prix sont indiqués « à partir de » et confirmés sur devis.",
      en: 'Yes. High season (July–September, December) carries a premium, shoulder season (March–June, October) is at base rate, and low season (January–February, November) benefits from a reduced rate. All prices are shown "from" and confirmed by quote.',
      ar: 'نعم. يطبّق الموسم العالي زيادة، بينما يستفيد الموسم المنخفض من سعر مخفّض.',
    },
  },
  {
    category: TARIFS,
    question: {
      fr: 'Que comprend la formule PRESTIGE ?',
      en: 'What does the PRESTIGE package include?',
      ar: 'ماذا تشمل باقة PRESTIGE؟',
    },
    answer: {
      fr: "PRESTIGE est notre formule tout-inclus : location de l'espace, décoration et design floral, traiteur complet avec open bar, planner dédié, photographe et vidéaste, animation, suite nuptiale avec nuitée et service VIP. Rien n'est laissé au hasard.",
      en: 'PRESTIGE is our all-inclusive package: venue, decor and floral design, full catering with open bar, dedicated planner, photographer and videographer, entertainment, bridal suite with overnight stay and VIP service. Nothing is left to chance.',
      ar: 'PRESTIGE هي باقتنا الشاملة: المكان والديكور والضيافة والمنظّم والتصوير والإقامة وخدمة VIP.',
    },
  },
  {
    category: LOGISTIQUE,
    question: {
      fr: 'Le stationnement est-il prévu pour les invités ?',
      en: 'Is parking available for guests?',
      ar: 'هل يتوفّر موقف للسيارات للضيوف؟',
    },
    answer: {
      fr: "Oui. La Grande Salle dispose d'un service voiturier pour 300 véhicules. Les Jardins offrent un vaste stationnement sur site, et Le Salon Privé propose un parking dédié à proximité de son entrée privée.",
      en: 'Yes. The Grand Hall offers valet parking for 300 vehicles. The Gardens provide ample on-site parking, and the Private Salon has dedicated parking near its private entrance.',
      ar: 'نعم. توفّر القاعة الكبرى خدمة صفّ 300 سيارة، والحدائق موقفًا واسعًا.',
    },
  },
  {
    category: LOGISTIQUE,
    question: {
      fr: 'Peut-on organiser une visite des espaces ?',
      en: 'Can we tour the venues?',
      ar: 'هل يمكننا زيارة الأماكن؟',
    },
    answer: {
      fr: 'Absolument. Nous organisons des visites guidées sur rendez-vous, idéalement en soirée pour découvrir la mise en lumière LED. Demandez votre visite via le formulaire de contact.',
      en: 'Absolutely. We arrange guided visits by appointment, ideally in the evening to experience the LED lighting. Request your visit via the contact form.',
      ar: 'بالتأكيد. ننظّم زيارات بموعد مسبق، ويُفضّل مساءً لاكتشاف إضاءة LED.',
    },
  },
  {
    category: TRAITEUR,
    question: {
      fr: 'Peut-on faire appel à son propre traiteur ?',
      en: 'Can we bring our own caterer?',
      ar: 'هل يمكننا إحضار خدمة الضيافة الخاصة بنا؟',
    },
    answer: {
      fr: "Avec la formule ESPACE, vous êtes libre de choisir votre traiteur parmi nos partenaires agréés. Les formules SAVEUR et PRESTIGE incluent notre service traiteur avec menu composé par le chef. Les régimes spécifiques et menus halal sont toujours pris en charge.",
      en: 'With the ESPACE package you are free to choose your caterer from our approved partners. SAVEUR and PRESTIGE include our in-house catering with a chef-curated menu. Specific diets and halal menus are always accommodated.',
      ar: 'مع باقة ESPACE يمكنك اختيار خدمة الضيافة من شركائنا المعتمدين. القوائم الحلال متوفّرة دائمًا.',
    },
  },
  {
    category: TRAITEUR,
    question: {
      fr: 'Les menus halal et sans alcool sont-ils disponibles ?',
      en: 'Are halal and alcohol-free menus available?',
      ar: 'هل تتوفّر قوائم حلال وخالية من الكحول؟',
    },
    answer: {
      fr: "Oui, tous nos menus peuvent être préparés halal, et nous proposons une carte complète de cocktails sans alcool et de boissons signatures pour les célébrations sans alcool.",
      en: 'Yes, all our menus can be prepared halal, and we offer a full range of alcohol-free signature cocktails and beverages for dry celebrations.',
      ar: 'نعم، يمكن تحضير جميع قوائمنا حلال، ونقدّم كوكتيلات مميّزة خالية من الكحول.',
    },
  },
]
