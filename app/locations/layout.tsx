import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlas',
  description: '9 significant locations across the Compass World — from the underground UnderCity to the floating island nation of Pacifia.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
