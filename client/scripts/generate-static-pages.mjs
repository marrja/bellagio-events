// Post-build: generate per-route static HTML shells from dist/index.html
// with route-specific <head> metadata (title, description, OG, canonical,
// hreflang). Crawlers and WhatsApp/Facebook scrapers don't execute JS, so
// this is what makes deep links share & index correctly. The app itself
// remains a SPA — React takes over on load.
//   Runs automatically via `npm run build`.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SITE = 'https://bellagioevent.com'
const DIST = path.resolve('dist')

const HALL_IMG = `${SITE}/venue/hall/hall-aisle-1600.webp`
const KOSHA_IMG = `${SITE}/venue/hall/hall-kosha-1600.webp`
const GARDEN_IMG = `${SITE}/venue/jardin/pool-day-1600.webp`

/** Route table — keep titles/descriptions in sync with each page's <Seo>. */
const ROUTES = [
  {
    path: '/',
    title: "Bellagio Event's — Salle de Mariage & Événements en Tunisie",
    description:
      "Deux espaces d'exception — une salle de lumière et un jardin sous les étoiles — pour vos mariages, fiançailles et célébrations.",
    image: HALL_IMG,
  },
  {
    path: '/nos-espaces',
    title: "Nos espaces — Bellagio Event's",
    description:
      "Deux lieux d'exception : La Salle Bellagio (intérieur) et Le Jardin Bellagio (extérieur).",
    image: HALL_IMG,
  },
  {
    path: '/espaces/la-salle',
    title: "La Salle Bellagio — Bellagio Event's",
    description:
      "Jusqu'à 500 invités · 1 200 m² · kosha d'honneur, voiles de lumière et lustres en cristal.",
    image: KOSHA_IMG,
  },
  {
    path: '/espaces/le-jardin',
    title: "Le Jardin Bellagio — Bellagio Event's",
    description:
      "Jusqu'à 600 invités · 8 000 m² · cérémonies sous les étoiles et ciel de guirlandes lumineuses.",
    image: GARDEN_IMG,
  },
  {
    path: '/formules',
    title: "Nos Formules — Bellagio Event's",
    description: 'De la location simple au tout-inclus Prestige.',
    image: HALL_IMG,
  },
  {
    path: '/evenements',
    title: "Types d'événements — Bellagio Event's",
    description:
      'Mariages, fiançailles, soirées de henné, galas et événements dans nos deux espaces.',
    image: KOSHA_IMG,
  },
  {
    path: '/galerie',
    title: "Galerie Photos & Vidéos — Bellagio Event's",
    description: 'Découvrez nos espaces en images.',
    image: KOSHA_IMG,
  },
  {
    path: '/a-propos',
    title: "À propos — Bellagio Event's",
    description: "Un lieu pensé pour l'événement d'exception en Tunisie.",
    image: HALL_IMG,
  },
  {
    path: '/faq',
    title: "FAQ — Bellagio Event's",
    description:
      'Réponses aux questions fréquentes sur la réservation, les tarifs et la logistique.',
    image: HALL_IMG,
  },
  {
    path: '/contact',
    title: "Contactez-nous — Bellagio Event's",
    description: 'Réservez une visite ou faites une demande de devis.',
    image: HALL_IMG,
  },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

function renderHead(route) {
  const canonical = `${SITE}${route.path === '/' ? '/' : route.path}`
  return [
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="fr" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${canonical}?lang=en" />`,
    `<link rel="alternate" hreflang="ar" href="${canonical}?lang=ar" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
  ].join('\n    ')
}

function patchHtml(template, route) {
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(route.description)}$2`,
  )
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${esc(route.title)}$2`,
  )
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${esc(route.description)}$2`,
  )
  html = html.replace(
    /(<meta property="og:image" content=")[^"]*(")/,
    `$1${esc(route.image)}$2`,
  )
  html = html.replace('</head>', `    ${renderHead(route)}\n  </head>`)
  return html
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const html = patchHtml(template, route)
  if (route.path === '/') {
    await writeFile(path.join(DIST, 'index.html'), html)
  } else {
    const dir = path.join(DIST, route.path.slice(1))
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, 'index.html'), html)
  }
  console.log(`✓ ${route.path}`)
}

console.log(`\nGenerated ${ROUTES.length} static shells.`)
