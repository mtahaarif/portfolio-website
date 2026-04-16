# Muhammad Taha Portfolio Website

Modern Next.js portfolio site with:
1. Golden cinematic theme and animated background particles
2. CMS-backed content management (Vercel Postgres)
3. ATS/SEO-oriented project content and structured sections

## Tech Stack

1. Next.js 14 (App Router)
2. TypeScript
3. Tailwind CSS
4. Framer Motion
5. Vercel Postgres client (`@vercel/postgres`)

## Key Routes

1. `/` - Main portfolio website
2. `/cms` - JSON CMS admin editor
3. `/api/cms/content` - CMS content API (GET/PUT)

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Create `.env.local` with required environment variables

```env
POSTGRES_URL=...
POSTGRES_PRISMA_URL=...
CMS_ADMIN_TOKEN=your_secret_token_optional
```

3. Start development server

```bash
npm run dev
```

4. Open the app

```text
http://localhost:3000
http://localhost:3000/cms
```

## CMS Workflow

1. Open `/cms`
2. Paste `CMS_ADMIN_TOKEN` if token protection is enabled
3. Edit JSON content
4. Click `Save to DB`
5. Reload `/` to see updates

The API creates `cms_content` table automatically and seeds default content if empty.

## Scripts

1. `npm run dev` - Start development server
2. `npm run build` - Production build + type/lint checks
3. `npm run start` - Run production server
4. `npm run lint` - Lint checks
5. `npm run resume:pdf` - Generate resume PDF artifact