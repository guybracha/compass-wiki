'use client';
import { useState, useEffect, useRef } from 'react';
import { galleryItems, galleryTags } from '@/lib/gallery';

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState('all');
  const [search, setSearch] = useState('');
  const [lightbox, setLightbox] = useState<null | { src: string; title: string; caption: string }>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filtered = galleryItems.filter(item => {
    const matchTag = activeTag === 'all' || item.tags.includes(activeTag);
    const q = search.toLowerCase();
    const matchSearch = !q || item.title.toLowerCase().includes(q) || item.caption.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });

  // Page entrance
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: -18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
      }
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
        );
      }
      if (filtersRef.current) {
        gsap.fromTo(filtersRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.35 }
        );
      }
    });
  }, []);

  // Stagger grid on filter change
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('[data-card]');
      gsap.fromTo(cards,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, stagger: 0.018, ease: 'back.out(1.2)' }
      );
    });
  }, [activeTag, search]);

  // Lightbox open animation
  useEffect(() => {
    if (!lightbox || !lightboxRef.current) return;
    import('gsap').then(({ gsap }) => {
      gsap.fromTo(lightboxRef.current!.querySelector('[data-panel]'),
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' }
      );
    });
  }, [lightbox]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div ref={headerRef} className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2" style={{ opacity: 0 }}>Gallery</h1>
        <p className="text-gray-400" style={{ opacity: 0 }}>Posters, key art, and concept explorations from the Compass World.</p>
      </div>

      <div ref={featuredRef} className="relative h-56 rounded-2xl overflow-hidden mb-8" style={{ opacity: 0 }}>
        <img src="/contents/gallery/UniteCol-min.webp" alt="Compass Alliance" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
      </div>

      <div ref={filtersRef} className="glass p-4 mb-6 flex flex-wrap gap-2 items-center" style={{ opacity: 0 }}>
        {galleryTags.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors"
            style={activeTag === tag
              ? { background: 'var(--accent)', color: '#000' }
              : { background: 'rgba(255,255,255,0.05)', color: '#d1d5db' }
            }>
            {tag}
          </button>
        ))}
        <div className="ml-auto">
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none w-40" />
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-4">{filtered.length} artwork{filtered.length !== 1 ? 's' : ''}</p>

      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((item, i) => (
          <button key={i} data-card
            className="group text-left glass overflow-hidden hover:ring-2 transition-all focus:outline-none"
            style={{ opacity: 0, ['--tw-ring-color' as string]: 'var(--accent)' }}
            onClick={() => setLightbox({ src: item.src, title: item.title, caption: item.caption })}
          >
            <div className="aspect-square overflow-hidden">
              <img src={item.src} alt={`${item.title}${item.caption ? ' — ' + item.caption : ''} | Compass World artwork`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => { (e.target as HTMLImageElement).src = '/character-not-found.svg'; }} />
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold text-white truncate">{item.title}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.slice(0, 2).map(t => (
                  <span key={t} className="text-xs text-gray-500 capitalize">{t}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-3">🎨</p>
          <p>No artworks found</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(null)}
        >
          <div data-panel className="max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title}
              className="w-full rounded-xl max-h-[75vh] object-contain" />
            <div className="mt-3 text-center">
              <p className="text-white font-bold text-lg">{lightbox.title}</p>
              {lightbox.caption && <p className="text-gray-400 text-sm mt-1">{lightbox.caption}</p>}
            </div>
            <button className="absolute -top-10 right-0 text-white text-2xl hover:opacity-70 transition-opacity"
              onClick={() => setLightbox(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
