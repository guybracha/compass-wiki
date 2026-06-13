import type { Metadata } from "next";
import "./globals.css";
import WikiNav from "@/components/WikiNav";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Compass World Wiki",
  description: "The official wiki for the Compass World superhero universe — characters, events, locations, and history.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
