import { eventsCatalog } from '@/lib/events';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EventDetailClient from '@/components/EventDetailClient';

const BASE_URL = 'https://compass-wiki.vercel.app';

export function generateStaticParams() {
  return eventsCatalog.map(e => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const ev = eventsCatalog.find(e => e.id === id);
  if (!ev) return {};
  const description = `${ev.title} — ${ev.prelude.slice(0, 140)}…`;
  return {
    title: ev.title,
    description,
    openGraph: {
      title: ev.title,
      description,
      url: `${BASE_URL}/events/${id}`,
      images: [{ url: ev.banner, alt: ev.title }],
    },
    twitter: { card: 'summary_large_image', title: ev.title, description, images: [ev.banner] },
  };
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ev = eventsCatalog.find(e => e.id === id);
  if (!ev) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ev.title,
    description: ev.prelude.slice(0, 200),
    image: `${BASE_URL}${ev.banner}`,
    url: `${BASE_URL}/events/${id}`,
    author: { '@type': 'Person', name: 'Guy Bracha' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EventDetailClient ev={ev} />
    </>
  );
}
