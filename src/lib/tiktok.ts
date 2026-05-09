export type TikTokOEmbed = {
  html: string;
  author_name?: string;
  author_url?: string;
  title?: string;
  thumbnail_url?: string;
};

const TIKTOK_HOSTS = new Set([
  "tiktok.com",
  "www.tiktok.com",
  "m.tiktok.com",
  "vm.tiktok.com",
  "vt.tiktok.com",
]);

export function isTikTokUrl(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
  return TIKTOK_HOSTS.has(parsed.hostname.toLowerCase());
}

export async function fetchTikTokOEmbed(url: string): Promise<TikTokOEmbed> {
  const endpoint = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
  const res = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`oEmbed request failed: ${res.status}`);
  }
  const data = (await res.json()) as TikTokOEmbed;
  if (!data?.html) {
    throw new Error("oEmbed response missing html");
  }
  return data;
}

export function wrapWithHarloopAttribution(oembedHtml: string): string {
  return [
    `<div class="harloop-embed" style="max-width:605px;">`,
    `  ${oembedHtml.trim()}`,
    `  <a href="https://harloop.com" target="_blank" rel="noopener" style="font-size:12px;color:#666;text-decoration:none;display:inline-block;margin-top:8px;">Powered by harloop.com</a>`,
    `</div>`,
  ].join("\n");
}
