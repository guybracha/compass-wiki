'use client';
import { useState, useEffect, useRef } from 'react';
import { primeChildren, primeTags, PrimeChild } from '@/lib/primeChildren';

const tagColors: Record<string, string> = {
  Prime: '#a78bfa', Tech: '#60a5fa', Mystic: '#c084fc', Elemental: '#34d399',
  Cosmic: '#e879f9', Dark: '#6b7280', Legendary: '#fbbf24', Science: '#38bdf8',
  Undersea: '#06b6d4',
};

export default function PrimeChildrenPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [activeSide, setActiveSide] = useState<'All' | 'Hero' | 'Villain'>('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PrimeChild | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const filtered = primeChildren.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.power.toLowerCase().includes(q);
    const matchTag = activeTag === 'All' || activeTag === 'Hero' || activeTag === 'Villain'
      ? (activeTag === 'All' ? true : c.side === activeTag)
      : c.tags.includes(activeTag);
    const matchSide = activeSide === 'All' || c.side === activeSide;
    return matchSearch && matchTag && matchSide;
  });

  // GSAP: header entrance
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  // GSAP: stats counter animation
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll('[data-count]');
        counters.forEach(el => {
          const target = Number((el as HTMLElement).dataset.count);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.2,
            ease: 'power1.out',
            onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
          });
        });
      }
    });
  }, []);

  // GSAP: grid cards stagger on filter change
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('[data-card]');
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.025, ease: 'back.out(1.2)' }
      );
    });
  }, [filtered.length, activeTag, activeSide, search]);

  const heroCount = primeChildren.filter(c => c.side === 'Hero').length;
  const villainCount = primeChildren.filter(c => c.side === 'Villain').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div ref={headerRef} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-black text-white">Prime-Children</h1>
          <span className="px-2 py-0.5 text-xs font-bold rounded uppercase" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
            Classified Archive
          </span>
        </div>
        <p className="text-gray-400 max-w-2xl">
          A new generation of humans who emerged during the 2020 pandemic with extraordinary abilities. Registered, monitored, and catalogued by the Interguard.
        </p>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Total Registered', count: primeChildren.length, color: 'var(--accent)' },
          { label: 'Allied', count: heroCount, color: '#34d399' },
          { label: 'Rogue / Hostile', count: villainCount, color: '#f87171' },
        ].map(s => (
          <div key={s.label} className="glass p-4 text-center">
            <p className="text-3xl font-black" style={{ color: s.color }}>
              <span data-count={s.count}>0</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass p-4 mb-6 flex flex-wrap gap-2 items-center">
        <div className="flex gap-2 mr-3">
          {(['All', 'Hero', 'Villain'] as const).map(s => (
            <button key={s}
              onClick={() => setActiveSide(s)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
              style={activeSide === s
                ? { background: s === 'Hero' ? '#34d399' : s === 'Villain' ? '#f87171' : 'var(--accent)', color: '#000' }
                : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }
              }
            >
              {s}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-white/10" />
        <div className="flex flex-wrap gap-1.5">
          {primeTags.filter(t => !['All', 'Hero', 'Villain'].includes(t)).map(tag => (
            <button key={tag}
              onClick={() => setActiveTag(activeTag === tag ? 'All' : tag)}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
              style={activeTag === tag
                ? { background: tagColors[tag] || 'var(--accent)', color: '#000' }
                : { background: 'rgba(255,255,255,0.04)', color: tagColors[tag] || '#9ca3af', border: `1px solid ${tagColors[tag] || '#333'}44` }
              }
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none w-36"
            style={{ outlineColor: 'var(--accent)' }}
          />
        </div>
      </div>

      <p className="text-gray-500 text-xs mb-4">{filtered.length} prime-children found</p>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filtered.map(c => (
          <button
            key={c.slug}
            data-card
            onClick={() => setSelected(c)}
            className="group text-left rounded-xl overflow-hidden border-2 border-transparent transition-all hover:scale-105 focus:outline-none"
            style={{ '--hover': c.side === 'Hero' ? '#34d399' : '#f87171' } as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = c.side === 'Hero' ? '#34d39966' : '#f8717166'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'transparent'}
          >
            <div className="bg-gray-900 aspect-square relative">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover object-top"
                onError={e => { (e.target as HTMLImageElement).src = '/character-not-found.svg'; }} />
              {c.side === 'Villain' && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </div>
            <div className="p-1.5" style={{ background: 'rgba(20,20,20,0.9)' }}>
              <p className="text-xs font-bold text-white truncate leading-tight">{c.name}</p>
              <p className="text-xs text-gray-500 truncate">{c.power}</p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm">No Prime-Children found</p>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <PrimeModal child={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function PrimeModal({ child: c, onClose }: { child: PrimeChild; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0, scale: 0.93, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }
        );
      }
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="glass max-w-sm w-full rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="relative h-48">
          <img src={c.img} alt={c.name} className="w-full h-full object-cover object-top"
            onError={e => { (e.target as HTMLImageElement).src = '/character-not-found.svg'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black/80">✕</button>
          <div className="absolute bottom-3 left-4">
            <span className="text-xs font-bold px-2 py-0.5 rounded mr-2"
              style={{ background: c.side === 'Hero' ? '#34d39922' : '#f8717122', color: c.side === 'Hero' ? '#34d399' : '#f87171', border: `1px solid ${c.side === 'Hero' ? '#34d39966' : '#f8717166'}` }}>
              {c.side}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-black text-white mb-1">{c.name}</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>{c.power}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {c.tags.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: (tagColors[t] || '#888') + '22', color: tagColors[t] || '#888', border: `1px solid ${tagColors[t] || '#888'}44` }}>
                {t}
              </span>
            ))}
          </div>

          {/* Profile data */}
          {c.primeSync && (
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Prime Sync</span>
                  <span className="font-bold text-white">{c.primeSync}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.primeSync}%`, background: 'var(--accent)' }} />
                </div>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Fragment: </span>
                <span className="text-gray-300">{c.inheritedFragment}</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Loyalty: </span>
                <span className="font-bold"
                  style={{ color: c.loyalty === 'Alliance' ? '#34d399' : c.loyalty === 'Rogue' ? '#f87171' : '#fbbf24' }}>
                  {c.loyalty}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
