import type { DoorModel } from "@/data/models";
import { isPricePublished } from "@/lib/formatPrice";
import type { ContactInfo } from "@/lib/contactInfo";
import { orgNrDigits } from "@/lib/contactInfo";
import type { Locale } from "@/lib/i18n";
import type { ProductReview } from "@/lib/productReviewTypes";
import { absoluteMediaUrl } from "@/lib/seo/absoluteMedia";
import { absoluteUrl, getSiteUrl, siteName } from "@/lib/site";

const siteUrl = () => getSiteUrl();

function parsePostalLocality(addressLine2: string): {
  postalCode: string;
  addressLocality: string;
} {
  const match = addressLine2.trim().match(/^(\d{3}\s?\d{2})\s+(.+)$/);
  if (match) {
    return { postalCode: match[1], addressLocality: match[2] };
  }
  return { postalCode: "", addressLocality: addressLine2 };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    name: siteName,
    url: absoluteUrl(locale),
    inLanguage: locale === "sv" ? "sv-SE" : "en",
    publisher: { "@id": `${siteUrl()}/#organization` },
  };
}

export function organizationJsonLd(
  locale: Locale,
  description: string,
  contact: ContactInfo,
) {
  const { postalCode, addressLocality } = parsePostalLocality(contact.addressLine2);
  const tax = orgNrDigits(contact.orgNr);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${siteUrl()}/#organization`,
    name: siteName,
    legalName: contact.companyName,
    url: siteUrl(),
    description,
    image: absoluteMediaUrl("/images/hero.png"),
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl()}/icon.png`,
      width: 512,
      height: 512,
    },
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLine1,
      postalCode,
      addressLocality,
      addressRegion: "Stockholm",
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.coordinates.lat,
      longitude: contact.coordinates.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapSearchQuery)}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "11:00",
        closes: "15:00",
      },
    ],
    taxID: tax,
    vatID: tax ? `SE${tax}01` : undefined,
    areaServed: {
      "@type": "Country",
      name: contact.country || "Sweden",
    },
    sameAs: contact.social.map((s) => s.href),
    currenciesAccepted: "SEK",
    paymentAccepted: "Cash, Credit Card, Invoice",
    inLanguage: locale === "sv" ? "sv-SE" : "en",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contact.phone,
        email: contact.email,
        contactType: "customer service",
        availableLanguage: ["Swedish", "English"],
        areaServed: "SE",
      },
    ],
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path !== undefined
        ? { item: absoluteUrl(locale, item.path) }
        : {}),
    })),
  };
}

export function productJsonLd(
  locale: Locale,
  model: DoorModel,
  reviews: ProductReview[] = [],
) {
  const productUrl = absoluteUrl(locale, `/catalog/${model.slug}`);
  const images = [...new Set([model.image, ...model.gallery].filter(Boolean))].map(
    absoluteMediaUrl,
  );
  const colorNames = model.colors.map((c) => c.name).filter(Boolean);

  const aggregate =
    reviews.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(
              (
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ).toFixed(1),
            ),
            reviewCount: reviews.length,
            bestRating: 5,
            worstRating: 1,
          },
          review: reviews.slice(0, 10).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.authorName },
            datePublished: r.createdAt,
            reviewBody: r.body,
            name: r.title || undefined,
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: model.name,
    description: model.description,
    image: images,
    url: productUrl,
    sku: model.slug,
    category: model.label,
    material: model.material,
    ...(colorNames.length ? { color: colorNames.join(", ") } : {}),
    brand: { "@type": "Brand", name: siteName },
    manufacturer: { "@id": `${siteUrl()}/#organization` },
    // Google Product rich results require offers.price — omit Offer until a price is published.
    ...(isPricePublished(model.priceSek)
      ? {
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "SEK",
            price: model.priceSek,
            priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
            availability: "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": `${siteUrl()}/#organization` },
          },
        }
      : {}),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: locale === "sv" ? "Yta" : "Finish",
        value: model.finish,
      },
      {
        "@type": "PropertyValue",
        name: locale === "sv" ? "Beslag" : "Hardware",
        value: model.hardware,
      },
    ],
    ...aggregate,
  };
}

export function itemListJsonLd(
  locale: Locale,
  name: string,
  items: { name: string; path: string; image?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(locale, item.path),
      name: item.name,
      ...(item.image ? { image: absoluteMediaUrl(item.image) } : {}),
    })),
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webPageJsonLd(
  locale: Locale,
  opts: { path: string; name: string; description: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(locale, opts.path)}#webpage`,
    url: absoluteUrl(locale, opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${siteUrl()}/#website` },
    about: { "@id": `${siteUrl()}/#organization` },
    inLanguage: locale === "sv" ? "sv-SE" : "en",
  };
}

export function contactPageJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl(locale, "/contact")}#webpage`,
    url: absoluteUrl(locale, "/contact"),
    name: locale === "sv" ? "Kontakt" : "Contact",
    description,
    isPartOf: { "@id": `${siteUrl()}/#website` },
    mainEntity: { "@id": `${siteUrl()}/#organization` },
    inLanguage: locale === "sv" ? "sv-SE" : "en",
  };
}

export function collectionPageJsonLd(
  locale: Locale,
  opts: { path: string; name: string; description: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(locale, opts.path)}#webpage`,
    url: absoluteUrl(locale, opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${siteUrl()}/#website` },
    inLanguage: locale === "sv" ? "sv-SE" : "en",
  };
}
