import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Mission logs and key events in the Compass World — battles, invasions, and turning points that shaped the superhero universe.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
