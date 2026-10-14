import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import CategoriesManager from "@/components/admin/CategoriesManager";
import { listCategories } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default function AdminCategoriesPage() {
  const categories = listCategories();
  return (
    <div data-tour="tour-categories-page">
      <PageBreadcrumb pageTitle="Categories" />
      <CategoriesManager initial={categories} />
    </div>
  );
}
