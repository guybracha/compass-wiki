import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prime-Children',
  description: 'All 72 registered Prime-Children in the Compass World universe — heroes, villains, and independents with extraordinary powers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
