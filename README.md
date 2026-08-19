# Muhammad Taha Portfolio Website

Single-page Next.js portfolio: golden cinematic theme, scroll-driven card stacks,
and ATS/SEO-oriented project content.

## Tech Stack

1. Next.js 16 (App Router, Turbopack)
2. React 19 — the page is a Server Component; only interactive pieces ship as JS
3. TypeScript
4. Tailwind CSS
5. lucide-react (icons)

No animation library. Every scroll-driven effect runs on one shared,
rAF-coalesced scroll loop in [`app/lib/motion.ts`](app/lib/motion.ts) that writes
directly to `element.style` — React renders the page once and is not involved in
any frame.

## Routes

1. `/` — the portfolio (statically prerendered)
2. `/robots.txt`, `/sitemap.xml` — generated from `SITE_URL` in
   [`app/data/site.ts`](app/data/site.ts)

## Editing content

All content lives in [`app/data/cms.ts`](app/data/cms.ts) — profile, proof
points, experience, projects, skill groups, and certifications. Edit that file
and rebuild; there is no database and no admin UI.

The former `/cms` JSON editor and `/api/cms/content` endpoint were removed. The
endpoint's `PUT` had already been disabled, and its `GET` returned the exact
`cmsDefaults` object the page bundled anyway — so the page paid for the same
content twice and re-rendered its whole tree once the fetch resolved.

## Assets

Project images are plain paths under `public/`, e.g. `image: '/serenity.png'`,
and are rendered as-is. Do not prefix them at runtime.

Certificate cards reserve an image panel and render a styled placeholder while
`image` is unset. To use real scans, drop files into `public/certs/` and
uncomment the `image` line on the matching entry in `cms.ts`.

Not currently in the repo, and therefore not referenced by `app/layout.tsx`:
`favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `og-image.png`. Add them and
restore the `icons` block plus the Open Graph image entry.

## Local Setup

```bash
npm install
npm run dev     # http://localhost:3000
```

No environment variables are required.

## Scripts

1. `npm run dev` — development server
2. `npm run build` — production build with type checking
3. `npm run start` — production server
4. `npm run lint` — ESLint
