import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  dateRaw: string;
  keywords?: string;
  excerpt: string;
  mdxBody: string;
  draft: boolean;
};

const MDX_DIR = path.join(process.cwd(), "content", "blog");
const EXCERPT_LENGTH = 160;

function normalizeDate(raw: string): Date {
  const trimmed = raw.trim();
  if (trimmed === "") return new Date(0);
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) return parsed;
  return new Date(0);
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`]/g, " ");
}

function makeExcerpt(stripped: string): string {
  const cleaned = stripped.replace(/\s+/g, " ").trim();
  if (cleaned.length === 0) return "";
  if (cleaned.length <= EXCERPT_LENGTH) return cleaned;
  const slice = cleaned.slice(0, EXCERPT_LENGTH);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 80 ? slice.slice(0, lastSpace) : slice;
  return `${cut.replace(/[.,;:!?\-\s]+$/, "")}…`;
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  let entries: string[];
  try {
    entries = await fs.readdir(MDX_DIR);
  } catch {
    return [];
  }
  const mdxFiles = entries.filter((f) => f.endsWith(".mdx"));
  const posts: Post[] = [];
  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(MDX_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const draft = data.draft === true;
    if (draft) continue;
    const dateRaw = typeof data.date === "string" ? data.date : "";
    const date = dateRaw ? normalizeDate(dateRaw) : new Date(0);
    const description =
      typeof data.description === "string" ? data.description : "";
    const excerpt =
      description.trim().length > 0
        ? description
        : makeExcerpt(stripMarkdown(content));
    posts.push({
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      description,
      date,
      dateRaw,
      keywords: typeof data.keywords === "string" ? data.keywords : undefined,
      excerpt,
      mdxBody: content,
      draft,
    });
  }
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
});

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function formatPostDate(date: Date, fallback: string): string {
  if (date.getTime() === 0) return fallback;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function readingTime(mdx: string): string {
  const words = mdx.replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
