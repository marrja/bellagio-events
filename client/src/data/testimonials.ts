import type { Testimonial } from './types'

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Yasmine & Karim',
    venueSlug: 'la-salle',
    rating: 5,
    date: '2025-09-14',
    eventType: { fr: 'Mariage', en: 'Wedding', ar: 'زفاف' },
    quote: {
      fr: "La Salle Bellagio a dépassé tous nos rêves. La kosha, les guirlandes lumineuses, les papillons : nos 450 invités en parlent encore. Une soirée féerique.",
      en: 'The Bellagio Hall surpassed all our dreams. The kosha, the fairy lights, the butterflies — our 450 guests are still talking about it. A magical evening.',
      ar: 'فاقت قاعة بيلاجيو كل أحلامنا. الكوشة والأضواء والفراشات — أمسية ساحرة.',
    },
  },
  {
    id: 't2',
    clientName: 'Leïla & Sami',
    venueSlug: 'la-salle',
    rating: 5,
    date: '2025-04-19',
    eventType: { fr: 'Fiançailles', en: 'Engagement', ar: 'خطوبة' },
    quote: {
      fr: "Une élégance rare, un service aux petits soins. L'éclairage doré et les voilages ont transformé notre soirée de fiançailles en véritable conte.",
      en: 'Rare elegance and attentive service. The golden lighting and drapery turned our engagement evening into a true fairytale.',
      ar: 'أناقة نادرة وخدمة فائقة. الإضاءة الذهبية والستائر حوّلت خطوبتنا إلى حكاية.',
    },
  },
  {
    id: 't3',
    clientName: 'Nour & Adam',
    venueSlug: 'le-jardin',
    rating: 5,
    date: '2025-07-26',
    eventType: { fr: 'Mariage en plein air', en: 'Garden wedding', ar: 'زفاف في الحديقة' },
    quote: {
      fr: "Se marier au Jardin Bellagio, sous un ciel de guirlandes à l'heure dorée, restera le plus beau souvenir de notre vie. Magique du début à la fin.",
      en: 'Getting married at the Bellagio Garden, beneath a sky of string lights at golden hour, will remain the most beautiful memory of our lives. Magical from start to finish.',
      ar: 'الزواج في حديقة بيلاجيو تحت سماء من الأضواء سيبقى أجمل ذكرى في حياتنا.',
    },
  },
  {
    id: 't4',
    clientName: 'Famille Ben Salah',
    venueSlug: 'la-salle',
    rating: 5,
    date: '2025-06-02',
    eventType: { fr: 'Soirée de henné', en: 'Henna night', ar: 'ليلة الحنّة' },
    quote: {
      fr: "Une soirée de henné inoubliable. L'équipe a su honorer nos traditions tout en sublimant la salle d'une beauté à couper le souffle.",
      en: 'An unforgettable henna night. The team honoured our traditions while elevating the hall to breathtaking beauty.',
      ar: 'ليلة حنّة لا تُنسى. أكرم الفريق تقاليدنا مع جمال يخطف الأنفاس.',
    },
  },
  {
    id: 't5',
    clientName: 'Groupe Méditel',
    venueSlug: 'la-salle',
    rating: 5,
    date: '2025-11-08',
    eventType: { fr: 'Gala corporate', en: 'Corporate gala', ar: 'حفل مؤسسي' },
    quote: {
      fr: "Un gala de 400 convives orchestré à la perfection. Cadre somptueux, service impeccable : nos partenaires étaient conquis.",
      en: 'A 400-guest gala orchestrated to perfection. A sumptuous setting and impeccable service — our partners were won over.',
      ar: 'حفل من 400 ضيف نُظّم بإتقان. إطار فخم وخدمة لا تشوبها شائبة.',
    },
  },
]
