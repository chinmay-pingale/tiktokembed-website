"use client";

import { useEffect, useRef, useState } from "react";
import CodeBlock from "./CodeBlock";
import EmbedPreview from "./EmbedPreview";

const DEFAULT_URL =
  "https://www.tiktok.com/@zachking/video/6749520869598481669";

type Result = {
  html: string;
  previewHtml: string;
  title?: string;
  authorName?: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "result"; result: Result }
  | { kind: "error"; message: string };

function MonoLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] ${className}`}
    >
      {children}
    </span>
  );
}

export default function EmbedTool() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");
  const userInteractedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/embed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: DEFAULT_URL }),
        });
        if (cancelled || userInteractedRef.current || !res.ok) return;
        const data = (await res.json()) as {
          html?: string;
          previewHtml?: string;
          title?: string;
          authorName?: string;
        };
        if (cancelled || userInteractedRef.current) return;
        if (data.html && data.previewHtml) {
          setStatus({
            kind: "result",
            result: {
              html: data.html,
              previewHtml: data.previewHtml,
              title: data.title,
              authorName: data.authorName,
            },
          });
        }
      } catch {
        // ignore — leave idle
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userInteractedRef.current = true;
    const trimmed = url.trim();
    if (!trimmed) {
      setStatus({ kind: "error", message: "Please paste a TikTok URL." });
      return;
    }

    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = (await res.json()) as {
        html?: string;
        previewHtml?: string;
        title?: string;
        authorName?: string;
        error?: string;
      };
      if (!res.ok || !data.html || !data.previewHtml) {
        setStatus({
          kind: "error",
          message: data.error ?? "Something went wrong.",
        });
        return;
      }
      setStatus({
        kind: "result",
        result: {
          html: data.html,
          previewHtml: data.previewHtml,
          title: data.title,
          authorName: data.authorName,
        },
      });
    } catch {
      setStatus({ kind: "error", message: "Network error. Try again." });
    }
  }

  const isLoading = status.kind === "loading";
  const result = status.kind === "result" ? status.result : null;

  return (
    <>
      <section className="relative overflow-hidden border-b border-[color:var(--color-border)] bg-zinc-50">
        {/* Blueprint cross-grid backdrop */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="utilitarian-grid"
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
          <rect width="100%" height="100%" fill="url(#utilitarian-grid)" />
        </svg>

        <div className="relative mx-auto w-full max-w-4xl px-6 py-20 text-center sm:px-8 sm:py-28">
          <div className="mb-6 inline-flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-1.5 w-1.5 bg-foreground"
            />
            <MonoLabel className="text-foreground">
              TikTok Embed Tool · v1
            </MonoLabel>
          </div>

          <h1 className="text-5xl font-medium tracking-tight md:text-6xl">
            Paste-able TikTok Embed Code
          </h1>
          <p className="mt-4 text-lg text-[color:var(--color-muted)]">
            Paste any TikTok link to get clean, copy-paste embed HTML.
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="url"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder="https://www.tiktok.com/@zachking/video/6749520869598481669"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="h-14 flex-1 rounded-md border border-[color:var(--color-border)] bg-white px-5 text-base outline-none transition-colors placeholder:text-[color:var(--color-muted)] focus:border-foreground disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-14 items-center justify-center rounded-md bg-foreground px-7 font-mono text-xs uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? "Fetching" : "Get Code"}
            </button>
          </form>

          {status.kind === "error" && (
            <p
              role="alert"
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{ color: "#B91C1C" }}
            >
              {status.message}
            </p>
          )}
        </div>
      </section>

      {result && (
        <section className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
            {/* Metadata strip */}
            <div className="mb-8 flex flex-col gap-4 border-b border-[color:var(--color-border)] pb-6 sm:flex-row sm:items-baseline sm:gap-12">
              {result.title && (
                <div>
                  <MonoLabel>Title</MonoLabel>
                  <div className="mt-1 text-base font-medium text-foreground">
                    {result.title}
                  </div>
                </div>
              )}
              {result.authorName && (
                <div>
                  <MonoLabel>Author</MonoLabel>
                  <div className="mt-1 text-base text-foreground">
                    {result.authorName}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex flex-col gap-3 self-start">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 bg-foreground"
                  />
                  <MonoLabel>Embed Code</MonoLabel>
                </div>
                <CodeBlock code={result.html} />
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  Source ·{" "}
                  <a
                    href="https://developers.tiktok.com/doc/embed-videos/"
                    target="_blank"
                    rel="noopener"
                    className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    developers.tiktok.com/doc/embed-videos
                  </a>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                  <MonoLabel>Preview · Live</MonoLabel>
                </div>
                <EmbedPreview
                  html={result.previewHtml}
                  device={device}
                  onDeviceChange={setDevice}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
