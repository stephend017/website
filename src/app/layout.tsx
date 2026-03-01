import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Your Name",
    template: "%s | Your Name"
  },
  description: "Personal website built with Next.js, TypeScript, Tailwind, and MDX."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="site-main">
          <header className="site-header">
            <h1 className="site-title">Your Name</h1>
            <nav className="site-nav">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
