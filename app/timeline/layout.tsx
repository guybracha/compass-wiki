import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'The complete chronology of the Compass World — from 750 BC to the formation of the Compass Alliance in 2023.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
