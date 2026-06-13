'use client';
import { useEffect, useRef } from 'react';
import { historyList } from '@/lib/history';

export default function TimelinePage() {
  const eras = [...new Set(historyList.map(h => h.era))];
  const headerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header entrance
        if (headerRef.current) {
          gsap.fromTo(headerRef.current.children,
            { opacity: 0, y: -24 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
          );
        }

        // Legend chips
        if (legendRef.current) {
          gsap.fromTo(legendRef.current.children,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: 'back.out(1.4)', delay: 0.3 }
          );
        }

        // Vertical line draw
        if (lineRef.current) {
          gsap.fromTo(lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            { scaleY: 1, duration: 1.4, ease: 'power1.inOut', delay: 0.5 }
          );
        }

        // Timeline entries stagger on scroll
        if (entriesRef.current) {
          const entries = entriesRef.current.querySelectorAll('[data-entry]');
          entries.forEach((el, i) => {
            gsap.fromTo(el,
              { opacity: 0, x: -40 },
              {
                opacity: 1, x: 0, duration: 0.55, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                delay: i < 3 ? i * 0.08 : 0,
              }
            );
          });

          // Dot pulse
          const dots = entriesRef.current.querySelectorAll('[data-dot]');
          dots.forEach(dot => {
            ScrollTrigger.create({
              trigger: dot,
              start: 'top 85%',
              once: true,
              onEnter: () => gsap.fromTo(dot,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
              ),
            });
          });
        }
      });
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div ref={headerRef} className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2" style={{ opacity: 0 }}>Chronology of the World</h1>
        <p className="text-gray-400" style={{ opacity: 0 }}>The complete history of Prime-Children from ancient times to the formation of the Compass Alliance.</p>
      </div>

      {/* Era legend */}
      <div ref={legendRef} className="glass p-4 mb-10 flex flex-wrap gap-3">
        {eras.map(era => {
          const entry = historyList.find(h => h.era === era)!;
          return (
            <div key={era} className="flex items-center gap-2 text-sm" style={{ opacity: 0 }}>
              <div className="w-3 h-3 rounded-full" style={{ background: entry.eraColor }} />
              <span className="text-gray-300">{era}</span>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div ref={lineRef} className="absolute left-6 top-0 bottom-0 w-px bg-white/10" style={{ scaleY: 0 }} />
        <div ref={entriesRef} className="space-y-8">
          {historyList.map((entry, i) => (
            <div key={i} data-entry className="relative pl-16" style={{ opacity: 0 }}>
              <div
                data-dot
                className="absolute left-3 top-2 w-6 h-6 rounded-full border-2 border-[#0f0f0f] flex items-center justify-center"
                style={{ background: entry.eraColor, opacity: 0 }}
              >
                <div className="w-2 h-2 rounded-full bg-white/80" />
              </div>

              <div className="glass p-0 overflow-hidden hover:bg-white/6 transition-colors">
                <div className="grid sm:grid-cols-[200px_1fr]">
                  <img src={entry.image} alt={entry.year} className="w-full h-36 sm:h-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded uppercase"
                        style={{ background: entry.eraColor + '33', color: entry.eraColor, border: `1px solid ${entry.eraColor}44` }}
                      >
                        {entry.era}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-white mb-2">{entry.year}</h2>
                    <p className="text-gray-300 text-sm leading-relaxed">{entry.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
