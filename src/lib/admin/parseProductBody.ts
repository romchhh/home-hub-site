import type { ProductInput } from "@/lib/admin/queries";

export function parseProductBody(body: Record<string, unknown>): ProductInput {
  const gallery = Array.isArray(body.gallery)
    ? body.gallery.map(String)
    : String(body.gallery_json || body.image || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  const rawSub = body.subcategory_id;
  const subcategory_id =
    rawSub === null || rawSub === undefined || rawSub === "" || rawSub === 0
      ? null
      : Number(rawSub);

  return {
    slug: String(body.slug || "").trim(),
    name: String(body.name || "").trim(),
    category_id: Number(body.category_id),
    subcategory_id:
      subcategory_id != null && Number.isFinite(subcategory_id)
        ? subcategory_id
        : null,
    image: String(body.image || gallery[0] || "").trim(),
    gallery_json: JSON.stringify(gallery),
    label_sv: String(body.label_sv || ""),
    label_en: String(body.label_en || ""),
    material_sv: String(body.material_sv || ""),
    material_en: String(body.material_en || ""),
    finish_sv: String(body.finish_sv || ""),
    finish_en: String(body.finish_en || ""),
    hardware_sv: String(body.hardware_sv || ""),
    hardware_en: String(body.hardware_en || ""),
    colors_json:
      typeof body.colors_json === "string"
        ? body.colors_json
        : JSON.stringify(body.colors || []),
    description_sv: String(body.description_sv || ""),
    description_en: String(body.description_en || ""),
    detail_intro_sv: String(body.detail_intro_sv || ""),
    detail_intro_en: String(body.detail_intro_en || ""),
    detail_bullets_json:
      typeof body.detail_bullets_json === "string"
        ? body.detail_bullets_json
        : JSON.stringify(body.detail_bullets || []),
    specs_json:
      typeof body.specs_json === "string"
        ? body.specs_json
        : JSON.stringify(body.specs || []),
    price_sek: Number(body.price_sek) || 0,
    featured: body.featured ? 1 : 0,
    published: body.published === false || body.published === 0 ? 0 : 1,
    priority: Number(body.priority) || 0,
  };
}
