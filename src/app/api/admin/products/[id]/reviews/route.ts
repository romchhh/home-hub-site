import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  createProductReview,
  getProduct,
  listProductReviews,
} from "@/lib/admin/queries";

type Ctx = { params: Promise<{ id: string }> };

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

export async function GET(request: NextRequest, { params }: Ctx) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  const productId = Number(id);
  if (!getProduct(productId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(listProductReviews(productId));
}

export async function POST(request: NextRequest, { params }: Ctx) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  const productId = Number(id);
  if (!getProduct(productId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const body = await request.json();
    const data = parseReviewBody(body);
    const reviewId = createProductReview(productId, data);
    return NextResponse.json({ id: reviewId }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create review" },
      { status: 400 },
    );
  }
}
