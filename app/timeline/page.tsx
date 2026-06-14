'use client';
import { useState, useEffect, useRef } from 'react';
import { historyList, HistoryEntry } from '@/lib/history';

const eras = ['All', ...Array.from(new Set(historyList.map(h => h.era)))];

export default function TimelinePage() {
  const [activeEra, setActiveEra] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  const filtered = activeEra === 'All' ? historyList : historyList.filter(h => h.era === activeEra);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: -24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
        );
      }
      if (legendRef.current) {
        gsap.fromTo(legendRef.current.children,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: 'back.out(1.4)', delay: 0.3 }
        );
      }
    });
  }, []);

  // Animate entries on filter change
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const entries = document.querySelectorAll('[data-entry]');
      gsap.fromTo(entries,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      );
    });
  }, [activeEra]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div ref={headerRef} className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2" style={{ opacity: 0 }}>Chronology of the World</h1>
        <p className="text-gray-400" style={{ opacity: 0 }}>The complete history of Prime-Children from ancient times to the formation of the Compass Alliance.</p>
      </div>

      {/* Era progress bar */}
      <EraProgressBar entries={historyList} active={activeEra} />

      {/* Era filter tabs */}
      <div ref={legendRef} className="glass p-3 mb-8 flex flex-wrap gap-2">
        {eras.map(era => {
          const entry = historyList.find(h => h.era === era);
          const color = entry?.eraColor ?? 'var(--accent)';
          const isActive = activeEra === era;
          return (
            <button key={era} onClick={() => { setActiveEra(era); setExpanded(null); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={isActive
                ? { background: color, color: '#000' }
                : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: `1px solid ${color}44` }
              }
            >
              {era !== 'All' && <div className="w-2 h-2 rounded-full" style={{ background: isActive ? '#000' : color }} />}
              {era}
              <span className="opacity-60 text-[10px]">
                ({era === 'All' ? historyList.length : historyList.filter(h => h.era === era).length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline entries */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
        <div className="space-y-5">
          {filtered.map((entry, i) => (
            <TimelineEntry
              key={entry.year + i}
              entry={entry}
              index={i}
              isExpanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EraProgressBar({ entries, active }: { entries: HistoryEntry[]; active: string }) {
  const eraGroups = Array.from(new Set(entries.map(h => h.era)));
  const total = entries.length;

  return (
    <div className="mb-6 glass p-3">
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        {eraGroups.map(era => {
          const count = entries.filter(h => h.era === era).length;
          const color = entries.find(h => h.era === era)!.eraColor;
          const isActive = active === 'All' || active === era;
          return (
            <div key={era} className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(count / total) * 100}%`, background: color, opacity: isActive ? 1 : 0.2 }} />
          );
        })}
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-gray-600">
        <span>750 BC</span>
        <span>Present Day</span>
      </div>
    </div>
  );
}

function TimelineEntry({ entry, index, isExpanded, onToggle }: {
  entry: HistoryEntry; index: number; isExpanded: boolean; onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    import('gsap').then(({ gsap }) => {
      if (isExpanded) {
        gsap.fromTo(bodyRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
      } else {
        gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
      }
    });
  }, [isExpanded]);

  return (
    <div data-entry className="relative pl-16">
      {/* Dot */}
      <div className="absolute left-3 top-4 w-6 h-6 rounded-full border-2 border-[#0f0f0f] flex items-center justify-center z-10"
        style={{ background: entry.eraColor }}>
        <div className="w-2 h-2 rounded-full bg-white/80" />
      </div>

      <button onClick={onToggle} className="w-full text-left glass overflow-hidden hover:bg-white/5 transition-colors group">
        {/* Header row */}
        <div className="grid sm:grid-cols-[180px_1fr] items-stretch">
          <div className="relative h-28 sm:h-full overflow-hidden">
            <img src={entry.image} alt={entry.year} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/60" />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold px-2 py-0.5 rounded uppercase mb-2 inline-block"
                style={{ background: entry.eraColor + '33', color: entry.eraColor, border: `1px solid ${entry.eraColor}44` }}>
                {entry.era}
              </span>
              <h2 className="text-lg font-black text-white">{entry.year}</h2>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{entry.description}</p>
            </div>
            <div className="ml-4 shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded detail */}
        <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
          <div className="px-5 pb-5 pt-2 border-t border-white/5">
            <div className="flex gap-4">
              <img src={entry.image} alt={entry.year}
                className="hidden sm:block w-32 h-32 rounded-xl object-cover shrink-0" />
              <div>
                <p className="text-gray-300 leading-relaxed text-sm">{entry.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full" style={{ background: entry.eraColor }} />
                  <span>{entry.era} Era</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
