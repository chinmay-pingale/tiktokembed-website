import Link from "next/link";
import Logo from "./Logo";

export default function SiteNav() {
  return (
    <header className="border-b border-[color:var(--color-border)] bg-white">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          aria-label="TikTok Embed home"
          className="inline-flex items-center"
        >
          <Logo />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <span className="text-[color:var(--color-muted)]">
            by{" "}
            <a
              href="https://harloop.com"
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Harloop
            </a>
          </span>
        </nav>
      </div>
    </header>
  );
}
