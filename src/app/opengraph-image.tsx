import { ImageResponse } from "next/og";

export const alt =
  "TikTok Embed Tool — Paste any TikTok link to get clean embed HTML";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        {/* Cross-grid backdrop */}
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
        <div
          style={{ display: "flex", alignItems: "center", gap: "14px" }}
        >
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
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
              fontSize: "26px",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ fontWeight: 600 }}>TikTok Embed</span>
            <span
              style={{
                marginLeft: "10px",
                fontWeight: 300,
                color: "#525252",
              }}
            >
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
            marginBottom: "28px",
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
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#525252",
            }}
          >
            Free Tool · Built by Harloop
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "92px",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
          }}
        >
          <span>Paste-able TikTok</span>
          <span>Embed Code.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: "32px",
            fontSize: "28px",
            color: "#525252",
            maxWidth: "900px",
            display: "flex",
          }}
        >
          Paste any TikTok link to get clean, copy-paste embed HTML.
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Footer strip */}
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
          {/* Mini logo on the left */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path
                d="M 8 8 L 3 16 L 8 24"
                stroke="#525252"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 24 8 L 29 16 L 24 24"
                stroke="#525252"
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
                stroke="#525252"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span style={{ color: "#525252" }}>TikTok Embed Tool</span>
          </div>
          <span style={{ color: "#0A0A0A", fontWeight: 600 }}>By Harloop</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
