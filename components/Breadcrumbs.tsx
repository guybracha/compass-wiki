'use client';
import Link from 'next/link';

export interface Crumb { label: string; href?: string; }

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gray-700">/</span>}
          {crumb.href
            ? <Link href={crumb.href} className="hover:text-white transition-colors" style={{ color: 'var(--accent)' }}>{crumb.label}</Link>
            : <span className="text-white">{crumb.label}</span>
          }
        </span>
      ))}
    </nav>
  );
}
