import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Posters, key art, and concept explorations from the Compass World superhero universe.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
