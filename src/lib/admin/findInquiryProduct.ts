import type { DbProduct } from "@/lib/db";
import { getProductBySlug, listProducts } from "@/lib/admin/queries";

/** Resolve linked product from inquiry model field (slug or display name). */
export function findInquiryProduct(modelField: string): DbProduct | undefined {
  const raw = modelField.trim();
  if (!raw) return undefined;

  const bySlug = getProductBySlug(raw);
  if (bySlug) return bySlug;

  const lower = raw.toLowerCase();
  const all = listProducts({ includeDrafts: true });
  return (
    all.find((p) => p.name.toLowerCase() === lower) ||
    all.find((p) => p.slug.toLowerCase() === lower) ||
    all.find((p) => p.name.toLowerCase().includes(lower)) ||
    all.find((p) => lower.includes(p.name.toLowerCase()))
  );
}
