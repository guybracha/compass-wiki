import Link from 'next/link';
import { allCharacters } from '@/lib/characters';
import React from 'react';

// Build sorted list once (longest names first to avoid partial matches)
const CHARS = [...allCharacters].sort((a, b) => b.superName.length - a.superName.length);

const PATTERN = new RegExp(
  `\\b(${CHARS.map(c => c.superName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'g'
);

export function AutoLink({ text, className }: { text: string; className?: string }) {
  const parts = text.split(PATTERN);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const char = CHARS.find(c => c.superName === part);
        if (char) {
          return (
            <Link key={i} href={`/characters/${char.slug}`}
              className="font-semibold hover:underline transition-colors"
              style={{ color: 'var(--accent)' }}>
              {part}
            </Link>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
