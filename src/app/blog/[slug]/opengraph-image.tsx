import { ImageResponse } from "next/og";
import { formatPostDate, getPost } from "@/lib/blog";

export const alt = "TikTok Embed Tool blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

export default async function PostOgImage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title ?? "TikTok Embed Tool";
  const dateLabel = post ? formatPostDate(post.date, post.dateRaw) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAFAFA",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
          color: "#0A0A0A",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><line x1='18' y1='20' x2='22' y2='20' stroke='rgba(0,0,0,0.10)' stroke-width='1'/><line x1='20' y1='18' x2='20' y2='22' stroke='rgba(0,0,0,0.10)' stroke-width='1'/></svg>")`,
          }}
        />

        {/* Logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <path
              d="M 8 8 L 3 16 L 8 24"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 24 8 L 29 16 L 24 24"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="13"
              y="9"
              width="6"
              height="14"
              rx="2"
              stroke="#0A0A0A"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: "22px",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ fontWeight: 600 }}>TikTok Embed</span>
            <span style={{ marginLeft: "10px", fontWeight: 300, color: "#525252" }}>
              Tool
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "#0A0A0A",
              display: "flex",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "15px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#525252",
            }}
          >
            Blog · TikTok Embed Tool
          </span>
        </div>

        {/* Title — wraps naturally */}
        <div
          style={{
            display: "flex",
            fontSize: "68px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: "15px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <span style={{ color: "#525252" }}>{dateLabel}</span>
          <span style={{ color: "#0A0A0A", fontWeight: 600 }}>By Harloop</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
