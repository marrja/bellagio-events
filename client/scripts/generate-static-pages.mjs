// Post-build: generate per-route static HTML shells from dist/index.html.
// Each shell gets route-specific <head> (title/description/OG/canonical/
// hreflang), a LocalBusiness JSON-LD block, and a lightweight pre-rendered
// <main> (eyebrow + H1 + intro + nav) inside #root so non-JS and AI crawlers
// see real content + internal links. React (createRoot) replaces #root on
// load, so the fallback is crawler-facing only. Runs via `npm run build`.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SITE = 'https://bellagio-events-tn.com'
const DIST = path.resolve('dist')

const HALL_IMG = `${SITE}/venue/hall/hall-aisle-1600.webp`
const KOSHA_IMG = `${SITE}/venue/hall/hall-kosha-1600.webp`
const GARDEN_IMG = `${SITE}/venue/jardin/pool-day-1600.webp`

// LocalBusiness identity served in every shell — keep in sync with
// src/lib/jsonld.ts (address/geo to be enriched once confirmed).
const LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: "Bellagio Event's",
  description:
    "Deux espaces d'exception pour vos mariages, fiançailles et célébrations en Tunisie.",
  url: SITE,
  telephone: '+216 52 359 900',
  email: 'bellagioclub.events@gmail.com',
  image: HALL_IMG,
  priceRange: '$$$',
  address: { '@type': 'PostalAddress', addressCountry: 'TN', addressLocality: 'Tunis' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: ['https://www.instagram.com/bellagio.events/', 'https://www.facebook.com/bellagioevents'],
}

/** Route table — keep titles/descriptions in sync with each page's <Seo>. */
const ROUTES = [
  { path: '/', nav: 'Accueil', h1: "Bellagio Event's", title: "Bellagio Event's — Salle de Mariage & Événements en Tunisie", description: "Deux espaces d'exception — une salle de lumière et un jardin sous les étoiles — pour vos mariages, fiançailles et célébrations.", image: HALL_IMG },
  { path: '/nos-espaces', nav: 'Nos espaces', h1: "Nos deux espaces d'exception", title: "Nos espaces — Bellagio Event's", description: "Deux lieux d'exception : La Salle Bellagio (intérieur) et Le Jardin Bellagio (extérieur).", image: HALL_IMG },
  { path: '/espaces/la-salle', nav: 'La Salle', h1: 'La Salle Bellagio', title: "La Salle Bellagio — Bellagio Event's", description: "Jusqu'à 500 invités · 1 200 m² · kosha d'honneur, voiles de lumière et lustres en cristal.", image: KOSHA_IMG },
  { path: '/espaces/le-jardin', nav: 'Le Jardin', h1: 'Le Jardin Bellagio', title: "Le Jardin Bellagio — Bellagio Event's", description: "Jusqu'à 600 invités · 8 000 m² · cérémonies sous les étoiles et ciel de guirlandes lumineuses.", image: GARDEN_IMG },
  { path: '/formules', nav: 'Formules', h1: 'Nos formules', title: "Nos Formules — Bellagio Event's", description: 'De la location simple au tout-inclus Prestige.', image: HALL_IMG },
  { path: '/evenements', nav: 'Événements', h1: "Types d'événements", title: "Types d'événements — Bellagio Event's", description: 'Mariages, fiançailles, soirées de henné, galas et événements dans nos deux espaces.', image: KOSHA_IMG },
  { path: '/galerie', nav: 'Galerie', h1: 'Galerie photos & vidéos', title: "Galerie Photos & Vidéos — Bellagio Event's", description: 'Découvrez nos espaces en images.', image: KOSHA_IMG },
  { path: '/a-propos', nav: 'À propos', h1: "À propos de Bellagio Event's", title: "À propos — Bellagio Event's", description: "Un lieu pensé pour l'événement d'exception en Tunisie.", image: HALL_IMG },
  { path: '/faq', nav: 'FAQ', h1: 'Questions fréquentes', title: "FAQ — Bellagio Event's", description: 'Réponses aux questions fréquentes sur la réservation, les tarifs et la logistique.', image: HALL_IMG },
  { path: '/contact', nav: 'Contact', h1: 'Contactez-nous', title: "Contactez-nous — Bellagio Event's", description: 'Réservez une visite ou faites une demande de devis.', image: HALL_IMG },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const urlPath = (p) => (p === '/' ? '/' : `${p}/`)

function headExtras(route) {
  const canonical = `${SITE}${urlPath(route.path)}`
  return [
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="fr" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${canonical}?lang=en" />`,
    `<link rel="alternate" hreflang="ar" href="${canonical}?lang=ar" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<script type="application/ld+json">${JSON.stringify(LOCAL_BUSINESS)}</script>`,
  ].join('\n    ')
}

// Crawler-visible content placed inside #root; React replaces it on mount.
function fallbackMain(route) {
  const nav = ROUTES.map(
    (r) =>
      `<a href="${urlPath(r.path)}" style="color:#9a7b3f;text-decoration:none;margin:0 9px;white-space:nowrap">${esc(r.nav)}</a>`,
  ).join('')
  return (
    `<main style="max-width:760px;margin:14vh auto;padding:0 24px;text-align:center;font-family:Georgia,'Times New Roman',serif;color:#2b241a">` +
    `<p style="letter-spacing:.22em;text-transform:uppercase;font-size:.7rem;color:#9a7b3f">Bellagio Event's</p>` +
    `<h1 style="font-weight:300;font-size:2.2rem;line-height:1.2;margin:.45em 0">${esc(route.h1)}</h1>` +
    `<p style="color:#6b6256;line-height:1.7;font-size:1.05rem">${esc(route.description)}</p>` +
    `<nav style="margin-top:2rem;font-size:.85rem;line-height:2.2">${nav}</nav>` +
    `</main>`
  )
}

function patchHtml(template, route) {
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${esc(route.image)}$2`)
  html = html.replace('</head>', `    ${headExtras(route)}\n  </head>`)
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${fallbackMain(route)}</div>`)
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
