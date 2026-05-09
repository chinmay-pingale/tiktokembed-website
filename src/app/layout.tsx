import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary",
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
