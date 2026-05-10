import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-[color:var(--color-muted)] sm:flex-row sm:px-8">
        <span>© {year} TikTok Embed</span>
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <span>
            Built by{" "}
            <a
              href="https://harloop.com"
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Harloop
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
