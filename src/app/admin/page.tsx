import Link from "next/link";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { getDashboardStats } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string | number;
  hint?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#3c2412]/30 hover:shadow-sm"
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-gray-400">{hint}</p> : null}
    </Link>
  );
}

export default function AdminDashboardPage() {
  const stats = getDashboardStats();

  return (
    <div>
      <PageBreadcrumb pageTitle="Dashboard" />

      <div
        data-tour="tour-dashboard-actions"
        className="mb-6 flex flex-wrap gap-2"
      >
        <Link href="/admin/products/add" className="admin-btn admin-btn-primary">
          Add product
        </Link>
        <Link
          href="/admin/inquiries?status=new"
          className="admin-btn admin-btn-secondary"
        >
          New inquiries
          {stats.newInquiries > 0 ? (
            <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[11px] font-semibold text-amber-800">
              {stats.newInquiries}
            </span>
          ) : null}
        </Link>
        <Link href="/admin/media" className="admin-btn admin-btn-secondary">
          Media
        </Link>
        <Link href="/admin/settings" className="admin-btn admin-btn-secondary">
          Settings
        </Link>
        <a
          href="/feeds/products.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn admin-btn-secondary"
        >
          Product feed
        </a>
      </div>

      <div
        data-tour="tour-dashboard-stats"
        className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Products"
          value={stats.products}
          hint={`${stats.published} published`}
          href="/admin/products"
        />
        <StatCard
          label="Categories"
          value={stats.categories}
          href="/admin/categories"
        />
        <StatCard
          label="Inquiries"
          value={stats.inquiries}
          hint={`${stats.newInquiries} new`}
          href="/admin/inquiries"
        />
        <StatCard
          label="New leads"
          value={stats.newInquiries}
          hint="Awaiting follow-up"
          href="/admin/inquiries"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Inquiries over time
            </h3>
          </div>
          <DashboardCharts monthly={stats.monthly} />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Recent inquiries
            </h3>
            <Link
              href="/admin/inquiries"
              className="text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {stats.recentInquiries.length === 0 ? (
              <li className="text-sm text-gray-500">No inquiries yet</li>
            ) : (
              stats.recentInquiries.map((inq) => (
                <li key={inq.id}>
                  <Link
                    href={`/admin/inquiries/${inq.id}`}
                    className="block rounded-xl border border-gray-100 px-3 py-2.5 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-gray-900">
                        {inq.name}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 capitalize">
                        {inq.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {[inq.model, inq.source].filter(Boolean).join(" · ") ||
                        inq.email ||
                        inq.phone ||
                        "—"}
                    </p>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
