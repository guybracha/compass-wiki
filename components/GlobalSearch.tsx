'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { allCharacters } from '@/lib/characters';
import { eventsCatalog } from '@/lib/events';
import { locations } from '@/lib/locations';
import { historyList } from '@/lib/history';

interface Result {
  type: 'character' | 'event' | 'location' | 'timeline';
  label: string;
  sub: string;
  href: string;
  img?: string;
}

function buildIndex(): Result[] {
  const results: Result[] = [];

  allCharacters.forEach(c => results.push({
    type: 'character',
    label: c.superName,
    sub: `${c.privateName} · ${c.category}`,
    href: `/characters/${c.slug}`,
    img: c.img,
  }));

  eventsCatalog.forEach(e => results.push({
    type: 'event',
    label: e.title,
    sub: e.date,
    href: `/events/${e.id}`,
    img: e.banner,
  }));

  locations.forEach(l => results.push({
    type: 'location',
    label: l.name,
    sub: `${l.region} · ${l.type}`,
    href: `/locations`,
    img: l.image,
  }));

  historyList.forEach(h => results.push({
    type: 'timeline',
    label: h.era,
    sub: 'Historical Era',
    href: `/timeline`,
  }));

  return results;
}

const INDEX = buildIndex();

const TYPE_LABEL: Record<Result['type'], string> = {
  character: 'Characters',
  event: 'Events',
  location: 'Locations',
  timeline: 'Timeline',
};

const TYPE_COLOR: Record<Result['type'], string> = {
  character: '#fbbf24',
  event: '#f97316',
  location: '#34d399',
  timeline: '#60a5fa',
};

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim().length < 2
    ? []
    : INDEX.filter(r =>
        r.label.toLowerCase().includes(query.toLowerCase()) ||
        r.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20);

  // Group results
  const grouped = (['character', 'event', 'location', 'timeline'] as Result['type'][])
    .map(type => ({ type, items: results.filter(r => r.type === type) }))
    .filter(g => g.items.length > 0);

  const flatResults = grouped.flatMap(g => g.items);

  const openSearch = useCallback(() => {
    setOpen(true);
    setQuery('');
    setCursor(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCursor(0);
  }, []);

  const navigate = useCallback((href: string) => {
    closeSearch();
    router.push(href);
  }, [closeSearch, router]);

  // Keyboard shortcut Ctrl/Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open ? closeSearch() : openSearch();
      }
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, openSearch, closeSearch]);

  // Arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor(c => Math.min(c + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor(c => Math.max(c - 1, 0));
    } else if (e.key === 'Enter' && flatResults[cursor]) {
      navigate(flatResults[cursor].href);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:block">Search...</span>
        <kbd className="hidden sm:block text-xs px-1 py-0.5 rounded border border-white/10 text-gray-600">⌘K</kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          onClick={closeSearch}
        >
          <div
            className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setCursor(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search characters, events, locations..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-500 hover:text-white transition-colors text-xs">✕</button>
              )}
              <kbd className="text-xs text-gray-600 border border-white/10 px-1.5 py-0.5 rounded">Esc</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length < 2 && (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  Type at least 2 characters to search
                </div>
              )}

              {query.trim().length >= 2 && results.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}

              {grouped.map(group => {
                let globalIdx = flatResults.indexOf(group.items[0]);
                return (
                  <div key={group.type}>
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: TYPE_COLOR[group.type], background: 'rgba(255,255,255,0.02)' }}>
                      {TYPE_LABEL[group.type]}
                    </div>
                    {group.items.map((item, i) => {
                      const idx = globalIdx + i;
                      const active = cursor === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => navigate(item.href)}
                          onMouseEnter={() => setCursor(idx)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{ background: active ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                        >
                          {item.img && (
                            <img src={item.img} alt={item.label}
                              className="w-8 h-8 rounded-md object-cover object-top shrink-0"
                              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          )}
                          {!item.img && (
                            <div className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center text-xs"
                              style={{ background: TYPE_COLOR[group.type] + '22', color: TYPE_COLOR[group.type] }}>
                              {TYPE_LABEL[group.type][0]}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm text-white font-medium truncate">{item.label}</p>
                            <p className="text-xs text-gray-500 truncate">{item.sub}</p>
                          </div>
                          {active && (
                            <span className="ml-auto text-gray-600 text-xs shrink-0">↵</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {results.length > 0 && (
              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 text-xs text-gray-600">
                <span>↑↓ navigate</span>
                <span>↵ open</span>
                <span>Esc close</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
