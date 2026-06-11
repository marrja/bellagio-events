import type { Testimonial } from './types'

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Yasmine & Karim',
    venueSlug: 'la-grande-salle',
    rating: 5,
    date: '2025-09-14',
    eventType: { fr: 'Mariage', en: 'Wedding', ar: 'زفاف' },
    quote: {
      fr: "La Grande Salle a dépassé tous nos rêves. La lumière bleue, le mur d'images, l'équipe : nos 480 invités en parlent encore. Une soirée inoubliable.",
      en: 'The Grand Hall surpassed all our dreams. The blue light, the video wall, the team — our 480 guests are still talking about it. An unforgettable evening.',
      ar: 'فاقت القاعة الكبرى كل أحلامنا. الإضاءة الزرقاء والفريق — أمسية لا تُنسى.',
    },
  },
  {
    id: 't2',
    clientName: 'Groupe Méditel',
    venueSlug: 'la-grande-salle',
    rating: 5,
    date: '2025-06-02',
    eventType: { fr: 'Lancement corporate', en: 'Corporate launch', ar: 'إطلاق مؤسسي' },
    quote: {
      fr: "Production impeccable pour le lancement de notre gamme. La régie technique et le son L-Acoustics ont fait toute la différence devant 300 partenaires.",
      en: 'Flawless production for our product launch. The control room and L-Acoustics sound made all the difference in front of 300 partners.',
      ar: 'إنتاج لا تشوبه شائبة لإطلاق منتجنا أمام 300 شريك.',
    },
  },
  {
    id: 't3',
    clientName: 'Leïla & Sami',
    venueSlug: 'le-salon-prive',
    rating: 5,
    date: '2025-04-19',
    eventType: { fr: 'Mariage intime', en: 'Intimate wedding', ar: 'زفاف حميمي' },
    quote: {
      fr: "Nous voulions quelque chose d'intime et raffiné. Le Salon Privé, sa cheminée et sa table en chêne : exactement l'atmosphère dont nous rêvions pour nos 60 proches.",
      en: 'We wanted something intimate and refined. The Private Salon, its fireplace and oak table — exactly the atmosphere we dreamed of for our 60 loved ones.',
      ar: 'أردنا أجواءً حميمية وراقية. الصالون الخاص كان تمامًا ما حلمنا به.',
    },
  },
  {
    id: 't4',
    clientName: 'Nour & Adam',
    venueSlug: 'les-jardins',
    rating: 5,
    date: '2025-07-26',
    eventType: { fr: 'Mariage en plein air', en: 'Garden wedding', ar: 'زفاف في الحديقة' },
    quote: {
      fr: "Se marier sous l'oliveraie centenaire, à l'heure dorée, avec la grille LED qui s'allume au crépuscule… Les Jardins ont offert une magie que rien n'égale.",
      en: 'Getting married under the century-old olive grove at golden hour, with the LED grid lighting up at dusk… the Gardens offered unmatched magic.',
      ar: 'الزواج تحت بستان الزيتون العتيق عند الغروب… سحر لا يضاهى.',
    },
  },
  {
    id: 't5',
    clientName: 'Fondation Espoir',
    venueSlug: 'la-grande-salle',
    rating: 5,
    date: '2025-11-08',
    eventType: { fr: 'Gala caritatif', en: 'Charity gala', ar: 'حفل خيري' },
    quote: {
      fr: "Un gala de 450 convives orchestré à la perfection. L'équipe Bellagio a anticipé chaque besoin. Notre collecte a battu tous les records.",
      en: 'A 450-guest gala orchestrated to perfection. The Bellagio team anticipated every need. Our fundraising broke every record.',
      ar: 'حفل من 450 ضيفًا نُظّم بإتقان. توقّع فريق بيلاجيو كل احتياجاتنا.',
    },
  },
]
