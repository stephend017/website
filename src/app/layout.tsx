import type { Metadata } from "next";
import CommandPalette from "@/components/command-palette";
import { getAllEntries } from "@/lib/entries";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stephen",
    template: "%s | Stephen"
  },
  description: "A scrolling collection of MDX entries with dedicated detail pages."
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const entries = await getAllEntries();
  const commandItems = [
    { label: "Home", href: "/", detail: "Main feed", group: "pages" as const },
    { label: "About", href: "/about", detail: "Profile and approach", group: "pages" as const },
    { label: "Projects", href: "/projects", detail: "Project list", group: "pages" as const },
    ...entries.map((entry) => ({
      label: entry.title,
      href: `/entries/${entry.slug}`,
      detail: entry.slug,
      group: "entries" as const
    }))
  ];

  return (
    <html lang="en">
      <body>
        <main className="site-main">
          <div className="site-title-row">
            <h1 className="site-title">Stephen</h1>
            <CommandPalette items={commandItems} />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
