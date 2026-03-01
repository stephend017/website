import { promises as fs } from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export type Entry = {
  slug: string;
  title: string;
  date?: string;
  summary: string;
};

type ParsedFrontmatter = {
  data: Record<string, string>;
  content: string;
};

function parseFrontmatter(source: string): ParsedFrontmatter {
  if (!source.startsWith("---")) {
    return { data: {}, content: source.trim() };
  }

  const endMarkerIndex = source.indexOf("\n---", 3);
  if (endMarkerIndex === -1) {
    return { data: {}, content: source.trim() };
  }

  const rawFrontmatter = source.slice(3, endMarkerIndex).trim();
  const content = source.slice(endMarkerIndex + 4).trim();
  const data: Record<string, string> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    if (key) data[key] = value;
  }

  return { data, content };
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+]\([^)]*\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSummary(content: string, explicitSummary?: string): string {
  if (explicitSummary) return explicitSummary;

  const plainText = stripMarkdown(content);
  if (!plainText) return "Open this entry to read more.";
  if (plainText.length <= 180) return plainText;
  return `${plainText.slice(0, 177).trimEnd()}...`;
}

export async function getAllEntries(): Promise<Entry[]> {
  const fileNames = await fs.readdir(POSTS_DIR);
  const mdxFileNames = fileNames.filter((fileName) => fileName.endsWith(".mdx"));

  const entries = await Promise.all(
    mdxFileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const filePath = path.join(POSTS_DIR, fileName);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data, content } = parseFrontmatter(fileContents);
      const title = data.title ?? slug.replace(/-/g, " ");

      return {
        slug,
        title,
        date: data.date,
        summary: buildSummary(content, data.summary)
      } satisfies Entry;
    })
  );

  return entries.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  const entries = await getAllEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
}
