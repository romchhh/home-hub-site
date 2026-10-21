import { notFound } from "next/navigation";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import ProductForm from "@/components/admin/ProductForm";
import ProductReviewsManager from "@/components/admin/ProductReviewsManager";
import { getProduct, listCategories } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(Number(id));
  if (!product) notFound();
  const categories = listCategories();

  return (
    <div>
      <PageBreadcrumb pageTitle={`Edit · ${product.name}`} />
      <ProductForm
        categories={categories}
        initial={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          category_id: product.category_id,
          image: product.image,
          gallery_json: product.gallery_json,
          label_sv: product.label_sv,
          label_en: product.label_en,
          material_sv: product.material_sv,
          material_en: product.material_en,
          finish_sv: product.finish_sv,
          finish_en: product.finish_en,
          hardware_sv: product.hardware_sv,
          hardware_en: product.hardware_en,
          description_sv: product.description_sv,
          description_en: product.description_en,
          detail_intro_sv: product.detail_intro_sv,
          detail_intro_en: product.detail_intro_en,
          price_sek: product.price_sek,
          priority: product.priority,
          featured: Boolean(product.featured),
          published: Boolean(product.published),
          colors_json: product.colors_json,
          detail_bullets_json: product.detail_bullets_json,
          specs_json: product.specs_json,
        }}
      />
      <ProductReviewsManager productId={product.id} />
    </div>
  );
}
