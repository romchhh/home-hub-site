import type { Locale } from "@/lib/i18n";

export type ContactSocialId = "instagram" | "facebook";

export type ContactSocialLink = {
  id: ContactSocialId;
  href: string;
  label: string;
};

export type ContactMessengerLink = {
  id: "whatsapp";
  href: string;
  label: string;
};

/** Editable fields persisted in site_settings (JSON). */
export type ContactInfoStored = {
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  lat: number;
  lng: number;
  mapSearchQuery: string;
  /** Newline-separated display lines */
  hoursSv: string;
  hoursEn: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
  companyName: string;
  orgNr: string;
  taglineSv: string;
  taglineEn: string;
  heroShowroomTitleSv: string;
  heroShowroomTitleEn: string;
};

/** Resolved contact info used across the public site. */
export type ContactInfo = {
  phone: string;
  phoneDisplay: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  coordinates: { lat: number; lng: number };
  mapSearchQuery: string;
  hours: { sv: string[]; en: string[] };
  social: ContactSocialLink[];
  messengers: ContactMessengerLink[];
  companyName: string;
  orgNr: string;
  tagline: { sv: string; en: string };
  heroShowroomTitle: { sv: string; en: string };
};

const phoneEnv = process.env.NEXT_PUBLIC_SHOWROOM_PHONE?.trim() || "+46812345678";
const emailEnv = process.env.NEXT_PUBLIC_SHOWROOM_EMAIL?.trim() || "hello@homehub.se";
const whatsappEnv = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "";

export const defaultContactInfoStored: ContactInfoStored = {
  phone: phoneEnv,
  email: emailEnv,
  addressLine1: "Fredensvägen 4C",
  addressLine2: "174 53 Sundbyberg",
  country: "Sweden",
  lat: 59.3779,
  lng: 17.9692,
  mapSearchQuery: "Fredensvägen 4C, 174 53 Sundbyberg, Sweden",
  hoursSv: "Mån–fre: 10:00–18:00\nLör: 11:00–15:00\nSön: stängt",
  hoursEn: "Mon–Fri: 10:00–18:00\nSat: 11:00–15:00\nSun: closed",
  instagramUrl: "https://www.instagram.com/homehub",
  facebookUrl: "https://www.facebook.com/homehub",
  whatsappUrl: whatsappEnv,
  companyName: "Home Hub Stockholm AB",
  orgNr: "556218-7475",
  taglineSv: "Kvalitet, design och karaktär för ditt hem.",
  taglineEn: "Quality, design and character for your home.",
  heroShowroomTitleSv: "Showroom 140 m² i Stockholm",
  heroShowroomTitleEn: "Showroom 140 m² in Stockholm",
};

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("46") && digits.length >= 10) {
    const national = digits.slice(2);
    const withLeading = national.startsWith("0") ? national : `0${national}`;
    const rest = withLeading.slice(1);
    const groups: string[] = [];
    let i = 0;
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
  return phone.replace(/\s+/g, " ").trim();
}

function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function mergeContactInfoStored(
  partial?: Partial<ContactInfoStored> | null,
): ContactInfoStored {
  const base = { ...defaultContactInfoStored };
  if (!partial) return base;

  for (const key of Object.keys(base) as (keyof ContactInfoStored)[]) {
    const value = partial[key];
    if (value === undefined || value === null) continue;
    if (typeof base[key] === "number") {
      const n = typeof value === "number" ? value : Number(value);
      if (Number.isFinite(n)) (base[key] as number) = n;
      continue;
    }
    (base[key] as string) = String(value).trim();
  }
  return base;
}

export function buildContactInfo(storedInput?: Partial<ContactInfoStored> | null): ContactInfo {
  const stored = mergeContactInfoStored(storedInput);
  const phone = stored.phone.replace(/\s/g, "") || defaultContactInfoStored.phone;
  const whatsappHref =
    stored.whatsappUrl ||
    `https://wa.me/${phone.replace(/\D/g, "")}`;

  const social: ContactSocialLink[] = [];
  if (stored.instagramUrl) {
    social.push({ id: "instagram", href: stored.instagramUrl, label: "Instagram" });
  }
  if (stored.facebookUrl) {
    social.push({ id: "facebook", href: stored.facebookUrl, label: "Facebook" });
  }

  return {
    phone,
    phoneDisplay: formatPhoneDisplay(stored.phone || phone),
    email: stored.email || defaultContactInfoStored.email,
    addressLine1: stored.addressLine1,
    addressLine2: stored.addressLine2,
    country: stored.country,
    coordinates: { lat: stored.lat, lng: stored.lng },
    mapSearchQuery:
      stored.mapSearchQuery ||
      `${stored.addressLine1}, ${stored.addressLine2}, ${stored.country}`,
    hours: {
      sv: splitLines(stored.hoursSv),
      en: splitLines(stored.hoursEn),
    },
    social,
    messengers: [{ id: "whatsapp", href: whatsappHref, label: "WhatsApp" }],
    companyName: stored.companyName,
    orgNr: stored.orgNr,
    tagline: { sv: stored.taglineSv, en: stored.taglineEn },
    heroShowroomTitle: {
      sv: stored.heroShowroomTitleSv,
      en: stored.heroShowroomTitleEn,
    },
  };
}

/** @deprecated Prefer getContactInfo() so admin overrides apply. */
export const contactInfo = buildContactInfo();

export function contactInfoToStored(info: ContactInfo): ContactInfoStored {
  return {
    phone: info.phone,
    email: info.email,
    addressLine1: info.addressLine1,
    addressLine2: info.addressLine2,
    country: info.country,
    lat: info.coordinates.lat,
    lng: info.coordinates.lng,
    mapSearchQuery: info.mapSearchQuery,
    hoursSv: info.hours.sv.join("\n"),
    hoursEn: info.hours.en.join("\n"),
    instagramUrl: info.social.find((s) => s.id === "instagram")?.href || "",
    facebookUrl: info.social.find((s) => s.id === "facebook")?.href || "",
    whatsappUrl: info.messengers.find((m) => m.id === "whatsapp")?.href || "",
    companyName: info.companyName,
    orgNr: info.orgNr,
    taglineSv: info.tagline.sv,
    taglineEn: info.tagline.en,
    heroShowroomTitleSv: info.heroShowroomTitle.sv,
    heroShowroomTitleEn: info.heroShowroomTitle.en,
  };
}

export function getShowroomHours(info: ContactInfo, locale: Locale): string[] {
  return info.hours[locale];
}

export function getMapsDirectionsUrl(info: ContactInfo): string {
  const q = encodeURIComponent(info.mapSearchQuery);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function getMapEmbedUrl(info: ContactInfo): string {
  const q = encodeURIComponent(info.mapSearchQuery);
  return `https://www.google.com/maps?q=${q}&z=16&output=embed`;
}

export function orgNrDigits(orgNr: string): string {
  return orgNr.replace(/\D/g, "");
}
