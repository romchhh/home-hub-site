import { getModels } from "@/lib/catalog";
import { isPricePublished } from "@/lib/formatPrice";
import { absoluteMediaUrl } from "@/lib/seo/absoluteMedia";
import { absoluteUrl, getSiteUrl, siteName } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function productType(category: string, locale: Locale): string {
  const map: Record<string, { sv: string; en: string }> = {
    entrance: { sv: "Dörrar > Ytterdörrar", en: "Doors > Entrance doors" },
    interior: { sv: "Dörrar > Innerdörrar", en: "Doors > Interior doors" },
    hidden: { sv: "Dörrar > Dolda dörrar", en: "Doors > Hidden doors" },
    flooring: { sv: "Golv > Parkett", en: "Flooring > Parquet" },
  };
  const entry = map[category];
  if (!entry) return locale === "sv" ? "Dörrar" : "Doors";
  return locale === "sv" ? entry.sv : entry.en;
}

/** Google Merchant / shopping-style RSS product feed (Swedish catalogue). */
export function buildGoogleProductFeedXml(locale: Locale = "sv"): string {
  const models = getModels(locale);
  const base = getSiteUrl();
  const now = new Date().toUTCString();
  const title =
    locale === "sv"
      ? `${siteName} — produktkatalog`
      : `${siteName} — product catalogue`;

  const items = models
    .filter((model) => isPricePublished(model.priceSek))
    .map((model) => {
      const link = absoluteUrl(locale, `/catalog/${model.slug}`);
      const image = absoluteMediaUrl(model.image);
      const additional = model.gallery
        .filter((g) => g && g !== model.image)
        .slice(0, 9)
        .map(
          (g) =>
            `      <g:additional_image_link>${escapeXml(absoluteMediaUrl(g))}</g:additional_image_link>`,
        )
        .join("\n");
      const description = [model.description, model.material, model.finish]
        .filter(Boolean)
        .join(" — ")
        .slice(0, 5000);

      return `    <item>
      <g:id>${escapeXml(model.slug)}</g:id>
      <g:title>${escapeXml(model.name)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(image)}</g:image_link>
${additional ? `${additional}\n` : ""}      <g:availability>preorder</g:availability>
      <g:price>${model.priceSek.toFixed(2)} SEK</g:price>
      <g:brand>${escapeXml(siteName)}</g:brand>
      <g:condition>new</g:condition>
      <g:product_type>${escapeXml(productType(model.category, locale))}</g:product_type>
      <g:google_product_category>${
        model.category === "flooring" ? "632" : "464"
      }</g:google_product_category>
      <g:identifier_exists>false</g:identifier_exists>
      <g:custom_label_0>${escapeXml(model.category)}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(model.label)}</g:custom_label_1>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(base)}</link>
    <description>${escapeXml(
      locale === "sv"
        ? "Produktfeed för Home Hub showroom — dörrar och golv. Måttanpassning på förfrågan."
        : "Product feed for Home Hub showroom — doors and flooring. Made-to-measure on request.",
    )}</description>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

export function buildProductFeedJson(locale: Locale = "sv") {
  const models = getModels(locale);
  return {
    generatedAt: new Date().toISOString(),
    locale,
    currency: "SEK",
    site: getSiteUrl(),
    count: models.length,
    products: models.map((model) => ({
      id: model.slug,
      name: model.name,
      description: model.description,
      category: model.category,
      label: model.label,
      material: model.material,
      finish: model.finish,
      hardware: model.hardware,
      ...(isPricePublished(model.priceSek) ? { priceSek: model.priceSek } : {}),
      url: absoluteUrl(locale, `/catalog/${model.slug}`),
      urlEn: absoluteUrl("en", `/catalog/${model.slug}`),
      urlSv: absoluteUrl("sv", `/catalog/${model.slug}`),
      image: absoluteMediaUrl(model.image),
      gallery: model.gallery.map(absoluteMediaUrl),
      colors: model.colors,
    })),
  };
}
