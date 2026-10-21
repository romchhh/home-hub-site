import "server-only";

import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { listPublishedReviewsByProductSlug } from "@/lib/admin/queries";
import type { Locale } from "@/lib/i18n";
import type { ProductReview } from "@/lib/productReviewTypes";

export type { ProductReview };

export function getPublishedProductReviews(
  slug: string,
  locale: Locale,
): ProductReview[] {
  if (!isAdminDbEnabled()) return [];
  try {
    const en = locale === "en";
    return listPublishedReviewsByProductSlug(slug).map((r) => ({
      id: r.id,
      authorName: r.author_name,
      rating: Math.min(5, Math.max(1, r.rating || 5)),
      title: (en ? r.title_en : r.title_sv) || (en ? r.title_sv : r.title_en),
      body: (en ? r.body_en : r.body_sv) || (en ? r.body_sv : r.body_en),
      createdAt: r.created_at,
    }));
  } catch {
    return [];
  }
}
