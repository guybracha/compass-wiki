'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemePicker from './ThemePicker';
import GlobalSearch from './GlobalSearch';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/characters', label: 'Characters' },
  { href: '/prime-children', label: 'Prime-Children' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/events', label: 'Events' },
  { href: '/locations', label: 'Atlas' },
  { href: '/gallery', label: 'Gallery' },
];

export default function WikiNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
          <img src="/contents/indexphoto/logo.webp" alt="Compass World" className="h-8 w-auto" />
          <span className="font-bold text-sm hidden sm:block tracking-wide" style={{ color: 'var(--accent)' }}>COMPASS WORLD</span>
          <span className="text-white/30 text-xs hidden sm:block">WIKI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {navLinks.map(l => {
            const active = l.href === '/' ? path === '/' : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                style={active
                  ? { background: 'var(--accent-soft)', color: 'var(--accent)' }
                  : { color: '#9ca3af' }
                }
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto hidden lg:flex items-center gap-2">
          <GlobalSearch />
          <ThemePicker />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 text-gray-400 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-1" style={{ background: 'rgba(20,20,20,0.98)' }}>
          {navLinks.map(l => {
            const active = l.href === '/' ? path === '/' : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm"
                style={active ? { color: 'var(--accent)', background: 'var(--accent-soft)' } : { color: '#9ca3af' }}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/5 flex flex-col gap-3">
            <GlobalSearch />
            <ThemePicker />
          </div>
        </div>
      )}
    </nav>
  );
}
