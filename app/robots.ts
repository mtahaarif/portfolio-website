import type { MetadataRoute } from 'next';
import { SITE_URL, siteUrl } from './data/site';

// Generated from SITE_URL rather than shipped as a static public/robots.txt,
// so the host can never drift out of sync with the site metadata.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: siteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
