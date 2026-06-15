'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTrackVisit, getRecentlyVisited, VisitedPage } from '@/hooks/useRecentlyVisited';

export default function RecentlyVisited() {
  useTrackVisit();
  const [pages, setPages] = useState<VisitedPage[]>([]);

  useEffect(() => {
    setPages(getRecentlyVisited().slice(1)); // skip current page
  }, []);

  if (pages.length === 0) return null;

  return (
    <div className="glass p-5">
      <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Recently Visited</h3>
      <div className="flex flex-wrap gap-2">
        {pages.map(p => (
          <Link key={p.href} href={p.href}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}>
            <span>{p.icon}</span>
            <span>{p.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
