'use client';
import { useEffect, useRef } from 'react';
import { eventsCatalog } from '@/lib/events';
import Link from 'next/link';

export default function EventsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (headerRef.current) {
          gsap.fromTo(headerRef.current.children,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
          );
        }

        if (gridRef.current) {
          const cards = gridRef.current.querySelectorAll('[data-card]');
          gsap.fromTo(cards,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2,
              scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
            }
          );
        }
      });
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div ref={headerRef} className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2" style={{ opacity: 0 }}>Event Archive</h1>
        <p className="text-gray-400" style={{ opacity: 0 }}>Mission logs, cinematic events, and key battles from the Compass Alliance archives.</p>
      </div>

      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventsCatalog.map(ev => (
          <Link
            key={ev.id}
            data-card
            href={`/events/${ev.id}`}
            className="glass overflow-hidden group hover:bg-white/8 transition-colors"
            style={{ opacity: 0 }}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={ev.banner}
                alt={ev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{ev.date}</p>
                <h2 className="text-white font-bold text-base leading-tight">{ev.title}</h2>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-400 text-xs flex items-center gap-1 mb-2">
                <span>📍</span> {ev.location}
              </p>
              <p className="text-gray-300 text-xs line-clamp-2">{ev.prelude}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-gray-500">{ev.participants.length} participants</p>
                <span className="text-xs group-hover:underline" style={{ color: 'var(--accent)' }}>Read more →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
