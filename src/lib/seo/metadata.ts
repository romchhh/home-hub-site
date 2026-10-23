import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { absoluteMediaUrl } from "@/lib/seo/absoluteMedia";
import { absoluteUrl, getSiteUrl, languageAlternates, siteName } from "@/lib/site";

export const defaultOgImage = "/images/hero.png";

export const siteKeywords = {
  sv: [
    "dörrar Stockholm",
    "innerdörrar",
    "ytterdörrar",
    "dolda dörrar",
    "parkett",
    "showroom Stockholm",
    "Sundbyberg",
    "HOME HUB",
    "Danapris Doors",
    "Straj",
    "golv Stockholm",
  ],
  en: [
    "doors Stockholm",
    "interior doors",
    "entrance doors",
    "concealed doors",
    "parquet",
    "showroom Stockholm",
    "Sundbyberg",
    "HOME HUB",
    "Danapris Doors",
    "Straj",
    "flooring Stockholm",
  ],
} as const;

type PageMetadataInput = {
  locale: Locale;
  /** Path without locale, e.g. `/about` or empty for home */
  path?: string;
  title: string;
  description: string;
  noIndex?: boolean;
  /** Relative or absolute image for OG/Twitter */
  image?: string;
  keywords?: string[];
  ogType?: "website" | "article";
};

/** Strip trailing brand suffixes so we never emit "… | Home Hub | HOME HUB". */
function withSiteBrand(title: string): string {
  const cleaned = title
    .replace(/\s*[|·–-]\s*(HOME\s*HUB|Home\s*Hub)\s*$/i, "")
    .trim();
  if (!cleaned) return siteName;
  return `${cleaned} | ${siteName}`;
}

function clampDescription(text: string, max = 160): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  const cut = compact.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return `${(at > 80 ? cut.slice(0, at) : cut).trimEnd()}…`;
}

export function createPageMetadata({
  locale,
  path = "",
  title,
  description,
  noIndex = false,
  image = defaultOgImage,
  keywords,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(locale, path);
  const ogLocale = locale === "sv" ? "sv_SE" : "en_GB";
  const fullTitle = withSiteBrand(title);
  const metaDescription = clampDescription(description);
  const imageUrl = absoluteMediaUrl(image);
  const resolvedKeywords = keywords ?? [...siteKeywords[locale]];

  return {
    title: { absolute: fullTitle },
    description: metaDescription,
    keywords: resolvedKeywords,
    applicationName: siteName,
    authors: [{ name: siteName, url: getSiteUrl() }],
    creator: siteName,
    publisher: siteName,
    category: "Home & Construction",
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical,
      languages: languageAlternates(path),
      types: {
        "text/plain": [
          { url: "/llms.txt", title: "llms.txt" },
          { url: "/llms-full.txt", title: "llms-full.txt" },
        ],
        "application/xml": [
          { url: "/feeds/products.xml", title: "Product feed (Google Merchant XML)" },
        ],
        "application/json": [
          { url: "/feeds/products.json", title: "Product feed (JSON)" },
        ],
      },
    },
    openGraph: {
      type: ogType,
      locale: ogLocale,
      alternateLocale: locale === "sv" ? ["en_GB"] : ["sv_SE"],
      url: canonical,
      siteName,
      title: fullTitle,
      description: metaDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [{ url: imageUrl, alt: fullTitle }],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false, noimageindex: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
  };
}
