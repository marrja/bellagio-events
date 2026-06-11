# BELLAGIO EVENT'S — Website

Official website for **BELLAGIO EVENT'S**, a premium wedding and events venue
in Tunisia. Three distinct venue spaces, trilingual (FR · AR · EN), built on
the **"Diamond Glow"** design system — electric blue, champagne gold and deep
black, with the diamond gem motif throughout.

> **Status:** Front-end (React SPA) is complete and self-contained. The Payload
> CMS + Express API layer is intentionally deferred — see [CMS](#cms-deferred).

## Tech stack

- **React 18 + TypeScript**, scaffolded with **Vite**
- **React Router v6** (`createBrowserRouter`, nested layout via `<Outlet>`)
- **Tailwind CSS v3** + CSS custom properties for brand tokens
- **Framer Motion** — page transitions, scroll reveals, hover states
- **React Hook Form patterns + Zod** validation for the enquiry wizard
- **Zustand** — enquiry builder + language state
- **react-i18next** — FR (default) / EN / AR with RTL support
- **react-helmet-async** — per-page SEO + JSON-LD structured data
- **Plausible** analytics snippet (privacy-first, no cookie banner)

## Getting started

```bash
cd client
npm install
cp .env.example .env   # optional: configure VITE_API_BASE, VITE_CLOUDINARY_CLOUD
npm run dev            # http://localhost:5173
```

From the repo root you can also run `npm run dev` / `npm run build`
(npm workspace → `client`).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

## Project structure

```
client/src/
  pages/        # route-level components (lazy-loaded)
  components/   # ui · venue · enquiry · layout
  hooks/        # useVenue, useAvailability, useScrollReveal, useL
  store/        # Zustand: enquiryStore, languageStore
  i18n/         # react-i18next setup + fr/en/ar locale files
  lib/          # api (typed fetch), cloudinary, jsonld, enquirySchema
  data/         # seed content (venues, tiers, gallery, faq, testimonials)
  styles/       # Tailwind + brand tokens + fonts
deploy/nginx.conf  # SPA fallback + API/admin reverse proxy
```

## Key design decisions

- **Single API boundary** — all backend calls go through `lib/api.ts`
  (constraint #12). Each endpoint tries the live API, then falls back to the
  embedded seed data in `src/data/`, so the SPA is fully demonstrable while the
  CMS is still being decided.
- **The diamond gem** (`components/ui/GemIcon.tsx`) is a pure SVG with `size`
  and `color` props — used as bullets, section markers, dividers and the hero
  mark on every venue page. Never an image file (constraint #9).
- **Cloudinary** (`lib/cloudinary.ts`) builds transformation URLs; image
  dimensions are never hardcoded in components (constraint #8). Demo seed images
  are absolute URLs and are passed through with sizing params.
- **Code splitting** — every page is `React.lazy()` behind `<Suspense>`; Framer
  Motion and the React vendor bundle are in their own chunks (main < 200 kB gz).
- **SPA deep links** — `_redirects` (Netlify/Coolify) and `deploy/nginx.conf`
  rewrite unknown paths to `index.html` (constraint #11).

## Routes

`/` · `/nos-espaces` · `/espaces/:slug` · `/formules` · `/evenements` ·
`/galerie` · `/a-propos` · `/faq` · `/contact` · `/contact/merci`

Venue slugs: `la-grande-salle`, `le-salon-prive`, `les-jardins`.

## CMS (deferred)

The Payload CMS v3 + Express API (collections for venues, packages, enquiries,
availability, gallery, testimonials, settings; Resend email; admin roles) is
**not yet implemented** — it will be designed in a follow-up. The client is
already wired for it:

- `lib/api.ts` points at `VITE_API_BASE` (`/api`) and degrades gracefully.
- Enquiry submissions return a local reference until the email/CMS pipeline is
  connected.
- `deploy/nginx.conf` already reverse-proxies `/api` and `/admin`.
