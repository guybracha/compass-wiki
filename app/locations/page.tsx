'use client';
import { useEffect, useRef } from 'react';
import { locations, regionGroups } from '@/lib/locations';

const typeColors: Record<string, string> = {
  City: '#38bdf8', Underground: '#6b7280', Fortress: '#d97706',
  Headquarters: '#fbbf24', Landmark: '#a78bfa', 'Sacred Site': '#34d399',
  Kingdom: '#60a5fa', Sanctuary: '#f472b6', 'Island Nation': '#22d3ee',
};

export default function LocationsPage() {
  const grouped = regionGroups.map(region => ({
    region,
    locs: locations.filter(l => l.region === region),
  })).filter(g => g.locs.length > 0);

  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header
        if (headerRef.current) {
          gsap.fromTo(headerRef.current.children,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }
          );
        }

        // Hero banner zoom-in
        if (heroRef.current) {
          const img = heroRef.current.querySelector('img');
          const text = heroRef.current.querySelector('[data-hero-text]');
          if (img) gsap.fromTo(img,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.2 }
          );
          if (text) gsap.fromTo(text,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 }
          );
        }

        // Location groups + cards stagger on scroll
        if (bodyRef.current) {
          const groups = bodyRef.current.querySelectorAll('[data-group]');
          groups.forEach(group => {
            const heading = group.querySelector('[data-heading]');
            const cards = group.querySelectorAll('[data-card]');

            if (heading) {
              gsap.fromTo(heading,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out',
                  scrollTrigger: { trigger: heading, start: 'top 88%', once: true } }
              );
            }
            if (cards.length) {
              gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
                  scrollTrigger: { trigger: cards[0], start: 'top 88%', once: true } }
              );
            }
          });
        }
      });
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div ref={headerRef} className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2" style={{ opacity: 0 }}>Atlas</h1>
        <p className="text-gray-400" style={{ opacity: 0 }}>A collection of significant locations across the Compass World — from hidden underground kingdoms to floating island nations.</p>
      </div>

      <div ref={heroRef} className="relative h-48 rounded-2xl overflow-hidden mb-10">
        <img src="/contents/locations/negev.jpg" alt="Compass World Atlas" className="w-full h-full object-cover" style={{ opacity: 0 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
        <div data-hero-text className="absolute inset-0 flex items-center px-8" style={{ opacity: 0 }}>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>Known World</p>
            <p className="text-white text-2xl font-black">{locations.length} recorded locations</p>
          </div>
        </div>
      </div>

      <div ref={bodyRef}>
        {grouped.map(group => (
          <div key={group.region} data-group className="mb-10">
            <div data-heading className="flex items-center gap-3 mb-5" style={{ opacity: 0 }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{group.region}</h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.locs.map(loc => (
                <div key={loc.id} data-card className="glass overflow-hidden hover:bg-white/6 transition-colors" style={{ opacity: 0 }}>
                  <div className="relative h-44">
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: (typeColors[loc.type] || '#fbbf24') + '33', color: typeColors[loc.type] || '#fbbf24' }}
                      >
                        {loc.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-2">{loc.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{loc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
