import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import ProductForm from "@/components/admin/ProductForm";
import { listCategories, listSubcategories } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default function AdminAddProductPage() {
  const categories = listCategories();
  const subcategories = listSubcategories();
  return (
    <div>
      <PageBreadcrumb pageTitle="Add product" />
      <ProductForm categories={categories} subcategories={subcategories} />
    </div>
  );
}
