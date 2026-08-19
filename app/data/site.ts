// Single source of truth for the public origin.
//
// Every canonical, Open Graph, Twitter, JSON-LD, and sitemap URL derives from
// this constant. Do not hardcode the host anywhere else — the site previously
// shipped a stale preview domain across five separate metadata fields.
export const SITE_URL = 'https://taha-portfolio-website.vercel.app';

/** Absolute URL for a site-relative path, e.g. siteUrl('/profile.jpg'). */
export const siteUrl = (path = ''): string => `${SITE_URL}${path}`;
