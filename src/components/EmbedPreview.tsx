"use client";

import { useEffect } from "react";

type Props = {
  html: string;
  device: "mobile" | "desktop";
  onDeviceChange: (d: "mobile" | "desktop") => void;
};

export default function EmbedPreview({ html, device, onDeviceChange }: Props) {
  // TikTok's embed.js sizes the iframe from the blockquote's inline max-width
  // when it processes it, so we render one blockquote at the requested size,
  // and re-run embed.js on every change to (re)hydrate it.
  useEffect(() => {
    if (!html) return;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="tiktok.com/embed.js"]',
    );
    if (existing) existing.remove();
    const s = document.createElement("script");
    s.src = "https://www.tiktok.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, [html, device]);

  const adjustedHtml =
    device === "mobile"
      ? html.replace(/max-width:\s*\d+px/i, "max-width:325px")
      : html;

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="min-w-0 flex-1">
        <div
          key={`${html}-${device}`}
          className="mx-auto"
          style={{ maxWidth: device === "mobile" ? "325px" : "605px" }}
          dangerouslySetInnerHTML={{ __html: adjustedHtml }}
        />
      </div>
      <div className="flex shrink-0 flex-col gap-0.5 rounded-md border border-[color:var(--color-border)] bg-white p-0.5">
        <button
          type="button"
          onClick={() => onDeviceChange("mobile")}
          className={`rounded px-3 py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
            device === "mobile"
              ? "bg-zinc-100 text-foreground"
              : "text-[color:var(--color-muted)] hover:text-foreground"
          }`}
        >
          Mobile
        </button>
        <button
          type="button"
          onClick={() => onDeviceChange("desktop")}
          className={`rounded px-3 py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
            device === "desktop"
              ? "bg-zinc-100 text-foreground"
              : "text-[color:var(--color-muted)] hover:text-foreground"
          }`}
        >
          Desktop
        </button>
      </div>
    </div>
  );
}
