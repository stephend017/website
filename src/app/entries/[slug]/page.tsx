"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";

type Entry = {
  slug: string;
  title: string;
  date?: string;
  summary: string;
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

async function fetchEntry(slug: string) {
  try {
    const res = await fetch(`/api/entries/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default function EntryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [entry, setEntry] = useState<Entry | null>(null);
  const [EntryComponent, setEntryComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const entryData = await fetchEntry(slug);
        const mdxModule = await loadEntryComponent(slug);

        if (!entryData || !mdxModule) {
          setNotFoundFlag(true);
          return;
        }

        setEntry(entryData);
        setEntryComponent(() => mdxModule.default);
      } catch (error) {
        setNotFoundFlag(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (notFoundFlag) {
    notFound();
  }

  if (isLoading) {
    return <div className="entry-page">Loading...</div>;
  }

  if (!entry || !EntryComponent) {
    notFound();
  }

  return (
    <article className="entry-page">
      <div className="entry-card-top">
        <p className="entry-page-meta">{formatDate(entry.date)}</p>
        <p className="entry-slug">{entry.slug.replace(/-/g, " ")}</p>
      </div>
      <h1 className="entry-page-title">{entry.title}</h1>
      <p className="entry-page-summary">{entry.summary}</p>
      <div className="entry-content">
        <EntryComponent />
      </div>
      <Link href="/#entries" className="entry-link entry-link--back">
        Back to all entries
      </Link>
    </article>
  );
}
