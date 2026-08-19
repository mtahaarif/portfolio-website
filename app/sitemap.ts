import type { MetadataRoute } from 'next';
import { siteUrl } from './data/site';

// Single-page site: the sections are anchors on "/", listed individually so
// search engines surface the section links directly.
const sections: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/#about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/#experience', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/#projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/#skills', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/#resume', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/#contact', changeFrequency: 'monthly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sections.map(({ path, changeFrequency, priority }) => ({
    url: siteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
