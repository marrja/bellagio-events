import type { Venue } from './types'

// ============================================================
// The two Bellagio spaces — one indoor hall, one outdoor garden.
// French is authoritative; EN/AR power the language switcher.
// Indoor imagery is the venue's real photography (public/venue);
// outdoor + supplemental shots are warm, on-brand stock.
// ============================================================

const U = 'https://images.unsplash.com/'

export const VENUES: Venue[] = [
  {
    slug: 'la-salle',
    accentColor: '#C19A4D', // champagne gold
    capacity: 500,
    area: '1 200 m²',
    fromPrice: 9000,
    isActive: true,
    name: {
      fr: 'La Salle Bellagio',
      en: 'The Bellagio Hall',
      ar: 'قاعة بيلاجيو',
    },
    subtitle: {
      fr: 'Notre grand espace intérieur',
      en: 'Our grand indoor space',
      ar: 'فضاؤنا الداخلي الفخم',
    },
    tagline: {
      fr: 'Une salle de lumière, pensée pour les grands jours.',
      en: 'A hall of light, made for the greatest days.',
      ar: 'قاعة من النور، صُمّمت لأجمل الأيام.',
    },
    ceiling: {
      fr: 'Voiles de lumière & lustres en cristal',
      en: 'Light drapery & crystal chandeliers',
      ar: 'ستائر من الضوء وثريات كريستالية',
    },
    description: [
      {
        fr: "La Salle Bellagio baigne dans une lumière dorée. Sols nacrés, voilages immaculés et milliers de guirlandes lumineuses composent un décor de rêve où chaque mariage devient une scène inoubliable.",
        en: 'The Bellagio Hall is bathed in golden light. Pearled floors, immaculate drapery and thousands of fairy lights create a dreamlike setting where every wedding becomes an unforgettable scene.',
        ar: 'تغمر قاعة بيلاجيو بضوء ذهبي. أرضيات لؤلؤية وستائر ناصعة وآلاف الأضواء المتلألئة تصنع ديكورًا حالمًا.',
      },
      {
        fr: "Au cœur de la salle, la kosha — notre estrade d'honneur — accueille les mariés sous une arche florale illuminée, encadrée de papillons de lumière et d'un ciel étoilé.",
        en: 'At the heart of the hall, the kosha — our stage of honour — welcomes the couple beneath an illuminated floral arch, framed by light butterflies and a starlit backdrop.',
        ar: 'في قلب القاعة، تستقبل الكوشة العروسين تحت قوس زهري مضيء محاط بالفراشات المضيئة وسماء مرصّعة بالنجوم.',
      },
      {
        fr: "Jusqu'à 500 convives y prennent place autour de l'allée centrale en marbre. Mariages, fiançailles, soirées de henné ou galas : la salle se réinvente pour chaque célébration.",
        en: 'Up to 500 guests gather around the central marble aisle. Weddings, engagements, henna nights or galas — the hall reinvents itself for every celebration.',
        ar: 'يتسع لما يصل إلى 500 ضيف حول الممرّ الرخامي المركزي.',
      },
      {
        fr: "Éclairage d'ambiance sur mesure, sonorisation professionnelle, service traiteur d'exception et coordination dédiée : tout est réuni pour que vous ne viviez que l'émotion.",
        en: 'Custom mood lighting, professional sound, exceptional catering and dedicated coordination — everything is in place so you live only the emotion.',
        ar: 'إضاءة مخصّصة وصوتيات احترافية وضيافة استثنائية وتنسيق مخصّص.',
      },
    ],
    heroImage: '/venue/hall/hall-aisle.jpg',
    galleryImages: [
      '/venue/hall/hall-kosha.jpg',
      '/venue/hall/stage-gold.jpg',
      '/venue/hall/banquet-hall.jpg',
      '/venue/hall/table-setting.jpg',
      '/venue/hall/roses-white.jpg',
      '/venue/hall/entrance.jpg',
      '/venue/hall/exterior-night.jpg',
    ],
    features: [
      { fr: "Kosha d'honneur avec arche florale illuminée", en: 'Stage of honour with illuminated floral arch', ar: 'كوشة شرف بقوس زهري مضيء' },
      { fr: 'Voiles de lumière & guirlandes féeriques', en: 'Light drapery & fairy-light canopy', ar: 'ستائر ضوئية وأسقف من الأضواء' },
      { fr: 'Lustres en cristal & éclairage d’ambiance', en: 'Crystal chandeliers & mood lighting', ar: 'ثريات كريستالية وإضاءة أجواء' },
      { fr: 'Allée centrale & sols nacrés', en: 'Central aisle & pearled floors', ar: 'ممرّ مركزي وأرضيات لؤلؤية' },
      { fr: 'Papillons & décor floral lumineux', en: 'Illuminated butterflies & floral décor', ar: 'فراشات مضيئة وديكور زهري' },
      { fr: 'Sonorisation & régie professionnelles', en: 'Professional sound & control room', ar: 'صوتيات وغرفة تحكم احترافية' },
      { fr: 'Salon des mariés & espace réception', en: 'Bridal lounge & reception area', ar: 'صالة العروسين ومنطقة استقبال' },
      { fr: 'Stationnement & voiturier', en: 'Parking & valet service', ar: 'موقف سيارات وخدمة صفّ' },
    ],
    events: [
      { name: { fr: 'Mariages', en: 'Weddings', ar: 'حفلات الزفاف' }, description: { fr: "Cérémonie et réception jusqu'à 500 invités, kosha d'honneur incluse.", en: 'Ceremony and reception up to 500 guests, stage of honour included.', ar: 'حفل واستقبال حتى 500 ضيف مع كوشة الشرف.' } },
      { name: { fr: 'Fiançailles', en: 'Engagements', ar: 'الخطوبة' }, description: { fr: 'Célébrations de demande et soirées de fiançailles raffinées.', en: 'Proposal celebrations and refined engagement evenings.', ar: 'احتفالات الخطبة وأمسيات راقية.' } },
      { name: { fr: 'Soirées de henné', en: 'Henna Nights', ar: 'ليالي الحنّة' }, description: { fr: 'Traditions et festivités dans un décor scénographié.', en: 'Traditions and festivities in a styled setting.', ar: 'تقاليد واحتفالات في ديكور مميّز.' } },
      { name: { fr: 'Dîners de gala', en: 'Gala Dinners', ar: 'حفلات العشاء' }, description: { fr: 'Galas, soirées de récompenses et dîners de prestige.', en: 'Galas, awards evenings and prestige dinners.', ar: 'حفلات وأمسيات جوائز وعشاءات فاخرة.' } },
      { name: { fr: 'Événements corporate', en: 'Corporate Events', ar: 'فعاليات الشركات' }, description: { fr: 'Conférences, lancements et soirées d’entreprise.', en: 'Conferences, launches and company evenings.', ar: 'مؤتمرات وإطلاقات وأمسيات الشركات.' } },
      { name: { fr: 'Anniversaires & célébrations', en: 'Birthdays & Celebrations', ar: 'أعياد واحتفالات' }, description: { fr: 'Grandes fêtes privées et anniversaires d’exception.', en: 'Large private parties and exceptional birthdays.', ar: 'حفلات خاصة كبرى وأعياد ميلاد استثنائية.' } },
    ],
  },
  {
    slug: 'le-jardin',
    accentColor: '#7C8B5A', // olive / sage green
    capacity: 600,
    area: '8 000 m²',
    fromPrice: 7500,
    isActive: true,
    name: {
      fr: 'Le Jardin Bellagio',
      en: 'The Bellagio Garden',
      ar: 'حديقة بيلاجيو',
    },
    subtitle: {
      fr: 'Notre grand espace extérieur',
      en: 'Our grand outdoor space',
      ar: 'فضاؤنا الخارجي الفسيح',
    },
    tagline: {
      fr: 'Sous les étoiles et les guirlandes, la fête à ciel ouvert.',
      en: 'Beneath stars and string lights, a celebration under open sky.',
      ar: 'تحت النجوم والأضواء، احتفال في الهواء الطلق.',
    },
    ceiling: {
      fr: 'Ciel ouvert & chapiteau disponible',
      en: 'Open sky & marquee available',
      ar: 'سماء مفتوحة وخيمة متاحة',
    },
    description: [
      {
        fr: "Le Jardin Bellagio prolonge la magie en plein air. Sur des jardins paysagers, les guirlandes lumineuses dessinent un ciel scintillant au-dessus de vos invités, à l'heure dorée comme à la nuit tombée.",
        en: 'The Bellagio Garden carries the magic outdoors. Across landscaped grounds, string lights draw a shimmering sky above your guests, at golden hour and after dark.',
        ar: 'تمدّ حديقة بيلاجيو السحر إلى الهواء الطلق، حيث ترسم الأضواء سماءً متلألئة فوق ضيوفك.',
      },
      {
        fr: "Cérémonies sous arche florale, dîners aux longues tablées, cocktails au crépuscule : l'espace se compose au gré de vos envies, jusqu'à 600 convives.",
        en: 'Ceremonies under a floral arch, long-table dinners, sundown cocktails — the space adapts to your wishes, for up to 600 guests.',
        ar: 'حفلات تحت قوس زهري وعشاءات على طاولات طويلة وكوكتيلات عند الغروب حتى 600 ضيف.',
      },
      {
        fr: "Un chapiteau élégant peut être installé pour conjuguer le charme de l'extérieur au confort de l'intérieur, quelle que soit la saison.",
        en: 'An elegant marquee can be installed to pair the charm of the outdoors with indoor comfort, in any season.',
        ar: 'يمكن تركيب خيمة أنيقة تجمع سحر الخارج وراحة الداخل في كل الفصول.',
      },
      {
        fr: "Éclairage féerique, scénographie florale et service complet : le Jardin offre un décor naturel sublimé, dans la continuité de l'élégance Bellagio.",
        en: 'Fairy lighting, floral scenography and full service: the Garden offers a heightened natural setting, in keeping with Bellagio elegance.',
        ar: 'إضاءة ساحرة وتنسيق زهري وخدمة كاملة في امتداد أناقة بيلاجيو.',
      },
    ],
    heroImage: `${U}photo-1519741497674-611481863552?auto=format&fit=crop`,
    galleryImages: [
      `${U}photo-1507504031003-b417219a0fde?auto=format&fit=crop`,
      `${U}photo-1467810563316-b5476525c0f9?auto=format&fit=crop`,
      `${U}photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop`,
      `${U}photo-1519225421980-715cb0215aed?auto=format&fit=crop`,
    ],
    features: [
      { fr: 'Jardins paysagers jusqu’à 600 invités', en: 'Landscaped grounds for up to 600 guests', ar: 'حدائق منسّقة حتى 600 ضيف' },
      { fr: 'Ciel de guirlandes lumineuses', en: 'Canopy of string lights', ar: 'سماء من الأضواء المعلّقة' },
      { fr: 'Arche florale de cérémonie', en: 'Floral ceremony arch', ar: 'قوس زهري للحفل' },
      { fr: 'Chapiteau élégant disponible', en: 'Elegant marquee available', ar: 'خيمة أنيقة متاحة' },
      { fr: 'Longues tablées & espace cocktail', en: 'Long tables & cocktail area', ar: 'طاولات طويلة ومنطقة كوكتيل' },
      { fr: 'Éclairage d’ambiance extérieur', en: 'Outdoor mood lighting', ar: 'إضاءة أجواء خارجية' },
      { fr: 'Cuisine & service traiteur sur site', en: 'On-site kitchen & catering', ar: 'مطبخ وخدمة ضيافة في الموقع' },
      { fr: 'Stationnement spacieux', en: 'Ample parking', ar: 'موقف سيارات واسع' },
    ],
    events: [
      { name: { fr: 'Mariages en plein air', en: 'Garden Weddings', ar: 'حفلات الزفاف في الحديقة' }, description: { fr: 'Cérémonie et réception sous les étoiles et les guirlandes.', en: 'Ceremony and reception under stars and string lights.', ar: 'حفل واستقبال تحت النجوم والأضواء.' } },
      { name: { fr: 'Cocktails au crépuscule', en: 'Sundown Cocktails', ar: 'كوكتيلات الغروب' }, description: { fr: "Réceptions à l'heure dorée sur les jardins.", en: 'Golden-hour receptions on the grounds.', ar: 'حفلات استقبال عند الغروب في الحدائق.' } },
      { name: { fr: 'Dîners sous chapiteau', en: 'Marquee Dinners', ar: 'عشاءات تحت الخيمة' }, description: { fr: 'Grandes tablées élégantes à l’abri du chapiteau.', en: 'Grand elegant tables under the marquee.', ar: 'طاولات أنيقة كبيرة تحت الخيمة.' } },
      { name: { fr: 'Fiançailles & henné', en: 'Engagements & Henna', ar: 'خطوبة وحنّة' }, description: { fr: 'Traditions célébrées au grand air.', en: 'Traditions celebrated in the open air.', ar: 'تقاليد تُحتفل بها في الهواء الطلق.' } },
      { name: { fr: 'Festivals & grandes fêtes', en: 'Festivals & Large Parties', ar: 'مهرجانات وحفلات كبرى' }, description: { fr: 'Événements à grande échelle dans un cadre naturel.', en: 'Large-scale events in a natural setting.', ar: 'فعاليات كبرى في إطار طبيعي.' } },
      { name: { fr: "Pique-niques d'entreprise", en: 'Corporate Picnics', ar: 'نزهات الشركات' }, description: { fr: 'Team buildings et activations de marque en extérieur.', en: 'Team building and brand activations outdoors.', ar: 'فعاليات الفرق وتنشيط العلامات في الخارج.' } },
    ],
  },
]

export const getVenueBySlug = (slug: string): Venue | undefined =>
  VENUES.find((v) => v.slug === slug)
