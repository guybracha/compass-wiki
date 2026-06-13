'use client';
import { useEffect, useRef, ReactNode } from 'react';

export default function GSAPReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.55, delay, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          }
        );
      });
    });
  }, [delay]);

  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
}
