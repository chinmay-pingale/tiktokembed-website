import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxBody from "@/components/MdxBody";
import PostCard from "@/components/PostCard";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { formatPostDate, getAllPosts, getPost, readingTime } from "@/lib/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://tiktokembed.harloop.com";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found — TikTok Embed Tool" };
  const description = post.description || post.excerpt;
  const ogImagePath = `/blog/${post.slug}/opengraph-image`;
  return {
    title: `${post.title} — TikTok Embed Tool`,
    description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime:
        post.date.getTime() === 0 ? undefined : post.date.toISOString(),
      images: [ogImagePath],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImagePath],
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const more = [...all.slice(idx + 1), ...all.slice(0, idx)].slice(0, 2);
  const description = post.description || post.excerpt;

  const blogPostingLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "TikTok Embed Tool",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
  };
  if (post.date.getTime() !== 0) {
    blogPostingLd.datePublished = post.date.toISOString();
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-[760px] px-6 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
          />
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] transition-opacity hover:opacity-70"
          >
            <span aria-hidden className="h-px w-6 bg-foreground" />
            Back to blog
          </Link>
          <h1 className="text-4xl font-medium leading-[1.15] tracking-tight sm:text-[2.5rem] sm:leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
            {formatPostDate(post.date, post.dateRaw)} ·{" "}
            {readingTime(post.mdxBody)}
          </p>
          <hr className="my-10 border-[color:var(--color-border)]" />
          <MdxBody source={post.mdxBody} />
        </article>

        {more.length > 0 && (
          <section className="border-t border-[color:var(--color-border)] bg-white">
            <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
              <div className="mb-8 inline-flex items-center gap-2.5">
                <span aria-hidden className="h-1.5 w-1.5 bg-foreground" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  More from the blog
                </span>
              </div>
              <ul className="flex flex-col gap-12">
                {more.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
