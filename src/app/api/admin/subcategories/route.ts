import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  createSubcategory,
  listSubcategories,
} from "@/lib/admin/queries";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const categoryId = request.nextUrl.searchParams.get("category_id");
  const parsed = categoryId ? Number(categoryId) : undefined;
  return NextResponse.json(
    listSubcategories(
      parsed != null && Number.isFinite(parsed) ? parsed : undefined,
    ),
  );
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const category_id = Number(body.category_id);
    const slug = String(body.slug || "").trim();
    const name_sv = String(body.name_sv || "").trim();
    const name_en = String(body.name_en || "").trim();
    if (!category_id || !slug || !name_sv || !name_en) {
      return NextResponse.json(
        { error: "category_id, slug, name_sv and name_en are required" },
        { status: 400 },
      );
    }
    const id = createSubcategory({
      category_id,
      slug,
      name_sv,
      name_en,
      priority: Number(body.priority) || 0,
    });
    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create" },
      { status: 500 },
    );
  }
}
