import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return [
        { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: `${site.url}/akce`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${site.url}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ];
}
