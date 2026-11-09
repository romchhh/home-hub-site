import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  deleteSubcategory,
  getSubcategory,
  updateSubcategory,
} from "@/lib/admin/queries";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Ctx) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  if (!getSubcategory(Number(id))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const body = await request.json();
    updateSubcategory(Number(id), {
      slug: body.slug,
      name_sv: body.name_sv,
      name_en: body.name_en,
      priority: body.priority !== undefined ? Number(body.priority) : undefined,
      category_id:
        body.category_id !== undefined ? Number(body.category_id) : undefined,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  try {
    deleteSubcategory(Number(id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to delete" },
      { status: 400 },
    );
  }
}
