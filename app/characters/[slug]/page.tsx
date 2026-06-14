import { allCharacters, getCharacterBySlug } from '@/lib/characters';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CharacterDetailClient from '@/components/CharacterDetailClient';

const BASE_URL = 'https://compass-wiki.vercel.app';

export function generateStaticParams() {
  return allCharacters.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharacterBySlug(slug);
  if (!c) return {};
  const title = `${c.superName} (${c.privateName})`;
  const description = `${c.superName} is a ${c.type} in the Compass World universe. Powers: ${c.powers}. Team: ${c.team}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/characters/${slug}`,
      images: [{ url: c.img, alt: c.superName }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [c.img] },
  };
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCharacterBySlug(slug);
  if (!c) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: c.superName,
    alternateName: c.privateName,
    description: `${c.superName} is a ${c.type} in the Compass World universe. Powers: ${c.powers}.`,
    image: `${BASE_URL}${c.img}`,
    url: `${BASE_URL}/characters/${slug}`,
    memberOf: { '@type': 'Organization', name: c.team },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CharacterDetailClient c={c} />
    </>
  );
}
