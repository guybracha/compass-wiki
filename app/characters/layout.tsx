import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Characters',
  description: 'Every hero, villain, and Prime-Child in the Compass World universe — full profiles with powers, stats, and alliances.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
