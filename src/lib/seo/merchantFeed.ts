/** Defaults aligned with leveranspolicy (produktion 4–12 v, frakt SE). */
export const MERCHANT_SHIPPING_COUNTRY = "SE";
export const MERCHANT_SHIPPING_SERVICE = "Standard";
/** Flat shipping shown in Merchant feed (SEK). Override with MERCHANT_SHIPPING_SEK. */
export const MERCHANT_SHIPPING_PRICE_SEK = Number(
  process.env.MERCHANT_SHIPPING_SEK?.trim() || "990",
);
/** Production / handling before dispatch (business days). */
export const MERCHANT_MIN_HANDLING_DAYS = 20;
export const MERCHANT_MAX_HANDLING_DAYS = 60;
/** Transit within Sweden (business days). */
export const MERCHANT_MIN_TRANSIT_DAYS = 1;
export const MERCHANT_MAX_TRANSIT_DAYS = 5;
/** Calendar days ahead for preorder availability_date (~8 weeks). */
export const MERCHANT_AVAILABILITY_DAYS_AHEAD = 56;

export function merchantShippingPriceSek(): number {
  const n = MERCHANT_SHIPPING_PRICE_SEK;
  return Number.isFinite(n) && n >= 0 ? n : 990;
}

/** ISO 8601 for Google Merchant (max 25 chars), e.g. 2026-05-05T12:00Z */
export function merchantAvailabilityDate(
  daysAhead: number = MERCHANT_AVAILABILITY_DAYS_AHEAD,
  from: Date = new Date(),
): string {
  const d = new Date(from.getTime());
  d.setUTCDate(d.getUTCDate() + daysAhead);
  d.setUTCHours(12, 0, 0, 0);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}T12:00Z`;
}

/** Human-readable estimate for the product landing page (Merchant preorder requirement). */
export function merchantAvailabilityLabel(locale: "sv" | "en", from: Date = new Date()): string {
  const d = new Date(from.getTime());
  d.setUTCDate(d.getUTCDate() + MERCHANT_AVAILABILITY_DAYS_AHEAD);
  const formatted = new Intl.DateTimeFormat(locale === "sv" ? "sv-SE" : "en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
  return locale === "sv"
    ? `Beräknad leverans från ${formatted} (tillverkas på beställning)`
    : `Estimated delivery from ${formatted} (made to order)`;
}
