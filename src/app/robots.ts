import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/llms.txt",
          "/llms-full.txt",
          "/feeds/products.xml",
          "/feeds/products.en.xml",
          "/feeds/products.json",
          "/feeds/products.en.json",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/*/catalog/saved",
          "/catalog/saved",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/feeds/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/feeds/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/feeds/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/feeds/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/feeds/"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/feeds/"],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemaps/pages.xml`,
      `${siteUrl}/sitemaps/products.xml`,
      `${siteUrl}/sitemaps/images.xml`,
    ],
    host: siteUrl.replace(/^https?:\/\//, ""),
  };
}
