'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (!ref.current) return;
      const tl = gsap.timeline();
      tl.fromTo(ref.current.querySelector('.hero-logo'),
        { opacity: 0, scale: 0.8, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.5)' }
      )
      .fromTo(ref.current.querySelector('h1'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3'
      )
      .fromTo(ref.current.querySelector('.hero-sub'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2'
      )
      .fromTo(ref.current.querySelector('.hero-desc'),
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }, '-=0.1'
      )
      .fromTo(ref.current.querySelector('.hero-btns'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1'
      );
    });
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 px-4 text-center">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--accent-soft) 0%, transparent 70%)' }} />
      <img src="/contents/indexphoto/logo.webp" alt="Compass World" className="hero-logo mx-auto h-20 w-auto mb-6 drop-shadow-lg" style={{ opacity: 0 }} />
      <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight" style={{ opacity: 0 }}>
        COMPASS WORLD
      </h1>
      <p className="hero-sub text-xl font-semibold mb-2 uppercase tracking-widest" style={{ color: 'var(--accent)', opacity: 0 }}>WIKI</p>
      <p className="hero-desc text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed" style={{ opacity: 0 }}>
        The complete encyclopaedia of the Compass World universe — characters, history, missions, and locations of a new superhero age.
      </p>
      <div className="hero-btns mt-8 flex flex-wrap gap-3 justify-center" style={{ opacity: 0 }}>
        <Link href="/characters" className="px-6 py-3 rounded-full font-bold text-sm transition-colors text-black hover:brightness-110"
          style={{ background: 'var(--accent)' }}>
          Browse Characters
        </Link>
        <Link href="/prime-children" className="px-6 py-3 rounded-full border text-white text-sm hover:bg-white/5 transition-colors border-white/20">
          Prime-Children Registry
        </Link>
      </div>
    </section>
  );
}
