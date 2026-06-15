'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { allCharacters, Character } from '@/lib/characters';

const categories = ['All', 'Heroes', 'Villains', 'Compass Alliance', 'Solo', 'Prime-Children'];
const categoryColors: Record<string, string> = {
  Combat: '#ef4444', Cosmic: '#a855f7', Energy: '#facc15', Physical: '#f97316',
  Radiation: '#84cc16', Water: '#38bdf8', Tech: '#60a5fa', Shadow: '#6366f1',
  Sonic: '#14b8a6', Magic: '#ec4899', Air: '#94a3b8', Light: '#f59e0b',
  Quantum: '#c084fc', Villain: '#dc2626',
};

export default function CharactersPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = allCharacters.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.superName.toLowerCase().includes(q) || c.privateName.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.powers.toLowerCase().includes(q);
    if (!matchSearch) return false;
    if (filter === 'All') return true;
    if (filter === 'Heroes') return c.type === 'hero';
    if (filter === 'Villains') return c.type === 'villain';
    if (filter === 'Compass Alliance') return c.team === 'Compass Alliance';
    if (filter === 'Solo') return c.team === 'Solo';
    if (filter === 'Prime-Children') return c.team === 'Prime-Children';
    return true;
  });

  // Header entrance once
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
      }
      if (filtersRef.current) {
        gsap.fromTo(filtersRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 }
        );
      }
    });
  }, []);

  // Stagger cards on filter / search change
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('[data-card]');
      gsap.fromTo(cards,
        { opacity: 0, scale: 0.88, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, stagger: 0.025, ease: 'back.out(1.3)' }
      );
    });
  }, [filter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div ref={headerRef} className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2" style={{ opacity: 0 }}>Characters</h1>
        <p className="text-gray-400" style={{ opacity: 0 }}>Heroes, villains, and every Prime-Child in the Compass World universe.</p>
      </div>

      <div ref={filtersRef} className="glass p-4 mb-8 flex flex-wrap gap-3 items-center" style={{ opacity: 0 }}>
        <button
          onClick={() => {
            const r = allCharacters[Math.floor(Math.random() * allCharacters.length)];
            router.push(`/characters/${r.slug}`);
          }}
          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
          title="Go to a random character"
        >
          🎲 Random
        </button>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={filter === c
                ? { background: 'var(--accent)', color: '#000' }
                : { background: 'rgba(255,255,255,0.05)', color: '#d1d5db' }
              }>
              {c}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search characters..."
            className="px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none w-48"
            style={{ borderColor: search ? 'var(--accent)' : undefined }}
          />
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-4">{filtered.length} character{filtered.length !== 1 ? 's' : ''}</p>

      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filtered.map(c => (
          <CharacterCard key={c.slug} character={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-3">🔍</p>
          <p>No characters found for "{search}"</p>
        </div>
      )}
    </div>
  );
}

function CharacterCard({ character: c }: { character: Character }) {
  const accentColor = categoryColors[c.category] || '#fbbf24';
  return (
    <Link href={`/characters/${c.slug}`} data-card className="group block" style={{ opacity: 0 }}>
      <div className="rounded-xl overflow-hidden border-2 border-transparent transition-all duration-200 group-hover:scale-105 group-hover:border-white/30">
        <div className="aspect-square bg-gray-900 relative">
          <img src={c.img} alt={`${c.superName} — ${c.category} ${c.type} in Compass World`} className="w-full h-full object-cover object-top"
            onError={e => { (e.target as HTMLImageElement).src = '/character-not-found.svg'; }} />
          {c.type === 'villain' && (
            <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">V</div>
          )}
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <p className="font-bold text-sm text-white group-hover:opacity-80 transition-opacity truncate">{c.superName}</p>
        <p className="text-xs truncate" style={{ color: accentColor }}>{c.category}</p>
        <p className="text-xs text-gray-500 truncate">{c.team}</p>
      </div>
    </Link>
  );
}
