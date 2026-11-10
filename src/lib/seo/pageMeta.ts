import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { getContactInfo } from "@/lib/getContactInfo";
import { createPageMetadata } from "@/lib/seo/metadata";

type SeoFields = {
  path: string;
  title: string;
  description: string;
  noIndex?: true;
};

export type SeoPageKey =
  | "home"
  | "about"
  | "catalog"
  | "catalogSaved"
  | "contact"
  | "offers"
  | "partnerships"
  | "projects"
  | "services"
  | "privacy"
  | "terms"
  | "shipping"
  | "returns"
  | "cookies";

type Dict = ReturnType<typeof getDictionary>;

/** Keyword-focused titles for <title> / OG — independent of on-page H1 marketing copy. */
const seoCopy: Record<Exclude<SeoPageKey, "home">, (d: Dict, locale: Locale) => SeoFields> = {
  about: (_d, locale) => ({
    path: "/about",
    title:
      locale === "sv"
        ? "Om oss — showroom för dörrar och golv i Stockholm"
        : "About us — door and flooring showroom in Stockholm",
    description: _d.about.lead,
  }),
  catalog: (d, locale) => ({
    path: "/catalog",
    title:
      locale === "sv"
        ? "Katalog — innerdörrar, ytterdörrar, dolda dörrar och golv"
        : "Catalogue — interior doors, entrance doors, hidden doors and flooring",
    description: d.catalog.lead,
  }),
  catalogSaved: (d) => ({
    path: "/catalog/saved",
    title: `${d.savedPage.title} ${d.savedPage.titleEm}`.replace(/\s+/g, " ").trim(),
    description: d.savedPage.lead,
    noIndex: true,
  }),
  contact: (d, locale) => {
    const contact = getContactInfo();
    const place = contact.addressLine2 || contact.addressLine1;
    return {
      path: "/contact",
      title:
        locale === "sv"
          ? `Kontakt — showroom ${place}`
          : `Contact — showroom ${place}`,
      description: d.contactPage.lead,
    };
  },
  offers: (d, locale) => ({
    path: "/offers",
    title:
      locale === "sv"
        ? "Aktuell kampanj — erbjudande på dörrar och golv"
        : "Current campaign — offer on doors and flooring",
    description: d.offers.paragraphs[0] ?? d.meta.description,
  }),
  partnerships: (d, locale) => ({
    path: "/partnerships",
    title:
      locale === "sv"
        ? "Samarbete — arkitekter, inredare och byggare"
        : "Partnership — architects, designers and builders",
    description: d.partnerships.lead,
  }),
  projects: (d, locale) => ({
    path: "/projects",
    title:
      locale === "sv"
        ? "Referenser — dörrar och golv i Stockholm"
        : "References — doors and flooring in Stockholm",
    description: d.projects.lead,
  }),
  services: (d, locale) => ({
    path: "/services",
    title:
      locale === "sv"
        ? "Tjänster — rådgivning, mått, leverans och montering"
        : "Services — advice, measuring, delivery and installation",
    description: d.services.lead,
  }),
  privacy: (d) => ({
    path: "/integritetspolicy",
    title: d.legal.privacyTitle,
    description: d.legal.privacyIntro,
  }),
  terms: (d) => ({
    path: "/kopvillkor",
    title: d.legal.termsTitle,
    description: d.legal.termsIntro,
  }),
  shipping: (d) => ({
    path: "/leverans",
    title: d.legal.shippingTitle,
    description: d.legal.shippingIntro,
  }),
  returns: (d) => ({
    path: "/retur",
    title: d.legal.returnsTitle,
    description: d.legal.returnsIntro,
  }),
  cookies: (d) => ({
    path: "/cookies",
    title: d.legal.cookiesTitle,
    description: d.legal.cookiesIntro,
  }),
};

export function getSeoForPage(locale: Locale, key: SeoPageKey): SeoFields {
  const dict = getDictionary(locale);
  if (key === "home") {
    const contact = getContactInfo();
    return {
      path: "",
      title:
        locale === "sv"
          ? "Innerdörrar, dolda dörrar och golv i Stockholm"
          : "Interior doors, hidden doors and flooring in Stockholm",
      description: `${contact.tagline[locale]} ${dict.meta.description}`,
    };
  }
  return seoCopy[key](dict, locale);
}

export function metadataForPage(locale: Locale, key: SeoPageKey) {
  const seo = getSeoForPage(locale, key);
  return createPageMetadata({ locale, ...seo });
}
