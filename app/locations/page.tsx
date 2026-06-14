'use client';
import { useState, useEffect, useRef } from 'react';
import { locations, Location } from '@/lib/locations';

const typeColors: Record<string, string> = {
  City: '#38bdf8', Underground: '#6b7280', Fortress: '#d97706',
  Headquarters: '#fbbf24', Landmark: '#a78bfa', 'Sacred Site': '#34d399',
  Kingdom: '#60a5fa', Sanctuary: '#f472b6', 'Island Nation': '#22d3ee',
};

// Approximate equirectangular positions (% of map width/height)
const PIN_POSITIONS: Record<string, { x: number; y: number }> = {
  'tel-giborim':       { x: 53.7, y: 34.2 },
  'undercity':         { x: 53.5, y: 33.5 },
  'saint-peter-temple':{ x: 53.9, y: 32.6 },
  'atlas-building':    { x: 53.6, y: 33.8 },
  'oriental-pearl':    { x: 83.8, y: 34.5 },
  'paper-park':        { x: 84.2, y: 35.2 },
  'sublania':          { x: 65.0, y: 47.0 },
  'dragon-la':         { x: 73.8, y: 36.8 },
  'pacifia':           { x: 3.5,  y: 42.0 },
};

export default function LocationsPage() {
  const [selected, setSelected] = useState<Location | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'grid'>('map');
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!panelRef.current || !selected) return;
    import('gsap').then(({ gsap }) => {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
      );
    });
  }, [selected]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div ref={headerRef} className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-white mb-1" style={{ opacity: 0 }}>Atlas</h1>
          <p className="text-gray-400" style={{ opacity: 0 }}>
            {locations.length} known locations across the Compass World
          </p>
        </div>
        {/* View toggle */}
        <div className="flex gap-1 glass p-1 rounded-lg" style={{ opacity: 0 }}>
          {(['map', 'grid'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors"
              style={view === v
                ? { background: 'var(--accent)', color: '#000' }
                : { color: '#9ca3af' }
              }>
              {v === 'map' ? '🗺 Map' : '⊞ Grid'}
            </button>
          ))}
        </div>
      </div>

      {view === 'map' ? (
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Map */}
          <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ minHeight: 480, background: '#0a1628' }}>
            <WorldMapSVG
              selected={selected?.id ?? null}
              hovered={hovered}
              onSelect={id => setSelected(locations.find(l => l.id === id) ?? null)}
              onHover={setHovered}
            />
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-80 shrink-0">
            {selected ? (
              <div ref={panelRef} className="glass rounded-2xl overflow-hidden">
                <div className="relative h-44">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 text-white text-xs hover:bg-black/80 flex items-center justify-center"
                  >✕</button>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: (typeColors[selected.type] || '#fbbf24') + '33', color: typeColors[selected.type] || '#fbbf24' }}>
                      {selected.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-black text-white mb-1">{selected.name}</h2>
                  <p className="text-xs mb-3" style={{ color: 'var(--accent)' }}>{selected.region}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{selected.description}</p>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 flex flex-col gap-2">
                <p className="text-gray-500 text-sm mb-2">Tap a pin to explore a location</p>
                {locations.map(loc => (
                  <button key={loc.id} onClick={() => setSelected(loc)}
                    onMouseEnter={() => setHovered(loc.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-white/5 group">
                    <div className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: typeColors[loc.type] || '#fbbf24' }} />
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium truncate group-hover:opacity-80">{loc.name}</p>
                      <p className="text-xs text-gray-500 truncate">{loc.region} · {loc.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <GridView />
      )}
    </div>
  );
}

function WorldMapSVG({ selected, hovered, onSelect, onHover }: {
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <svg viewBox="0 0 1000 500" className="w-full h-full" style={{ minHeight: 380 }}>
      <defs>
        <radialGradient id="ocean" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0d2240" />
          <stop offset="100%" stopColor="#060e1a" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <pattern id="grid" x="0" y="0" width="50" height="25" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Ocean */}
      <rect width="1000" height="500" fill="url(#ocean)" />
      <rect width="1000" height="500" fill="url(#grid)" />

      {/* Latitude lines */}
      {[100, 167, 250, 333, 400].map(y => (
        <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}
      {/* Longitude lines */}
      {[100, 200, 333, 450, 556, 667, 778, 889].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}

      {/* Continents - simplified shapes */}
      {/* North America */}
      <path d="M 80 80 L 195 72 L 230 95 L 250 140 L 245 200 L 225 265 L 195 295 L 165 275 L 130 225 L 95 180 L 68 135 Z"
        fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* South America */}
      <path d="M 190 285 L 260 272 L 285 330 L 278 415 L 250 455 L 215 440 L 198 390 L 185 335 Z"
        fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Europe */}
      <path d="M 432 90 L 488 82 L 500 105 L 510 130 L 495 155 L 475 162 L 455 155 L 438 138 L 428 115 Z"
        fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Africa */}
      <path d="M 445 168 L 525 162 L 548 205 L 542 295 L 518 370 L 488 388 L 460 355 L 445 295 L 438 228 Z"
        fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Middle East */}
      <path d="M 502 148 L 572 152 L 585 205 L 560 252 L 525 245 L 508 205 Z"
        fill="#1f2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Asia (main) */}
      <path d="M 495 85 L 830 78 L 845 150 L 825 200 L 800 235 L 760 258 L 720 255 L 680 238 L 645 225 L 610 232 L 578 210 L 558 250 L 530 248 L 508 205 L 502 148 L 498 120 Z"
        fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Southeast Asia / Indonesia (blobs) */}
      <ellipse cx="790" cy="288" rx="30" ry="14" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      <ellipse cx="830" cy="298" rx="20" ry="10" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Australia */}
      <path d="M 728 298 L 832 285 L 848 335 L 832 385 L 785 398 L 742 378 L 722 340 Z"
        fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Greenland */}
      <ellipse cx="250" cy="60" rx="35" ry="25" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" />
      {/* Japan */}
      <ellipse cx="860" cy="145" rx="12" ry="28" fill="#1a2a1a" stroke="#2a3a2a" strokeWidth="1" transform="rotate(-20, 860, 145)" />

      {/* Equator */}
      <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(251,191,36,0.12)" strokeWidth="1" strokeDasharray="8,6" />
      <text x="8" y="247" fill="rgba(251,191,36,0.3)" fontSize="9" fontFamily="monospace">EQ</text>

      {/* Region labels */}
      <text x="145" y="185" fill="rgba(255,255,255,0.12)" fontSize="11" fontFamily="monospace" textAnchor="middle">NORTH AMERICA</text>
      <text x="232" y="370" fill="rgba(255,255,255,0.12)" fontSize="10" fontFamily="monospace" textAnchor="middle">SOUTH AMERICA</text>
      <text x="490" y="268" fill="rgba(255,255,255,0.12)" fontSize="11" fontFamily="monospace" textAnchor="middle">AFRICA</text>
      <text x="460" y="120" fill="rgba(255,255,255,0.12)" fontSize="10" fontFamily="monospace" textAnchor="middle">EUROPE</text>
      <text x="660" y="155" fill="rgba(255,255,255,0.12)" fontSize="12" fontFamily="monospace" textAnchor="middle">ASIA</text>
      <text x="780" y="345" fill="rgba(255,255,255,0.12)" fontSize="10" fontFamily="monospace" textAnchor="middle">AUSTRALIA</text>
      <text x="500" y="420" fill="rgba(255,255,255,0.08)" fontSize="11" fontFamily="monospace" textAnchor="middle">INDIAN OCEAN</text>
      <text x="100" y="400" fill="rgba(255,255,255,0.08)" fontSize="11" fontFamily="monospace" textAnchor="middle">ATLANTIC OCEAN</text>
      <text x="30" y="300" fill="rgba(255,255,255,0.08)" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,30,300)">PACIFIC</text>
      <text x="970" y="300" fill="rgba(255,255,255,0.08)" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(90,970,300)">PACIFIC</text>

      {/* Compass rose */}
      <g transform="translate(940, 450)">
        <circle cx="0" cy="0" r="22" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {[['N',-14],['S',18],['E',18],['W',-18]].map(([label, offset], i) => (
          <text key={i} x={i < 2 ? 0 : (offset as number)} y={i < 2 ? (offset as number) : 4}
            fill="rgba(251,191,36,0.6)" fontSize="7" fontFamily="monospace" textAnchor="middle">{label}</text>
        ))}
        <circle cx="0" cy="0" r="3" fill="rgba(251,191,36,0.5)" />
      </g>

      {/* Location Pins */}
      {locations.map(loc => {
        const pos = PIN_POSITIONS[loc.id];
        if (!pos) return null;
        const x = pos.x * 10;
        const y = pos.y * 5;
        const color = typeColors[loc.type] || '#fbbf24';
        const isSelected = selected === loc.id;
        const isHovered = hovered === loc.id;
        const active = isSelected || isHovered;

        return (
          <g key={loc.id} style={{ cursor: 'pointer' }}
            onClick={() => onSelect(loc.id)}
            onMouseEnter={() => onHover(loc.id)}
            onMouseLeave={() => onHover(null)}
          >
            {/* Pulse ring */}
            {active && (
              <circle cx={x} cy={y} r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4">
                <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Outer glow */}
            <circle cx={x} cy={y} r={active ? 10 : 7} fill={color} opacity="0.15" filter="url(#glow)" />
            {/* Pin body */}
            <circle cx={x} cy={y} r={active ? 7 : 5} fill={color} filter={active ? "url(#glow-strong)" : "none"}
              stroke={isSelected ? '#fff' : 'rgba(0,0,0,0.5)'} strokeWidth={isSelected ? 1.5 : 1} />
            {/* Center dot */}
            <circle cx={x} cy={y} r="2" fill="rgba(0,0,0,0.6)" />

            {/* Label */}
            {active && (
              <g>
                <rect x={x + 10} y={y - 12} width={loc.name.length * 5.5 + 10} height="16" rx="4"
                  fill="rgba(0,0,0,0.85)" stroke={color} strokeWidth="0.5" />
                <text x={x + 15} y={y + 0} fill="white" fontSize="8.5" fontFamily="sans-serif" fontWeight="600">
                  {loc.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function GridView() {
  const regions = Array.from(new Set(locations.map(l => l.region)));

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const cards = document.querySelectorAll('[data-loc-card]');
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
        );
      });
    });
  }, []);

  return (
    <div>
      {regions.map(region => (
        <div key={region} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{region}</h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.filter(l => l.region === region).map(loc => (
              <div key={loc.id} data-loc-card className="glass overflow-hidden hover:bg-white/6 transition-colors" style={{ opacity: 0 }}>
                <div className="relative h-44">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: (typeColors[loc.type] || '#fbbf24') + '33', color: typeColors[loc.type] || '#fbbf24' }}>
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
  );
}
