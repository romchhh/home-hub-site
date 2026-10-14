"use client";

import { useSidebar } from "@/lib/admin/SidebarContext";
import { requestAdminTour } from "@/lib/admin/tour";
import AdminLogo from "@/components/admin/AdminLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

type SearchProduct = { id: number; name: string; slug: string };

export default function AppHeader() {
  const router = useRouter();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  const filtered = useMemo(
    () =>
      query.trim()
        ? products.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase()),
          )
        : [],
    [products, query],
  );

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white lg:border-b">
      <div className="flex w-full grow flex-col items-center justify-between lg:flex-row lg:px-6">
        <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="admin-btn admin-btn-secondary z-99999 !min-h-10 !w-10 !rounded-lg !p-0 text-gray-500 lg:!min-h-11 lg:!w-11"
              onClick={handleToggle}
              aria-label="Toggle sidebar"
            >
              {isMobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M4 12h16M4 17h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            <AdminLogo className="lg:hidden" showWordmark />
          </div>

          <button
            type="button"
            className="admin-btn admin-btn-ghost z-99999 !min-h-10 !w-10 !p-0 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="6" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } w-full items-center justify-between gap-4 px-5 py-4 shadow-sm lg:flex lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div
            ref={containerRef}
            data-tour="tour-header-search"
            className="relative hidden lg:block"
          >
            <form>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <svg
                    className="fill-gray-500"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden xl:w-[280px]"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs text-gray-500"
                >
                  <span>⌘</span>
                  <span>K</span>
                </button>
              </div>
            </form>
            {query && (
              <ul className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-gray-500">
                    No products found
                  </li>
                ) : (
                  filtered.slice(0, 8).map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setQuery("")}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              data-tour="tour-instructions"
              onClick={() => {
                requestAdminTour();
                router.push("/admin");
              }}
              className="admin-btn admin-btn-secondary"
            >
              Instructions
            </button>
            <Link
              href="/sv"
              target="_blank"
              className="admin-btn admin-btn-secondary hidden sm:inline-flex"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="admin-btn admin-btn-ghost"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
