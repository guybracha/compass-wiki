import { MetadataRoute } from 'next';
import { allCharacters } from '@/lib/characters';
import { eventsCatalog } from '@/lib/events';

const BASE_URL = 'https://compass-wiki.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/characters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/prime-children`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/timeline`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/locations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ];

  const characterRoutes: MetadataRoute.Sitemap = allCharacters.map(c => ({
    url: `${BASE_URL}/characters/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = eventsCatalog.map(e => ({
    url: `${BASE_URL}/events/${e.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...characterRoutes, ...eventRoutes];
}
