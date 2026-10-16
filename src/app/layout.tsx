import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { getSiteUrl, siteName } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1a17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: "Showroom i Stockholm — ytterdörrar, innerdörrar, dolda dörrar och golv.",
  applicationName: siteName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
  other: {
    "geo.region": "SE-AB",
    "geo.placename": "Sundbyberg",
    "geo.position": "59.3779;17.9692",
    ICBM: "59.3779, 17.9692",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Default lang; locale routes update via LocaleHtmlLang (avoids headers() → keeps SSG).
  return (
    <html lang="sv" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
