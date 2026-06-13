'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type AccentColor = 'amber' | 'cyan' | 'purple' | 'rose' | 'emerald' | 'orange';

interface ThemeCtx {
  accent: AccentColor;
  setAccent: (a: AccentColor) => void;
}

const ACCENTS: Record<AccentColor, { primary: string; soft: string; label: string }> = {
  amber:   { primary: '#fbbf24', soft: 'rgba(251,191,36,0.12)',   label: 'Gold' },
  cyan:    { primary: '#22d3ee', soft: 'rgba(34,211,238,0.12)',   label: 'Cyan' },
  purple:  { primary: '#a78bfa', soft: 'rgba(167,139,250,0.12)',  label: 'Purple' },
  rose:    { primary: '#fb7185', soft: 'rgba(251,113,133,0.12)',  label: 'Rose' },
  emerald: { primary: '#34d399', soft: 'rgba(52,211,153,0.12)',   label: 'Emerald' },
  orange:  { primary: '#fb923c', soft: 'rgba(251,146,60,0.12)',   label: 'Orange' },
};

export { ACCENTS };

const ThemeContext = createContext<ThemeCtx>({ accent: 'amber', setAccent: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentColor>('amber');

  useEffect(() => {
    const saved = localStorage.getItem('cw-accent') as AccentColor | null;
    if (saved && ACCENTS[saved]) setAccentState(saved);
  }, []);

  useEffect(() => {
    const { primary, soft } = ACCENTS[accent];
    document.documentElement.style.setProperty('--accent', primary);
    document.documentElement.style.setProperty('--accent-soft', soft);
    localStorage.setItem('cw-accent', accent);
  }, [accent]);

  const setAccent = (a: AccentColor) => setAccentState(a);

  return <ThemeContext.Provider value={{ accent, setAccent }}>{children}</ThemeContext.Provider>;
}

export function useTheme() { return useContext(ThemeContext); }
