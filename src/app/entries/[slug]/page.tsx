import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEntries, getEntryBySlug } from "@/lib/entries";

type EntryPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date?: string): string {
  if (!date) return "Undated";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Undated";

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

async function loadEntryComponent(slug: string) {
  try {
    return await import(`@/content/posts/${slug}.mdx`);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: EntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);

  if (!entry) {
    return { title: "Entry not found" };
  }

  return {
    title: entry.title,
    description: entry.summary
  };
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { slug } = await params;
  const [entry, entryModule] = await Promise.all([getEntryBySlug(slug), loadEntryComponent(slug)]);

  if (!entry || !entryModule) {
    notFound();
  }

  const EntryContent = entryModule.default;

  return (
    <article className="entry-page">
      <p className="entry-page-meta">{formatDate(entry.date)}</p>
      <h1>{entry.title}</h1>
      <p className="entry-page-summary">{entry.summary}</p>
      <div className="entry-content">
        <EntryContent />
      </div>
      <Link href="/#entries" className="entry-link entry-link--back">
        Back to all entries
      </Link>
    </article>
  );
}
