"use client";

import { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";

type Props = {
  code: string;
};

export default function CodeBlock({ code }: Props) {
  const [copied, setCopied] = useState(false);
  const highlighted = Prism.highlight(code, Prism.languages.markup, "markup");
  const byteCount = new Blob([code]).size;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked; ignore silently
    }
  }

  return (
    <div className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-white">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border)] bg-zinc-50 px-3 py-2">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          <span className="text-foreground">embed.html</span>
          <span className="tnum">{byteCount} B</span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy embed code"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] transition-colors hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-[160px] overflow-auto whitespace-pre-wrap break-words bg-white px-4 py-3 font-mono text-[12.5px] leading-6">
        <code
          className="language-markup"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
