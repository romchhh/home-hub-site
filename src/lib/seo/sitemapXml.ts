import { getModels } from "@/lib/catalog";
import { locales, type Locale } from "@/lib/i18n";
import { absoluteMediaUrl } from "@/lib/seo/absoluteMedia";
import { absoluteUrl, getSiteUrl, staticSeoPaths } from "@/lib/site";

/** Public indexable paths — exclude personal/saved state pages. */
export const indexableStaticPaths = staticSeoPaths.filter((p) => p !== "/catalog/saved");

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function hreflangLinks(path: string): string {
  const links = [
    { hreflang: "sv-SE", href: absoluteUrl("sv", path) },
    { hreflang: "en", href: absoluteUrl("en", path) },
    { hreflang: "x-default", href: absoluteUrl("sv", path) },
  ];
  return links
    .map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${escapeXml(l.href)}" />`,
    )
    .join("\n");
}

function urlEntry(opts: {
  loc: string;
  path: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  images?: { loc: string; title?: string; caption?: string }[];
}): string {
  const imageBlocks = (opts.images ?? [])
    .map((img) => {
      const title = img.title
        ? `\n      <image:title>${escapeXml(img.title)}</image:title>`
        : "";
      const caption = img.caption
        ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>`
        : "";
      return `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>${title}${caption}
    </image:image>`;
    })
    .join("\n");

  return `  <url>
    <loc>${escapeXml(opts.loc)}</loc>
${hreflangLinks(opts.path)}
    <lastmod>${opts.lastmod}</lastmod>
    <changefreq>${opts.changefreq}</changefreq>
    <priority>${opts.priority}</priority>${imageBlocks ? `\n${imageBlocks}` : ""}
  </url>`;
}

export function buildSitemapIndexXml(): string {
  const base = getSiteUrl();
  const now = new Date().toISOString();
  const children = [
    `${base}/sitemaps/pages.xml`,
    `${base}/sitemaps/products.xml`,
    `${base}/sitemaps/images.xml`,
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children
  .map(
    (loc) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;
}

export function buildPagesSitemapXml(): string {
  const lastmod = new Date().toISOString();
  const entries: string[] = [];

  for (const locale of locales) {
    for (const path of indexableStaticPaths) {
      entries.push(
        urlEntry({
          loc: absoluteUrl(locale as Locale, path),
          path,
          lastmod,
          changefreq: path === "" ? "weekly" : "monthly",
          priority: path === "" ? "1.0" : path === "/catalog" ? "0.9" : path === "/contact" ? "0.85" : "0.75",
        }),
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${entries.join("\n")}
</urlset>`;
}

export function buildProductsSitemapXml(): string {
  const lastmod = new Date().toISOString();
  const models = getModels("en");
  const entries: string[] = [];

  for (const locale of locales) {
    for (const model of models) {
      const path = `/catalog/${model.slug}`;
      const images = [model.image, ...model.gallery]
        .filter(Boolean)
        .map((key) => absoluteMediaUrl(key));
      const uniqueImages = [...new Set(images)].slice(0, 10).map((loc, i) => ({
        loc,
        title: i === 0 ? model.name : `${model.name} — ${i + 1}`,
        caption: model.description,
      }));

      entries.push(
        urlEntry({
          loc: absoluteUrl(locale as Locale, path),
          path,
          lastmod,
          changefreq: "weekly",
          priority: "0.85",
          images: uniqueImages,
        }),
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${entries.join("\n")}
</urlset>`;
}

export function buildImagesSitemapXml(): string {
  const lastmod = new Date().toISOString();
  const models = getModels("en");
  const entries: string[] = [];

  for (const locale of locales) {
    for (const model of models) {
      const path = `/catalog/${model.slug}`;
      const images = [...new Set([model.image, ...model.gallery].filter(Boolean).map(absoluteMediaUrl))].map(
        (loc, i) => ({
          loc,
          title: i === 0 ? model.name : `${model.name} — ${i + 1}`,
          caption: model.description,
        }),
      );

      entries.push(
        urlEntry({
          loc: absoluteUrl(locale as Locale, path),
          path,
          lastmod,
          changefreq: "monthly",
          priority: "0.7",
          images,
        }),
      );
    }
  }

  // Key marketing visuals tied to the home page
  for (const locale of locales) {
    const heroTitle =
      locale === "sv"
        ? "Showroom med dörrar och golv i Stockholm"
        : "Showroom with doors and flooring in Stockholm";
    entries.push(
      urlEntry({
        loc: absoluteUrl(locale as Locale, ""),
        path: "",
        lastmod,
        changefreq: "weekly",
        priority: "0.9",
        images: [
          {
            loc: absoluteMediaUrl("/images/hero.png"),
            title: heroTitle,
            caption: heroTitle,
          },
          {
            loc: absoluteMediaUrl("/images/floors/geometric/01.jpg"),
            title: locale === "sv" ? "Geometrisk parkett" : "Geometric parquet",
          },
          {
            loc: absoluteMediaUrl("/images/floors/chevron/01.jpg"),
            title: "Chevron",
          },
        ],
      }),
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${entries.join("\n")}
</urlset>`;
}

export const sitemapResponseHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=3600",
} as const;
