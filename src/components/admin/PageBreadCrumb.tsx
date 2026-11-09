import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="mb-1 text-[11px] font-medium tracking-[0.08em] text-gray-400 uppercase">
          Admin
        </p>
        <h2 className="admin-page-title text-2xl font-semibold tracking-tight">
          {pageTitle}
        </h2>
      </div>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 shadow-sm">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800"
              href="/admin"
            >
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm font-medium text-gray-800">{pageTitle}</li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
