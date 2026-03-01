import Link from "next/link";
import { getAllEntries } from "@/lib/entries";

function formatDate(date?: string): string {
  if (!date) return "Undated";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Undated";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default async function HomePage() {
  const entries = await getAllEntries();

  return (
    <div className="entry-feed-page">
      <section className="home-hero" aria-label="Site introduction">
        <p className="hero-eyebrow">SCROLLING ENTRIES</p>
        <h2 className="hero-title">One page, every post previewed.</h2>
        <p className="lead">Each card is generated from an MDX file and links to a full entry page.</p>
      </section>

      <section id="entries" className="entry-grid" aria-label="Entry previews">
        {entries.map((entry, index) => (
          <article key={entry.slug} className="entry-card" style={{ ["--card-index" as string]: String(index) }}>
            <div className="entry-card-top">
              <p className="entry-meta">{formatDate(entry.date)}</p>
              <p className="entry-slug">{entry.slug.replace(/-/g, " ")}</p>
            </div>
            <h3 className="entry-title">{entry.title}</h3>
            <p className="entry-summary">{entry.summary}</p>
            <Link href={`/entries/${entry.slug}`} className="entry-link">
              Open entry
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
