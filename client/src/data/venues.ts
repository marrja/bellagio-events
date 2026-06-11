import type { Venue } from './types'

// ============================================================
// The three venues — seeded content with real trilingual copy.
// French is authoritative; EN/AR provided for the language switcher.
// Image references are demo photographs; in production these become
// Cloudinary public IDs resolved through lib/cloudinary.ts.
// ============================================================

const U = 'https://images.unsplash.com/'

export const VENUES: Venue[] = [
  {
    slug: 'la-grande-salle',
    accentColor: '#1E82FF',
    capacity: 500,
    area: '1 200 m²',
    fromPrice: 12000,
    isActive: true,
    name: {
      fr: 'La Grande Salle',
      en: 'The Grand Hall',
      ar: 'القاعة الكبرى',
    },
    subtitle: {
      fr: 'Grand espace intérieur',
      en: 'Grand indoor space',
      ar: 'فضاء داخلي فخم',
    },
    tagline: {
      fr: 'Là où les grandes occasions trouvent leur scène.',
      en: 'Where grand occasions find their stage.',
      ar: 'حيث تجد المناسبات الكبرى مسرحها.',
    },
    ceiling: {
      fr: 'Plafond voûté de 9 m',
      en: '9 m arched ceiling',
      ar: 'سقف مقوّس بارتفاع 9 أمتار',
    },
    description: [
      {
        fr: "Avec ses 1 200 m² et son plafond voûté culminant à 9 mètres, La Grande Salle est l'écrin des célébrations sans compromis. L'architecture contemporaine y dialogue avec une lumière LED bleue qui sculpte chaque volume.",
        en: 'At 1,200 m² beneath a 9-metre arched ceiling, the Grand Hall is the setting for celebrations without compromise. Contemporary architecture meets blue LED light that sculpts every volume.',
        ar: 'بمساحة 1200 متر مربع وسقف مقوّس يبلغ ارتفاعه 9 أمتار، تُعد القاعة الكبرى إطارًا للاحتفالات دون أي تنازل.',
      },
      {
        fr: "Jusqu'à 500 invités y prennent place pour un mariage de prestige, un gala caritatif ou un lancement de marque. La scène modulable et le mur d'images 4K transforment chaque événement en spectacle.",
        en: 'Up to 500 guests gather here for a prestige wedding, a charity gala or a brand launch. A modular stage and 4K video wall turn every event into a performance.',
        ar: 'يتسع لما يصل إلى 500 ضيف لحفل زفاف فاخر أو حفل خيري أو إطلاق علامة تجارية.',
      },
      {
        fr: 'Le système son L-Acoustics, les lustres programmables et la régie technique intégrée garantissent une production digne des plus grandes scènes. Tout est pensé pour la fluidité du déroulé.',
        en: 'An L-Acoustics sound system, programmable chandeliers and an integrated control room deliver production worthy of the biggest stages. Everything is built for a seamless flow.',
        ar: 'نظام صوت L-Acoustics والثريات القابلة للبرمجة وغرفة التحكم المدمجة تضمن إنتاجًا يليق بأكبر المسارح.',
      },
      {
        fr: "Suite nuptiale privée, loges d'artistes, cuisine de production de 120 m² et voiturier pour 300 véhicules : la logistique se fait invisible pour que seule la fête demeure.",
        en: 'A private bridal suite, green rooms, a 120 m² production kitchen and valet parking for 300 vehicles: the logistics disappear so that only the celebration remains.',
        ar: 'جناح عرائس خاص وغرف للفنانين ومطبخ إنتاج بمساحة 120 مترًا مربعًا وخدمة صفّ 300 سيارة.',
      },
    ],
    heroImage: `${U}photo-1464366400600-7168b8af9bc3?auto=format&fit=crop`,
    galleryImages: [
      `${U}photo-1519167758481-83f550bb49b3?auto=format&fit=crop`,
      `${U}photo-1505236858219-8359eb29e329?auto=format&fit=crop`,
      `${U}photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop`,
      `${U}photo-1540317580384-e5d43616b9aa?auto=format&fit=crop`,
    ],
    features: [
      { fr: "Mur d'images LED 4K (3 écrans)", en: '4K LED wall system (3 screens)', ar: 'جدار شاشات LED بدقة 4K (3 شاشات)' },
      { fr: 'Lustres programmables + éclairage périmétrique', en: 'Programmable chandelier + perimeter lighting', ar: 'ثريات قابلة للبرمجة وإضاءة محيطية' },
      { fr: 'Système son professionnel (L-Acoustics)', en: 'Professional sound system (L-Acoustics)', ar: 'نظام صوت احترافي (L-Acoustics)' },
      { fr: 'Suite nuptiale privée + 2 loges', en: 'Private bridal suite + 2 green rooms', ar: 'جناح عرائس خاص + غرفتان للفنانين' },
      { fr: 'Cuisine de production de 120 m²', en: '120 m² catering prep kitchen', ar: 'مطبخ تحضير بمساحة 120 م²' },
      { fr: 'Voiturier — 300 véhicules', en: 'Valet parking — 300 vehicles', ar: 'خدمة صفّ السيارات — 300 سيارة' },
      { fr: 'Monte-charge dédié', en: 'Dedicated freight elevator', ar: 'مصعد بضائع مخصّص' },
      { fr: 'Points de levage certifiés 500 kg', en: 'Rigging points rated at 500 kg', ar: 'نقاط تعليق معتمدة حتى 500 كغ' },
    ],
    events: [
      { name: { fr: 'Grands mariages', en: 'Grand Weddings', ar: 'حفلات الزفاف الكبرى' }, description: { fr: "Cérémonies complètes jusqu'à 500 personnes, mise en scène d'allée, sonorisation intégrale.", en: 'Full ceremonies up to 500 pax, aisle staging, full sound.', ar: 'حفلات كاملة حتى 500 شخص مع مسرح وصوت متكامل.' } },
      { name: { fr: 'Dîners de gala', en: 'Gala Dinners', ar: 'حفلات العشاء' }, description: { fr: 'Galas caritatifs, soirées de récompenses et dîners de prestige en format banquet.', en: 'Banquet-style fundraisers, charity events, awards evenings.', ar: 'حفلات خيرية وأمسيات جوائز على شكل مأدبة.' } },
      { name: { fr: 'Événements corporate', en: 'Corporate Events', ar: 'فعاليات الشركات' }, description: { fr: 'Lancements de produits, conférences, assemblées générales et activations de marque.', en: 'Product launches, conferences, AGMs, brand activations.', ar: 'إطلاق منتجات ومؤتمرات وجمعيات عامة.' } },
      { name: { fr: 'Défilés de mode', en: 'Fashion Shows', ar: 'عروض الأزياء' }, description: { fr: 'Podium avec backstage, grills d’éclairage et carré VIP.', en: 'Runway with backstage, lighting rigs, VIP seating.', ar: 'منصة عرض مع كواليس وإضاءة ومقاعد كبار الشخصيات.' } },
      { name: { fr: 'Cérémonies de remise de prix', en: 'Award Ceremonies', ar: 'حفلات توزيع الجوائز' }, description: { fr: 'Production scénique, audiovisuel, green rooms et réception VIP.', en: 'Stage production, AV, green rooms, VIP reception.', ar: 'إنتاج مسرحي وصوتيات ومرئيات واستقبال VIP.' } },
      { name: { fr: 'Galas culturels', en: 'Cultural Galas', ar: 'الأمسيات الثقافية' }, description: { fr: 'Concerts, performances, projections et expositions.', en: 'Concerts, performances, film screenings, exhibitions.', ar: 'حفلات موسيقية وعروض وأفلام ومعارض.' } },
    ],
  },
  {
    slug: 'le-salon-prive',
    accentColor: '#C8A864',
    capacity: 80,
    area: '280 m²',
    fromPrice: 4500,
    isActive: true,
    name: {
      fr: 'Le Salon Privé',
      en: 'The Private Salon',
      ar: 'الصالون الخاص',
    },
    subtitle: {
      fr: 'Espace intérieur intime',
      en: 'Intimate indoor space',
      ar: 'فضاء داخلي حميمي',
    },
    tagline: {
      fr: "Là où l'intimité devient le luxe.",
      en: 'Where intimacy is the luxury.',
      ar: 'حيث تصبح الخصوصية رفاهية.',
    },
    ceiling: {
      fr: 'Plafond de 4,5 m à corniches moulurées',
      en: '4.5 m ceiling with moulded cornicing',
      ar: 'سقف بارتفاع 4.5 م بحوافّ مزخرفة',
    },
    description: [
      {
        fr: "Le Salon Privé cultive l'art du détail. Sur 280 m², ses parquets d'origine, sa cheminée en fonctionnement et ses corniches moulurées composent un décor où chaque convive se sent unique.",
        en: 'The Private Salon is an exercise in detail. Across 280 m², original hardwood floors, a working fireplace and moulded cornicing create a setting where every guest feels singular.',
        ar: 'يعتني الصالون الخاص بأدقّ التفاصيل على مساحة 280 مترًا مربعًا.',
      },
      {
        fr: "Jusqu'à 80 invités s'y réunissent pour un mariage intime, un dîner d'exception ou une célébration confidentielle. La table en chêne sur mesure accueille 40 convives en un seul élan.",
        en: 'Up to 80 guests gather for an intimate wedding, an exceptional dinner or a confidential celebration. The bespoke oak table seats 40 in a single sweep.',
        ar: 'يتسع لما يصل إلى 80 ضيفًا لحفل زفاف حميمي أو عشاء استثنائي.',
      },
      {
        fr: "Le coin bar dédié, l'éclairage à intensité variable et le système Sonos installent une atmosphère feutrée, modulable au gré des moments de la soirée.",
        en: 'A dedicated bar corner, dimmable lighting and a Sonos system set a hushed atmosphere that shifts with the moments of the evening.',
        ar: 'ركن بار مخصّص وإضاءة قابلة للتعديل ونظام Sonos يخلق أجواءً هادئة.',
      },
      {
        fr: "Une entrée privée de plain-pied et une terrasse de 40 m² ouverte sur le jardin prolongent l'expérience à l'air libre, en toute discrétion.",
        en: 'A private street-level entrance and a 40 m² terrace opening onto the garden extend the experience outdoors, in complete privacy.',
        ar: 'مدخل خاص وشرفة بمساحة 40 م² تطلّ على الحديقة.',
      },
    ],
    heroImage: `${U}photo-1414235077428-338989a2e8c0?auto=format&fit=crop`,
    galleryImages: [
      `${U}photo-1519671482749-fd09be7ccebf?auto=format&fit=crop`,
      `${U}photo-1592861956120-e524fc739696?auto=format&fit=crop`,
      `${U}photo-1530103862676-de8c9debad1d?auto=format&fit=crop`,
      `${U}photo-1555244162-803834f70033?auto=format&fit=crop`,
    ],
    features: [
      { fr: "Parquets d'origine + cheminée en fonctionnement", en: 'Original hardwood floors & working fireplace', ar: 'أرضيات خشبية أصلية ومدفأة عاملة' },
      { fr: 'Table en chêne sur mesure (40 convives)', en: 'Bespoke oak long-table (seats 40)', ar: 'طاولة بلوط مصنوعة خصيصًا (40 مقعدًا)' },
      { fr: "Coin bar avec présentoir d'alcools complet", en: 'Bar corner with full spirits display', ar: 'ركن بار مع عرض كامل للمشروبات' },
      { fr: 'Terrasse privée avec accès jardin (40 m²)', en: 'Private terrace with garden access (40 m²)', ar: 'شرفة خاصة مع منفذ إلى الحديقة (40 م²)' },
      { fr: 'Entrée privée de plain-pied', en: 'Private street-level entrance', ar: 'مدخل خاص بمستوى الأرض' },
      { fr: 'Système son Sonos commercial', en: 'Sonos commercial sound system', ar: 'نظام صوت Sonos التجاري' },
      { fr: 'Suspensions à intensité variable', en: 'Dimmable pendant lighting', ar: 'إضاءة معلّقة قابلة للتعتيم' },
      { fr: 'Office traiteur + petite cuisine', en: 'Staging pantry + small kitchen', ar: 'غرفة تجهيز + مطبخ صغير' },
    ],
    events: [
      { name: { fr: 'Mariages intimes', en: 'Intimate Weddings', ar: 'حفلات الزفاف الحميمية' }, description: { fr: 'Micro-cérémonies, élopements et unions civiles.', en: 'Micro-ceremonies, elopements, civil unions.', ar: 'حفلات صغيرة وزيجات مدنية.' } },
      { name: { fr: 'Fiançailles', en: 'Engagement Parties', ar: 'حفلات الخطوبة' }, description: { fr: 'Cocktails stylés et célébrations de demande.', en: 'Styled cocktail events, proposal celebrations.', ar: 'حفلات كوكتيل أنيقة واحتفالات الخطبة.' } },
      { name: { fr: 'Dîners privés', en: 'Private Dinners', ar: 'العشاءات الخاصة' }, description: { fr: "Table du chef, accords mets-vins, longues tablées.", en: "Chef's table, wine pairing, long-table evenings.", ar: 'طاولة الشيف وأمسيات الطاولات الطويلة.' } },
      { name: { fr: 'Cocktails', en: 'Cocktail Events', ar: 'حفلات الكوكتيل' }, description: { fr: 'Réceptions debout, lancements et networking.', en: 'Standing receptions, brand launches, networking.', ar: 'حفلات استقبال وإطلاق علامات وتواصل.' } },
      { name: { fr: 'Célébrations privées', en: 'Bridal Celebrations', ar: 'احتفالات خاصة' }, description: { fr: 'Baby showers, EVJF et fêtes confidentielles.', en: 'Baby showers, bridal showers, hen parties.', ar: 'حفلات استقبال المولود وحفلات العرائس.' } },
      { name: { fr: "Séminaires d'entreprise", en: 'Corporate Retreats', ar: 'لقاءات الشركات' }, description: { fr: "Dîners de conseil, off-sites de direction, réunions VIP.", en: 'Board dinners, executive off-sites, VIP meetings.', ar: 'عشاءات مجلس الإدارة واجتماعات VIP.' } },
    ],
  },
  {
    slug: 'les-jardins',
    accentColor: '#5AC878',
    capacity: 600,
    area: '8 000 m²',
    fromPrice: 9000,
    isActive: true,
    name: {
      fr: 'Les Jardins',
      en: 'The Gardens',
      ar: 'الحدائق',
    },
    subtitle: {
      fr: 'Grand espace extérieur',
      en: 'Grand outdoor space',
      ar: 'فضاء خارجي فسيح',
    },
    tagline: {
      fr: 'Là où la nature devient le décor.',
      en: 'Where nature becomes the décor.',
      ar: 'حيث تصبح الطبيعة هي الديكور.',
    },
    ceiling: {
      fr: 'Ciel ouvert — infrastructure de chapiteau permanente',
      en: 'Open sky — permanent marquee infrastructure',
      ar: 'سماء مفتوحة — بنية خيمة دائمة',
    },
    description: [
      {
        fr: "Sur 8 000 m² de terrain paysager, Les Jardins offrent à vos célébrations l'immensité du ciel tunisien. L'oliveraie centenaire et l'arche florale patrimoniale composent un décor vivant.",
        en: 'Across 8,000 m² of landscaped grounds, the Gardens offer your celebrations the vastness of the Tunisian sky. A century-old olive grove and heritage floral arch form a living backdrop.',
        ar: 'على مساحة 8000 متر مربع من الأرض المنسّقة، تمنح الحدائق احتفالاتك اتّساع السماء التونسية.',
      },
      {
        fr: "Jusqu'à 600 invités célèbrent sous les étoiles : mariage en plein air, gala sous chapiteau ou cocktail au coucher du soleil sur la terrasse panoramique.",
        en: 'Up to 600 guests celebrate under the stars: an open-air wedding, a marquee gala or a sundown cocktail on the panoramic terrace.',
        ar: 'يحتفل ما يصل إلى 600 ضيف تحت النجوم في الهواء الطلق.',
      },
      {
        fr: 'La grille LED de pleine périphérie et le système de brumisation transforment chaque heure de la soirée, de la lumière dorée à la nuit bleutée.',
        en: 'A full-perimeter LED grid and a misting system transform each hour of the evening, from golden light to blue-tinted night.',
        ar: 'شبكة إضاءة LED محيطية ونظام رذاذ تبرّد الأجواء.',
      },
      {
        fr: "Le chapiteau modulable jusqu'à 600 personnes, l'infrastructure électrique 200A et la cuisine extérieure dédiée garantissent un événement sans limite, quelle que soit la saison.",
        en: 'A modular marquee for up to 600, 200A electrical infrastructure and a dedicated outdoor kitchen guarantee a limitless event, whatever the season.',
        ar: 'خيمة قابلة للتعديل حتى 600 شخص وبنية كهربائية 200 أمبير ومطبخ خارجي مخصّص.',
      },
    ],
    heroImage: `${U}photo-1464047736614-af63643285bf?auto=format&fit=crop`,
    galleryImages: [
      `${U}photo-1507504031003-b417219a0fde?auto=format&fit=crop`,
      `${U}photo-1513151233558-d860c5398176?auto=format&fit=crop`,
      `${U}photo-1467810563316-b5476525c0f9?auto=format&fit=crop`,
      `${U}photo-1519225421980-715cb0215aed?auto=format&fit=crop`,
    ],
    features: [
      { fr: 'Arche florale patrimoniale + pelouse de cérémonie (400 m²)', en: 'Heritage floral arch + ceremony lawn (400 m²)', ar: 'قوس زهري تراثي + مرج للحفلات (400 م²)' },
      { fr: 'Oliveraie ancienne (60 arbres, 200+ ans)', en: 'Ancient olive grove (60 trees, 200+ years)', ar: 'بستان زيتون عتيق (60 شجرة، أكثر من 200 عام)' },
      { fr: 'Terrasse surélevée avec vue panoramique', en: 'Elevated terrace with panoramic views', ar: 'شرفة مرتفعة بإطلالة بانورامية' },
      { fr: 'Grille LED de pleine périphérie', en: 'Full-perimeter LED lighting grid', ar: 'شبكة إضاءة LED محيطية كاملة' },
      { fr: 'Infrastructure électrique permanente 200A', en: '200A permanent electrical infrastructure', ar: 'بنية كهربائية دائمة 200 أمبير' },
      { fr: "Système de chapiteau disponible (jusqu'à 600 pax)", en: 'Marquee system available (up to 600 pax)', ar: 'نظام خيمة متاح (حتى 600 شخص)' },
      { fr: "Système de brumisation pour l'été", en: 'Climate misting system for summer', ar: 'نظام رذاذ تبريد للصيف' },
      { fr: 'Cuisine extérieure sur site', en: 'On-site outdoor catering kitchen', ar: 'مطبخ خارجي في الموقع' },
    ],
    events: [
      { name: { fr: 'Mariages en plein air', en: 'Garden Weddings', ar: 'حفلات الزفاف في الحديقة' }, description: { fr: 'Cérémonie et réception sous les étoiles.', en: 'Outdoor ceremony + reception under the stars.', ar: 'حفل واستقبال تحت النجوم.' } },
      { name: { fr: 'Galas en extérieur', en: 'Outdoor Galas', ar: 'الحفلات الخارجية' }, description: { fr: 'Événements formels de grande ampleur sous chapiteau.', en: 'Large-scale formal events under marquee.', ar: 'فعاليات رسمية كبرى تحت الخيمة.' } },
      { name: { fr: 'Cocktails au crépuscule', en: 'Sundown Cocktails', ar: 'كوكتيلات الغروب' }, description: { fr: "Réceptions sur terrasse à l'heure dorée.", en: 'Terrace receptions, golden-hour gatherings.', ar: 'حفلات استقبال على الشرفة عند الغروب.' } },
      { name: { fr: 'Festivals', en: 'Festival Events', ar: 'المهرجانات' }, description: { fr: 'Multi-scènes, festivals culturels, expériences de marque.', en: 'Multi-stage, cultural festivals, brand experiences.', ar: 'مهرجانات متعددة المسارح وتجارب العلامات.' } },
      { name: { fr: 'Dîners patrimoniaux', en: 'Heritage Dinners', ar: 'عشاءات تراثية' }, description: { fr: "Longues tablées sous l'oliveraie.", en: 'Long-table evenings under the olive grove.', ar: 'أمسيات طاولات طويلة تحت أشجار الزيتون.' } },
      { name: { fr: "Pique-niques d'entreprise", en: 'Corporate Picnics', ar: 'نزهات الشركات' }, description: { fr: 'Team buildings, activations de marque, célébrations BBQ.', en: 'Team events, brand activations, BBQ celebrations.', ar: 'فعاليات الفرق وحفلات الشواء.' } },
    ],
  },
]

export const getVenueBySlug = (slug: string): Venue | undefined =>
  VENUES.find((v) => v.slug === slug)
