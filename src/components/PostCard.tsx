import Link from "next/link";
import type { Post } from "@/lib/blog";
import { formatPostDate, readingTime } from "@/lib/blog";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-t border-[color:var(--color-border)] pt-8 transition-opacity hover:opacity-80"
    >
      <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
        <span>{formatPostDate(post.date, post.dateRaw)}</span>
        <span aria-hidden>·</span>
        <span>{readingTime(post.mdxBody)}</span>
      </div>
      <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)]">
          {post.excerpt}
        </p>
      )}
      <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
        Read
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
