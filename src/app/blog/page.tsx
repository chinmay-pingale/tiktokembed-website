import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — TikTok Embed Tool",
  description:
    "Practical guides for embedding TikTok videos on your website: how to do it, why it works, and how to fix common problems.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — TikTok Embed Tool",
    description:
      "Practical guides for embedding TikTok videos on your website: how to do it, why it works, and how to fix common problems.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[color:var(--color-border)] bg-zinc-50">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="blog-grid"
                x="0"
                y="0"
                width="36"
                height="36"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="16"
                  y1="18"
                  x2="20"
                  y2="18"
                  stroke="rgba(0,0,0,0.07)"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
                <line
                  x1="18"
                  y1="16"
                  x2="18"
                  y2="20"
                  stroke="rgba(0,0,0,0.07)"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
          <div className="relative mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
            <div className="mb-5 inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-1.5 w-1.5 bg-foreground"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                Blog · {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>
            <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
              TikTok Embed, Explained
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[color:var(--color-muted)]">
              Practical guides for embedding TikTok videos on your website —
              how to do it, why it works, and how to fix it when it doesn&apos;t.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
            {posts.length === 0 ? (
              <p className="text-[color:var(--color-muted)]">No posts yet.</p>
            ) : (
              <ul className="flex flex-col gap-12">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
