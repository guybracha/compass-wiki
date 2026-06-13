import { allCharacters, getCharacterBySlug } from '@/lib/characters';
import { notFound } from 'next/navigation';
import CharacterDetailClient from '@/components/CharacterDetailClient';

export function generateStaticParams() {
  return allCharacters.map(c => ({ slug: c.slug }));
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCharacterBySlug(slug);
  if (!c) notFound();
  return <CharacterDetailClient c={c} />;
}
