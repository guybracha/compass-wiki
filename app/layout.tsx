import type { Metadata } from "next";
import "./globals.css";
import WikiNav from "@/components/WikiNav";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "@/components/ScrollToTop";

const BASE_URL = 'https://compass-wiki.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Compass World Wiki',
    template: '%s | Compass World Wiki',
  },
  description: 'The official wiki for the Compass World superhero universe — characters, events, locations, and history.',
  keywords: ['Compass World', 'superhero', 'wiki', 'Prime-Children', 'Compass Alliance'],
  authors: [{ name: 'Guy Bracha' }],
  openGraph: {
    type: 'website',
    siteName: 'Compass World Wiki',
    title: 'Compass World Wiki',
    description: 'The official wiki for the Compass World superhero universe — characters, events, locations, and history.',
    url: BASE_URL,
    images: [{ url: '/contents/gallery/UniteCol-min.webp', width: 1200, height: 630, alt: 'Compass World Wiki' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compass World Wiki',
    description: 'The official wiki for the Compass World superhero universe.',
    images: ['/contents/gallery/UniteCol-min.webp'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <WikiNav />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/5 py-6 text-center text-sm text-gray-500">
            <p>Compass World Wiki &copy; {new Date().getFullYear()} &mdash; Created by Guy Bracha</p>
          </footer>
          <Analytics />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
