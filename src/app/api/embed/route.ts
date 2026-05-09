import {
  fetchTikTokOEmbed,
  isTikTokUrl,
  wrapWithHarloopAttribution,
} from "@/lib/tiktok";

export async function POST(req: Request) {
  let body: { url?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const url = typeof body?.url === "string" ? body.url.trim() : "";
  if (!url) {
    return Response.json(
      { error: "Please paste a TikTok URL." },
      { status: 400 },
    );
  }

  if (!isTikTokUrl(url)) {
    return Response.json(
      { error: "That doesn't look like a TikTok link." },
      { status: 400 },
    );
  }

  try {
    const oembed = await fetchTikTokOEmbed(url);
    const html = wrapWithHarloopAttribution(oembed.html);
    return Response.json({
      html,
      previewHtml: oembed.html,
      title: oembed.title,
      authorName: oembed.author_name,
    });
  } catch {
    return Response.json(
      { error: "Couldn't fetch that embed. Double-check the link." },
      { status: 502 },
    );
  }
}
