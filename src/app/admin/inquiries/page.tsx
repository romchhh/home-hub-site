import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import InquiriesTable from "@/components/admin/InquiriesTable";
import { listInquiries } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

const statusFilters = ["all", "new", "in_progress", "done", "archived"] as const;

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const inquiries = listInquiries();
  const { status } = await searchParams;
  const initialFilter =
    status && statusFilters.includes(status as (typeof statusFilters)[number])
      ? status
      : "all";

  return (
    <div data-tour="tour-inquiries-page">
      <PageBreadcrumb pageTitle="Inquiries" />
      <InquiriesTable initial={inquiries} initialFilter={initialFilter} />
    </div>
  );
}
