import type { Locale } from "@/lib/i18n";
import { defaultLocale, locales } from "@/lib/i18n";

/** Public site origin without trailing slash. Set `NEXT_PUBLIC_SITE_URL` in production. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://home-hub.se";
}

export const siteName = "HOME HUB";

/** App path without locale prefix, e.g. `/catalog/oak-natural` or `` for home. */
export function localePathname(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return normalized === "/" ? "" : normalized;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  const pathname = localePathname(path);
  return `${getSiteUrl()}/${locale}${pathname}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(defaultLocale, path),
  };
  for (const locale of locales) {
    languages[locale === "sv" ? "sv-SE" : "en"] = absoluteUrl(locale, path);
  }
  return languages;
}

export const staticSeoPaths = [
  "",
  "/about",
  "/catalog",
  "/catalog/saved",
  "/contact",
  "/offers",
  "/partnerships",
  "/projects",
  "/services",
  "/integritetspolicy",
  "/kopvillkor",
  "/cookies",
] as const;
