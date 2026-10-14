import "server-only";

import type { CatalogCategoryOption, DoorCategory, DoorModel } from "@/data/models";
import {
  getModelBySlug as getStaticModelBySlug,
  getModels as getStaticModels,
  getRelatedModels,
  modelSlugs as staticModelSlugs,
} from "@/data/models";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { listCategories, listProducts } from "@/lib/admin/queries";
import type { Locale } from "@/lib/i18n";

export type { CatalogCategoryOption };
export { getRelatedModels };

const FALLBACK_CATEGORIES: CatalogCategoryOption[] = [
  { slug: "interior", name: "Interior doors", priority: 10 },
  { slug: "hidden", name: "Hidden doors", priority: 20 },
  { slug: "flooring", name: "Flooring", priority: 30 },
];

const FALLBACK_CATEGORIES_SV: CatalogCategoryOption[] = [
  { slug: "interior", name: "Innerdörrar", priority: 10 },
  { slug: "hidden", name: "Dolda dörrar", priority: 20 },
  { slug: "flooring", name: "Golv", priority: 30 },
];

export function getCatalogCategories(locale: Locale): CatalogCategoryOption[] {
  if (isAdminDbEnabled()) {
    try {
      const rows = listCategories();
      if (rows.length > 0) {
        const en = locale === "en";
        return rows.map((c) => ({
          slug: c.slug,
          name: en ? c.name_en : c.name_sv,
          priority: c.priority,
        }));
      }
    } catch {
      // fall through
    }
  }
  return locale === "en" ? FALLBACK_CATEGORIES : FALLBACK_CATEGORIES_SV;
}

function mapDbProduct(
  p: {
    slug: string;
    name: string;
    image: string;
    gallery_json: string;
    category_slug?: string;
    price_sek: number;
    label_sv: string;
    label_en: string;
    material_sv: string;
    material_en: string;
    finish_sv: string;
    finish_en: string;
    hardware_sv: string;
    hardware_en: string;
    colors_json: string;
    description_sv: string;
    description_en: string;
    detail_intro_sv: string;
    detail_intro_en: string;
    detail_bullets_json: string;
    specs_json: string;
  },
  locale: Locale,
): DoorModel {
  const en = locale === "en";
  const colors = JSON.parse(p.colors_json || "[]") as {
    hex: string;
    name_sv?: string;
    name_en?: string;
    name?: string;
  }[];
  const bullets = JSON.parse(p.detail_bullets_json || "[]") as {
    title_sv?: string;
    title_en?: string;
    text_sv?: string;
    text_en?: string;
  }[];
  const specs = JSON.parse(p.specs_json || "[]") as {
    label_sv?: string;
    label_en?: string;
    value_sv?: string;
    value_en?: string;
  }[];
  const category = (p.category_slug || "interior") as Exclude<DoorCategory, "all">;

  return {
    slug: p.slug,
    name: p.name,
    image: p.image,
    gallery: JSON.parse(p.gallery_json || "[]") as string[],
    category,
    priceSek: p.price_sek,
    label: en ? p.label_en : p.label_sv,
    material: en ? p.material_en : p.material_sv,
    finish: en ? p.finish_en : p.finish_sv,
    hardware: en ? p.hardware_en : p.hardware_sv,
    colors: colors.map((c) => ({
      hex: c.hex,
      name: en ? c.name_en || c.name || "" : c.name_sv || c.name || "",
    })),
    description: en ? p.description_en : p.description_sv,
    detailIntro: en ? p.detail_intro_en : p.detail_intro_sv,
    detailBullets: bullets.map((b) => ({
      title: (en ? b.title_en : b.title_sv) || "",
      text: (en ? b.text_en : b.text_sv) || "",
    })),
    specs: specs.map((s) => ({
      label: (en ? s.label_en : s.label_sv) || "",
      value: (en ? s.value_en : s.value_sv) || "",
    })),
  };
}

export function getModels(locale: Locale): DoorModel[] {
  if (isAdminDbEnabled()) {
    try {
      const rows = listProducts({ includeDrafts: false });
      if (rows.length > 0) return rows.map((p) => mapDbProduct(p, locale));
    } catch {
      // fall through to static catalogue
    }
  }
  return getStaticModels(locale);
}

export function getModelBySlug(
  slug: string,
  locale: Locale,
): DoorModel | undefined {
  if (isAdminDbEnabled()) {
    try {
      const rows = listProducts({ includeDrafts: false });
      const found = rows.find((p) => p.slug === slug);
      if (found) return mapDbProduct(found, locale);
    } catch {
      // fall through
    }
  }
  return getStaticModelBySlug(slug, locale);
}

/** Prefer DB slugs when available (call at build / request — do not evaluate at module load). */
export function getAllModelSlugs(): string[] {
  if (isAdminDbEnabled()) {
    try {
      const rows = listProducts({ includeDrafts: false });
      if (rows.length > 0) return rows.map((p) => p.slug);
    } catch {
      // fall through
    }
  }
  return staticModelSlugs;
}

/** @deprecated Prefer getAllModelSlugs() — kept for existing imports. */
export const modelSlugs = staticModelSlugs;
