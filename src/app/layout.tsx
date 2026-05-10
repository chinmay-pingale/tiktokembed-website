import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiktokembed.harloop.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TikTok Embed — Get embed code from any TikTok link",
  description:
    "TikTok Embed is a free tool to grab clean, copy-paste embed HTML from any TikTok video. Paste a link, copy the code, drop it in your site. Built by harloop.",
  applicationName: "TikTok Embed",
  openGraph: {
    title: "TikTok Embed — Get embed code from any TikTok link",
    description:
      "Paste any TikTok link to get clean, copy-paste embed HTML. Free tool by harloop.",
    siteName: "TikTok Embed",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Embed — Get embed code from any TikTok link",
    description:
      "Paste any TikTok link to get clean, copy-paste embed HTML. Free tool by harloop.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
