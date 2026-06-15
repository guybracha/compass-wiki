import Link from 'next/link';
import { heroes, villains } from '@/lib/characters';
import { historyList } from '@/lib/history';
import { eventsCatalog } from '@/lib/events';
import { primeChildren } from '@/lib/primeChildren';
import HomeHero from '@/components/HomeHero';
import GSAPReveal from '@/components/GSAPReveal';
import RecentlyVisited from '@/components/RecentlyVisited';

const sections = [
  { href: '/characters', label: 'Characters', desc: `${heroes.length + villains.length}+ profiles`, icon: '⚡' },
  { href: '/prime-children', label: 'Prime-Children', desc: `${primeChildren.length} registered`, icon: '🧬' },
  { href: '/timeline', label: 'Timeline', desc: `${historyList.length} historical eras`, icon: '📜' },
  { href: '/events', label: 'Events', desc: `${eventsCatalog.length} mission logs`, icon: '⚔️' },
  { href: '/locations', label: 'Atlas', desc: '9 locations', icon: '🗺️' },
  { href: '/gallery', label: 'Gallery', desc: '28+ artworks', icon: '🎨' },
];

const foundingMembers = heroes.filter(h => h.status === 'Founding Member');

export default function HomePage() {
  return (
    <div>
      <HomeHero />

      {/* Quick nav */}
      <GSAPReveal className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {sections.map(s => (
            <Link key={s.href} href={s.href} className="glass p-4 text-center hover:bg-white/8 transition-colors group">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-bold text-sm text-white group-hover:opacity-80 transition-opacity"
                style={{ color: 'inherit' }}>
                {s.label}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
            </Link>
          ))}
        </div>
      </GSAPReveal>

      {/* Founding members */}
      <GSAPReveal className="max-w-5xl mx-auto px-4 pb-16" delay={0.05}>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">The Compass Alliance</h2>
          <div className="flex-1 h-px bg-white/10" />
          <Link href="/characters" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>View all →</Link>
        </div>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          In 2023, six Prime-Children who survived the alien Developer Invasion united to protect humanity. They became the <strong className="text-white">Compass Alliance</strong>.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {foundingMembers.map(h => (
            <Link key={h.slug} href={`/characters/${h.slug}`} className="group text-center">
              <div className="rounded-xl overflow-hidden mb-2 border-2 border-transparent transition-colors group-hover:border-white/30">
                <img src={h.img} alt={h.superName} className="w-full aspect-square object-cover object-top group-hover:scale-105 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white group-hover:opacity-80 transition-opacity">{h.superName}</p>
              <p className="text-xs text-gray-500">{h.category}</p>
            </Link>
          ))}
        </div>
      </GSAPReveal>

      {/* Recently Visited */}
      <GSAPReveal className="max-w-5xl mx-auto px-4 pb-8" delay={0.08}>
        <RecentlyVisited />
      </GSAPReveal>

      {/* Lore */}
      <GSAPReveal className="max-w-5xl mx-auto px-4 pb-16" delay={0.1}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-6">
            <h3 className="font-bold mb-3 text-lg" style={{ color: 'var(--accent)' }}>What is Compass World?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Compass World is an original superhero universe spanning from 750 BC to the present day. At its center is the rise of <em>Prime-Children</em> — a new generation of humans born with extraordinary powers — and the forces that seek to control or destroy them.
            </p>
          </div>
          <div className="glass p-6">
            <h3 className="font-bold mb-3 text-lg" style={{ color: 'var(--accent)' }}>The Developer Invasion (2022)</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              In May 2022, an alien tribe called <em>The Developers</em> attacked Earth to kidnap Prime-Children and forge them into an army. Most abductees chose to fight back. Their resistance became the founding act of the Compass Alliance in 2023.
            </p>
          </div>
        </div>
      </GSAPReveal>

      {/* Recent events */}
      <GSAPReveal className="max-w-5xl mx-auto px-4 pb-16" delay={0.15}>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">Mission Archive</h2>
          <div className="flex-1 h-px bg-white/10" />
          <Link href="/events" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>All missions →</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {eventsCatalog.slice(0, 3).map(ev => (
            <Link key={ev.id} href={`/events/${ev.id}`} className="glass p-4 hover:bg-white/8 transition-colors group">
              <img src={ev.banner} alt={ev.title} className="w-full h-24 object-cover rounded-lg mb-3" />
              <p className="text-xs mb-1" style={{ color: 'var(--accent)' }}>{ev.date}</p>
              <h3 className="font-bold text-sm text-white group-hover:opacity-80">{ev.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{ev.location}</p>
            </Link>
          ))}
        </div>
      </GSAPReveal>
    </div>
  );
}
