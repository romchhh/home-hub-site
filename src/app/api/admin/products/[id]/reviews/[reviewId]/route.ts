import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  deleteProductReview,
  getProduct,
  getProductReview,
  updateProductReview,
} from "@/lib/admin/queries";

type Ctx = { params: Promise<{ id: string; reviewId: string }> };

function parseReviewBody(body: Record<string, unknown>) {
  const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
  const author_name = String(body.author_name || "").trim();
  const body_sv = String(body.body_sv || "").trim();
  const body_en = String(body.body_en || "").trim();
  if (!author_name) throw new Error("Author name is required");
  if (!body_sv && !body_en) throw new Error("Review text is required (SV or EN)");
  return {
    author_name,
    rating,
    title_sv: String(body.title_sv || "").trim(),
    title_en: String(body.title_en || "").trim(),
    body_sv,
    body_en,
    published: body.published === false || body.published === 0 ? 0 : 1,
  };
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id, reviewId } = await params;
  const productId = Number(id);
  const rid = Number(reviewId);
  if (!getProduct(productId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const existing = getProductReview(rid);
  if (!existing || existing.product_id !== productId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const body = await request.json();
    const data = parseReviewBody(body);
    updateProductReview(rid, data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update review" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id, reviewId } = await params;
  const productId = Number(id);
  const rid = Number(reviewId);
  if (!getProduct(productId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const existing = getProductReview(rid);
  if (!existing || existing.product_id !== productId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  deleteProductReview(rid);
  return NextResponse.json({ ok: true });
}
