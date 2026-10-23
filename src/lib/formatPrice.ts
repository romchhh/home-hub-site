import type { Locale } from "@/lib/i18n";

/** Prices are hidden on the site until a positive amount is set (e.g. in admin). */
export function isPricePublished(sek: number): boolean {
  return sek > 0;
}

export function formatDoorPrice(locale: Locale, sek: number, options?: { perSqm?: boolean }): string {
  const formatted = new Intl.NumberFormat(locale === "en" ? "en-SE" : "sv-SE", {
    maximumFractionDigits: 0,
  }).format(sek);
  const base = locale === "en" ? `SEK ${formatted}` : `${formatted} kr`;
  if (options?.perSqm) {
    return locale === "en" ? `${base}/m²` : `${base}/m²`;
  }
  return base;
}

/** Formatted price with VAT suffix, or null when not published. */
export function formatPublishedPrice(
  locale: Locale,
  sek: number,
  options?: { perSqm?: boolean; withFromPrefix?: boolean; fromLabel?: string },
): string | null {
  if (!isPricePublished(sek)) return null;
  const amount = formatDoorPrice(locale, sek, options);
  const vat = locale === "en" ? "incl. VAT" : "inkl. moms";
  const core = options?.withFromPrefix && options.fromLabel ? `${options.fromLabel} ${amount}` : amount;
  return `${core} ${vat}`;
}

