import { eventsCatalog } from '@/lib/events';
import { notFound } from 'next/navigation';
import EventDetailClient from '@/components/EventDetailClient';

export function generateStaticParams() {
  return eventsCatalog.map(e => ({ id: e.id }));
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ev = eventsCatalog.find(e => e.id === id);
  if (!ev) notFound();
  return <EventDetailClient ev={ev} />;
}
