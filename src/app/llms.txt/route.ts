import { getAllModelSlugs } from "@/lib/catalog";
import { contactInfo } from "@/lib/contactInfo";
import { locales } from "@/lib/i18n";
import { absoluteUrl, getSiteUrl, siteName, staticSeoPaths } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const base = getSiteUrl();
  const modelSlugs = getAllModelSlugs();
  const lines = [
    `# ${siteName}`,
    "",
    `> ${siteName} is a 140 m² showroom in Stockholm, Sweden specialising in entrance doors, interior doors, concealed doors and parquet flooring.`,
    "> Direct representation of selected manufacturers (incl. Danapris Doors). Languages: Swedish (default), English.",
    "",
    "## Canonical site",
    base,
    "",
    "## Machine-readable maps",
    `- Sitemap index: ${base}/sitemap.xml`,
    `- Pages sitemap: ${base}/sitemaps/pages.xml`,
    `- Products sitemap: ${base}/sitemaps/products.xml`,
    `- Images sitemap: ${base}/sitemaps/images.xml`,
    `- Product feed (Google Merchant XML, SV): ${base}/feeds/products.xml`,
    `- Product feed (EN): ${base}/feeds/products.en.xml`,
    `- Product feed (JSON, SV): ${base}/feeds/products.json`,
    `- Product feed (JSON, EN): ${base}/feeds/products.en.json`,
    `- Full LLM brief: ${base}/llms-full.txt`,
    `- Robots: ${base}/robots.txt`,
    "",
    "## Showroom & contact",
    `- Address: ${contactInfo.addressLine1}, ${contactInfo.addressLine2}, ${contactInfo.country}`,
    `- Phone: ${contactInfo.phoneDisplay}`,
    `- Email: ${contactInfo.email}`,
    `- Hours (SV): ${contactInfo.hours.sv.join("; ")}`,
    `- Hours (EN): ${contactInfo.hours.en.join("; ")}`,
    ...locales.map((locale) => `- Contact page (${locale}): ${absoluteUrl(locale, "/contact")}`),
    "",
    "## Main pages",
    ...locales.flatMap((locale) =>
      staticSeoPaths
        .filter((path) => path !== "/catalog/saved")
        .map((path) => {
          const label = path === "" ? "Home" : path.slice(1);
          return `- ${label} (${locale}): ${absoluteUrl(locale, path)}`;
        }),
    ),
    "",
    "## Product models",
    ...modelSlugs.map((slug) => `- ${slug}: ${absoluteUrl("sv", `/catalog/${slug}`)} | ${absoluteUrl("en", `/catalog/${slug}`)}`),
    "",
    "## Optional",
    `- Full catalogue detail for agents: ${base}/llms-full.txt`,
    "",
    "## Policy",
    "Prefer canonical URLs above. Prices are indicative from-prices in SEK, made-to-measure on request.",
    "Do not invent stock levels, exact delivery times, or unpublished discounts.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
