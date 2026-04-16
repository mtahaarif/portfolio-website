import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { cmsDefaults, type PortfolioCMSData } from '@/app/data/cms';

export const dynamic = 'force-dynamic';

const CONTENT_KEY = 'portfolio-main-content';

function canWrite(request: Request): boolean {
  const token = process.env.CMS_ADMIN_TOKEN;
  if (!token) {
    return true;
  }
  return request.headers.get('x-cms-token') === token;
}

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS cms_content (
      id SERIAL PRIMARY KEY,
      content_key TEXT UNIQUE NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

function coerceContent(raw: unknown): PortfolioCMSData {
  if (!raw || typeof raw !== 'object') {
    return cmsDefaults;
  }

  const incoming = raw as Partial<PortfolioCMSData>;
  return {
    profile: { ...cmsDefaults.profile, ...(incoming.profile ?? {}) },
    proofPoints:
      Array.isArray(incoming.proofPoints) && incoming.proofPoints.length > 0
        ? incoming.proofPoints
        : cmsDefaults.proofPoints,
    experiences:
      Array.isArray(incoming.experiences) && incoming.experiences.length > 0
        ? incoming.experiences
        : cmsDefaults.experiences,
    projectCategories:
      Array.isArray(incoming.projectCategories) && incoming.projectCategories.length > 0
        ? incoming.projectCategories
        : cmsDefaults.projectCategories,
    skillGroups:
      Array.isArray(incoming.skillGroups) && incoming.skillGroups.length > 0
        ? incoming.skillGroups
        : cmsDefaults.skillGroups,
    certifications:
      Array.isArray(incoming.certifications) && incoming.certifications.length > 0
        ? incoming.certifications
        : cmsDefaults.certifications,
  };
}

async function getOrCreateCmsContent() {
  await ensureTable();

  const { rows } = await sql`
    SELECT content
    FROM cms_content
    WHERE content_key = ${CONTENT_KEY}
    LIMIT 1;
  `;

  if (rows.length === 0) {
    const seed = JSON.stringify(cmsDefaults);
    await sql`
      INSERT INTO cms_content (content_key, content)
      VALUES (${CONTENT_KEY}, CAST(${seed} AS jsonb));
    `;
    return cmsDefaults;
  }

  const value = rows[0]?.content;
  const parsed = typeof value === 'string' ? JSON.parse(value) : value;
  return coerceContent(parsed);
}

export async function GET() {
  try {
    const content = await getOrCreateCmsContent();
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error('CMS GET failed', error);
    return NextResponse.json(
      {
        ok: false,
        content: cmsDefaults,
        warning:
          'Falling back to local content because Vercel database is not configured. Set POSTGRES_URL and POSTGRES_PRISMA_URL to enable CMS storage.',
      },
      { status: 200 }
    );
  }
}

export async function PUT(request: Request) {
  if (!canWrite(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { content?: unknown };
    const content = coerceContent(body.content);

    await ensureTable();

    const payload = JSON.stringify(content);
    await sql`
      INSERT INTO cms_content (content_key, content)
      VALUES (${CONTENT_KEY}, CAST(${payload} AS jsonb))
      ON CONFLICT (content_key)
      DO UPDATE SET content = EXCLUDED.content, updated_at = NOW();
    `;

    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error('CMS PUT failed', error);
    return NextResponse.json(
      {
        ok: false,
        error:
          'Could not save CMS data. Verify your Vercel Postgres environment variables and payload JSON format.',
      },
      { status: 500 }
    );
  }
}
