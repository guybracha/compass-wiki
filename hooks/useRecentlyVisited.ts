'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface VisitedPage { label: string; href: string; icon: string; ts: number; }

const KEY = 'cw-visited';
const MAX = 6;

const ROUTE_META: Record<string, { label: string; icon: string }> = {
  '/': { label: 'Home', icon: '🏠' },
  '/characters': { label: 'Characters', icon: '⚡' },
  '/prime-children': { label: 'Prime-Children', icon: '🧬' },
  '/timeline': { label: 'Timeline', icon: '📜' },
  '/events': { label: 'Events', icon: '⚔️' },
  '/locations': { label: 'Atlas', icon: '🗺️' },
  '/gallery': { label: 'Gallery', icon: '🎨' },
};

function labelForPath(path: string): { label: string; icon: string } {
  if (ROUTE_META[path]) return ROUTE_META[path];
  if (path.startsWith('/characters/')) {
    const slug = path.split('/').pop() ?? '';
    return { label: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), icon: '👤' };
  }
  if (path.startsWith('/events/')) {
    const id = path.split('/').pop() ?? '';
    return { label: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), icon: '⚔️' };
  }
  return { label: path, icon: '📄' };
}

export function useTrackVisit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { label, icon } = labelForPath(pathname);
    const entry: VisitedPage = { label, href: pathname, icon, ts: Date.now() };

    const raw = localStorage.getItem(KEY);
    let existing: VisitedPage[] = raw ? JSON.parse(raw) : [];
    existing = existing.filter(p => p.href !== pathname);
    existing.unshift(entry);
    existing = existing.slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(existing));
  }, [pathname]);
}

export function getRecentlyVisited(): VisitedPage[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
