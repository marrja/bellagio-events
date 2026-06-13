# BELLAGIO EVENT'S — Website

Official website for **BELLAGIO EVENT'S**, a premium wedding and events venue
in Tunisia, with two spaces: **La Salle Bellagio** (grand indoor hall) and
**Le Jardin Bellagio** (outdoor garden). Trilingual (FR · AR · EN, RTL-aware),
built on the **"Champagne & Light"** design system — luminous ivory and
champagne gold with dramatic starlit dark sections, matching the venue's real
photography (fairy lights, crystal, the kosha, the gold BB-diamond monogram).

> **Status:** Front-end (React SPA) — complete and self-contained.
> The CMS / backend layer is intentionally deferred; the client degrades
> gracefully (see [Backend](#backend-deferred)).

## Tech stack

- **React 18 + TypeScript**, Vite
- **React Router v6** (`createBrowserRouter`, nested layout via `<Outlet>`)
- **Tailwind CSS v3** + CSS custom properties for brand tokens
- **Framer Motion** — hero word-reveals, scroll-linked parallax, transitions
- **Lenis** — momentum smooth-scrolling (reduced-motion aware)
- **Zod** validation, **Zustand** enquiry state
- **react-i18next** — FR (default) / EN / AR with RTL + Arabic fonts (Amiri, Tajawal)
- **react-helmet-async** — per-page SEO, JSON-LD, hreflang
- **Plausible** analytics (+ custom events: `Enquiry`, `WhatsApp Click`, `Call Click`)

## Getting started

```bash
cd client
npm install
npm run dev            # http://localhost:5173
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check + build + generate per-route static shells |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `node scripts/optimize-images.mjs` | Regenerate responsive WebP + LQIP from venue photos |

## Key design decisions

- **Single API boundary** — all backend calls go through `lib/api.ts`
  (deduped + 5-min cached). Each endpoint tries the live API, then falls
  back to embedded seed content in `src/data/`, so the SPA runs standalone.
- **Honest contact pipeline** — with no backend, the enquiry wizard delivers
  via **WhatsApp** (prefilled message, `lib/contact.ts`) instead of faking a
  server submission. A floating WhatsApp/call button is on every page.
- **Two translation layers, on purpose** — `i18n/locales/*.json` (via `t()`)
  hold static UI chrome; `Localized {fr,en,ar}` objects in `src/data/` (via
  `useL()`) hold content that the future CMS will deliver in the same shape.
- **Images** — venue photography ships as pre-generated responsive WebP with
  base64 LQIP blur-up (`scripts/optimize-images.mjs` → `data/lqip.ts`);
  `lib/cloudinary.ts` resolves local refs, Unsplash URLs and Cloudinary IDs.
  Heroes are prioritized `<img>`s with `srcset` + preload.
- **SEO without SSR** — `scripts/generate-static-pages.mjs` writes a static
  HTML shell per route (title/description/OG/canonical/hreflang) so non-JS
  scrapers (WhatsApp, Facebook, Google) see correct metadata; the SPA takes
  over on load. Language travels via `?lang=` and is preserved on share.
- **Dates** — ISO strings are built from local date parts (never
  `toISOString()`), avoiding the UTC+1 off-by-one for Tunisia.

## Routes

`/` · `/nos-espaces` · `/espaces/la-salle` · `/espaces/le-jardin` ·
`/formules` · `/evenements` · `/galerie` · `/a-propos` · `/faq` ·
`/contact` · `/contact/merci`

## Deployment

Static SPA: serve `client/dist/` with directory-index resolution and an
SPA fallback — `deploy/nginx.conf` (`try_files $uri $uri/ /index.html`)
or Netlify-style hosting (`public/_redirects`). The generated per-route
`index.html` shells must be served for their paths (both configs do).

## Backend (deferred)

The CMS/API (venues, pricing, enquiries, availability, gallery,
testimonials; confirmation emails; admin roles) is not yet implemented.
The client is wired for it: `lib/api.ts` targets `VITE_API_BASE` (`/api`)
and `deploy/nginx.conf` already reverse-proxies `/api` and `/admin`.

## Before launch — content owner checklist

- Replace placeholder **prices** (TND figures in `src/data/tiers.ts` /
  `venues.ts` are illustrative, not the venue's real rates)
- Replace placeholder **testimonials** (`src/data/testimonials.ts`)
- Confirm **open bar vs. alcohol-free** wording in the SAVEUR tier & FAQ
- Provide the real **logo** as SVG (current crest is a typographic stand-in)
- Add real **garden photography** (outdoor imagery is stock)
