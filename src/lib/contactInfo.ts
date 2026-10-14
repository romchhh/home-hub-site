import type { Locale } from "@/lib/i18n";

/** Showroom facts — update here or override via env where noted. */
const phoneRaw = process.env.NEXT_PUBLIC_SHOWROOM_PHONE?.trim() || "+46812345678";

function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // Swedish numbers: +46 (0)X XXX XXX XX for national format
  if (digits.startsWith("46") && digits.length >= 10) {
    const national = digits.slice(2);
    const withLeading = national.startsWith("0") ? national : `0${national}`;
    const rest = withLeading.slice(1);
    const groups: string[] = [];
    let i = 0;
    // First group 1–2 digits (area), then 3s
    if (rest.length >= 8) {
      groups.push(rest.slice(0, 1));
      i = 1;
      while (i < rest.length) {
        groups.push(rest.slice(i, i + 3));
        i += 3;
      }
      return `+46 (0)${groups.join(" ")}`;
    }
  }
  if (phone.startsWith("+")) return phone.replace(/\s+/g, " ").trim();
  return phoneRaw;
}

export const contactInfo = {
  phone: phoneRaw.replace(/\s/g, ""),
  phoneDisplay: formatPhoneDisplay(phoneRaw),
  email: process.env.NEXT_PUBLIC_SHOWROOM_EMAIL?.trim() || "hello@homehub.se",
  addressLine1: "Kungstensgatan 34",
  addressLine2: "113 59 Stockholm",
  country: "Sweden",
  /** For map links and embed marker (showroom area, Stockholm). */
  coordinates: { lat: 59.3431, lng: 18.0584 },
  mapSearchQuery: "Kungstensgatan 34, 113 59 Stockholm, Sweden",
  hours: {
    sv: ["Mån–fre: 10:00–18:00", "Lör: 11:00–15:00", "Sön: stängt"],
    en: ["Mon–Fri: 10:00–18:00", "Sat: 11:00–15:00", "Sun: closed"],
  },
  social: [
    { id: "instagram", href: "https://www.instagram.com/homehub", label: "Instagram" },
    { id: "facebook", href: "https://www.facebook.com/homehub", label: "Facebook" },
  ] as const,
  messengers: [
    {
      id: "whatsapp",
      href:
        process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() ||
        `https://wa.me/${phoneRaw.replace(/\D/g, "")}`,
      label: "WhatsApp",
    },
  ] as const,
};

export function getShowroomHours(locale: Locale): string[] {
  return contactInfo.hours[locale];
}

export function getMapsDirectionsUrl(): string {
  const q = encodeURIComponent(contactInfo.mapSearchQuery);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Google Maps embed for the showroom address (no API key required). */
export function getMapEmbedUrl(): string {
  const q = encodeURIComponent(contactInfo.mapSearchQuery);
  return `https://www.google.com/maps?q=${q}&z=16&output=embed`;
}
