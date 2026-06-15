'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Character, allCharacters } from '@/lib/characters';
import Breadcrumbs from '@/components/Breadcrumbs';

const statLabels = [
  { key: 'strength' as const, label: 'Strength', color: '#ef4444' },
  { key: 'speed' as const, label: 'Speed', color: '#38bdf8' },
  { key: 'intelligence' as const, label: 'Intelligence', color: '#a855f7' },
  { key: 'energy' as const, label: 'Energy', color: '#facc15' },
  { key: 'defense' as const, label: 'Defense', color: '#84cc16' },
];

export default function CharacterDetailClient({ c }: { c: Character }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const relatedAllies = allCharacters.filter(x => c.allies.includes(x.superName));
  const relatedEnemies = allCharacters.filter(x => c.enemies.includes(x.superName));

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();

        // Sidebar slides from right
        if (sidebarRef.current) {
          tl.fromTo(sidebarRef.current,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 0
          );
        }

        // Main header slides from left
        if (mainRef.current) {
          const header = mainRef.current.querySelector('[data-header]');
          if (header) {
            tl.fromTo(header.children,
              { opacity: 0, x: -30 },
              { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.1
            );
          }
        }

        // Bio + sections fade up in sequence
        if (sectionsRef.current) {
          const sections = sectionsRef.current.querySelectorAll('[data-section]');
          sections.forEach((s, i) => {
            gsap.fromTo(s,
              { opacity: 0, y: 24 },
              {
                opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
                scrollTrigger: { trigger: s, start: 'top 88%', once: true },
                delay: i === 0 ? 0.3 : 0,
              }
            );
          });
        }

        // Stat bars animate width on scroll
        if (statsRef.current) {
          const bars = statsRef.current.querySelectorAll('[data-bar]');
          gsap.fromTo(bars,
            { width: '0%' },
            {
              width: (i, el) => el.getAttribute('data-target') || '0%',
              duration: 0.8, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
            }
          );
        }
      });
    });
  }, [c.slug]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Characters', href: '/characters' },
        { label: c.superName },
      ]} />

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        {/* Main content */}
        <div ref={mainRef}>
          <div data-header className="mb-6">
            <div className="flex items-center gap-3 flex-wrap mb-1" style={{ opacity: 0 }}>
              <h1 className="text-4xl font-black text-white">{c.superName}</h1>
              <span className="px-2 py-0.5 rounded text-xs font-bold uppercase"
                style={{ background: c.type === 'villain' ? '#dc2626' : '#16a34a', color: '#fff' }}>
                {c.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3" style={{ opacity: 0 }}>
              Real name: <span className="text-gray-200">{c.privateName}</span>
            </p>
            <blockquote className="border-l-4 pl-4 italic text-gray-300 text-lg" style={{ borderColor: c.color, opacity: 0 }}>
              "{c.quote}"
            </blockquote>
          </div>

          <div ref={sectionsRef} className="space-y-6">
            {/* Bio */}
            <div data-section className="glass p-6" style={{ opacity: 0 }}>
              <h2 className="text-lg font-bold mb-3 border-b border-white/10 pb-2" style={{ color: 'var(--accent)' }}>Biography</h2>
              <p className="text-gray-300 leading-relaxed">{c.description}</p>
            </div>

            {/* Stats */}
            <div data-section className="glass p-6" style={{ opacity: 0 }}>
              <h2 className="text-lg font-bold mb-4 border-b border-white/10 pb-2" style={{ color: 'var(--accent)' }}>Power Stats</h2>
              <div ref={statsRef} className="space-y-3">
                {statLabels.map(s => (
                  <div key={s.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{s.label}</span>
                      <span className="font-bold text-white">{c.stats[s.key]}/10</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        data-bar
                        data-target={`${c.stats[s.key] * 10}%`}
                        className="h-full rounded-full"
                        style={{ width: 0, background: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Allies & Enemies */}
            <div data-section className="grid sm:grid-cols-2 gap-4" style={{ opacity: 0 }}>
              {relatedAllies.length > 0 && (
                <div className="glass p-5">
                  <h2 className="text-base font-bold text-emerald-400 mb-3">Allies</h2>
                  <div className="flex flex-wrap gap-3">
                    {relatedAllies.map(a => (
                      <Link key={a.slug} href={`/characters/${a.slug}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src={a.img} alt={a.superName} className="w-8 h-8 rounded-full object-cover object-top border border-white/10" />
                        <span className="text-xs text-gray-300">{a.superName}</span>
                      </Link>
                    ))}
                    {c.allies.filter(n => !allCharacters.find(x => x.superName === n)).map(n => (
                      <span key={n} className="text-xs text-gray-500">{n}</span>
                    ))}
                  </div>
                </div>
              )}
              {relatedEnemies.length > 0 && (
                <div className="glass p-5">
                  <h2 className="text-base font-bold text-red-400 mb-3">Enemies</h2>
                  <div className="flex flex-wrap gap-3">
                    {relatedEnemies.map(e => (
                      <Link key={e.slug} href={`/characters/${e.slug}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src={e.img} alt={e.superName} className="w-8 h-8 rounded-full object-cover object-top border border-white/10" />
                        <span className="text-xs text-gray-300">{e.superName}</span>
                      </Link>
                    ))}
                    {c.enemies.filter(n => !allCharacters.find(x => x.superName === n)).map(n => (
                      <span key={n} className="text-xs text-gray-500">{n}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Infobox sidebar */}
        <aside ref={sidebarRef} className="order-first lg:order-last" style={{ opacity: 0 }}>
          <div className="infobox sticky top-20">
            <div className="relative">
              <img src={c.img} alt={c.superName} className="w-full aspect-[3/4] object-cover object-top" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
            </div>
            <div className="p-4 space-y-3">
              <table className="w-full text-sm">
                <tbody>
                  {([
                    ['Real Name', c.privateName],
                    ['Powers', c.powers],
                    ['Category', c.category],
                    ['Team', c.team],
                    ['Status', c.status],
                  ] as [string, string][]).map(([k, v]) => (
                    <tr key={k} className="border-b border-white/5">
                      <td className="py-1.5 text-gray-500 pr-3 w-1/2">{k}</td>
                      <td className="py-1.5 text-gray-200">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 pt-6 border-t border-white/5">
        <Link href="/characters" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>← Back to Characters</Link>
      </div>
    </div>
  );
}
