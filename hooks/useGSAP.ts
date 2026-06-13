'use client';
import { useEffect, useRef } from 'react';

export function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (!ref.current) return;
        const els = ref.current.querySelectorAll('[data-reveal]');

        ctx = gsap.context(() => {
          gsap.fromTo(
            els,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }, ref.current);
      });
    });

    return () => ctx?.revert();
  }, []);

  return ref;
}

export function useCounterAnim(value: number, active: boolean) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    let raf: number;
    import('gsap').then(({ gsap }) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1,
        ease: 'power1.out',
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.val).toString();
        },
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [value, active]);

  return ref;
}
