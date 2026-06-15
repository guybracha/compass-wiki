'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { WikiEvent } from '@/lib/events';
import { allCharacters } from '@/lib/characters';
import { AutoLink } from '@/lib/autoLink';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function EventDetailClient({ ev }: { ev: WikiEvent }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const participantsRef = useRef<HTMLDivElement>(null);

  const knownParticipants = ev.participants
    .map(name => allCharacters.find(c => c.superName === name))
    .filter(Boolean);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Banner zoom + text slide
        if (bannerRef.current) {
          const img = bannerRef.current.querySelector('img');
          const text = bannerRef.current.querySelector('[data-banner-text]');
          if (img) gsap.fromTo(img,
            { scale: 1.12, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }
          );
          if (text) gsap.fromTo(text,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 }
          );
        }

        // Meta strip
        if (metaRef.current) {
          gsap.fromTo(metaRef.current.children,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.6 }
          );
        }

        // Narrative sections stagger on scroll
        if (narrativeRef.current) {
          const sections = narrativeRef.current.querySelectorAll('[data-section]');
          sections.forEach((s, i) => {
            gsap.fromTo(s,
              { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
              {
                opacity: 1, x: 0, duration: 0.55, ease: 'power2.out',
                scrollTrigger: { trigger: s, start: 'top 88%', once: true },
              }
            );
          });
        }

        // Participants bubble in
        if (participantsRef.current) {
          const chips = participantsRef.current.querySelectorAll('[data-chip]');
          gsap.fromTo(chips,
            { opacity: 0, scale: 0.7 },
            {
              opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: 'back.out(1.5)',
              scrollTrigger: { trigger: participantsRef.current, start: 'top 88%', once: true },
            }
          );
        }
      });
    });
  }, [ev.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: ev.title },
      ]} />

      {/* Banner */}
      <div ref={bannerRef} className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-8">
        <img src={ev.banner} alt={ev.title} className="w-full h-full object-cover" style={{ opacity: 0 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent" />
        <div data-banner-text className="absolute bottom-6 left-6 right-6" style={{ opacity: 0 }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--accent)' }}>{ev.date}</p>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{ev.title}</h1>
        </div>
      </div>

      {/* Metadata strip */}
      <div ref={metaRef} className="glass p-4 mb-8 grid sm:grid-cols-2 gap-3 text-sm">
        {([
          ['Location', ev.location],
          ['Result', ev.result],
          ...(ev.items.length > 0 ? [['Key Items', ev.items.join(', ')]] : []),
          ['Participants', `${ev.participants.length} characters`],
        ] as [string, string][]).map(([k, v]) => (
          <div key={k} style={{ opacity: 0 }}>
            <span className="text-gray-500">{k}</span>
            <p className="text-gray-200 font-medium">{v}</p>
          </div>
        ))}
      </div>

      {/* Narrative */}
      <div ref={narrativeRef} className="space-y-6 mb-10">
        {[
          { label: 'Prelude', text: ev.prelude, color: '#60a5fa', icon: '📖' },
          { label: 'The Clash', text: ev.clash, color: '#f97316', icon: '⚔️' },
          { label: 'Aftermath', text: ev.aftermath, color: '#34d399', icon: '🌅' },
        ].map(s => (
          <div key={s.label} data-section className="glass p-6" style={{ opacity: 0 }}>
            <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: s.color }}>
              <span>{s.icon}</span> {s.label}
            </h2>
            <p className="text-gray-300 leading-relaxed"><AutoLink text={s.text} /></p>
          </div>
        ))}
      </div>

      {/* Participants */}
      <div ref={participantsRef} className="glass p-6">
        <h2 className="text-lg font-bold mb-4 border-b border-white/10 pb-2" style={{ color: 'var(--accent)' }}>
          Participants ({ev.participants.length})
        </h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {knownParticipants.map(p => p && (
            <Link key={p.slug} data-chip href={`/characters/${p.slug}`}
              className="flex items-center gap-2 glass px-3 py-1.5 hover:bg-white/10 transition-colors"
              style={{ opacity: 0 }}>
              <img src={p.img} alt={p.superName} className="w-6 h-6 rounded-full object-cover object-top" />
              <span className="text-xs text-gray-200">{p.superName}</span>
            </Link>
          ))}
        </div>
        {ev.participants.filter(n => !allCharacters.find(c => c.superName === n)).length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Also appearing:</p>
            <p className="text-xs text-gray-400">
              {ev.participants.filter(n => !allCharacters.find(c => c.superName === n)).join(', ')}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <Link href="/events" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>← Back to Events</Link>
      </div>
    </div>
  );
}
