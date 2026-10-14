"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { mediaUrl } from "@/lib/mediaUrl";

export type AdminProductRow = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price_sek: number;
  published: number;
  featured: number;
  category_name_en?: string;
  priority: number;
};

type StatusFilter = "all" | "published" | "draft" | "featured";

export default function ProductsTable({
  products: initial,
}: {
  products: AdminProductRow[];
}) {
  const router = useRouter();
  const [products, setProducts] = useState(initial);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (statusFilter === "published" && !p.published) return false;
      if (statusFilter === "draft" && p.published) return false;
      if (statusFilter === "featured" && !p.featured) return false;
      if (!term) return true;
      return (
        p.name.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term) ||
        (p.category_name_en || "").toLowerCase().includes(term)
      );
    });
  }, [products, q, statusFilter]);

  async function patchRow(
    id: number,
    patch: { published?: number; featured?: number; priority?: number },
  ) {
    setError("");
    setBusyId(id);
    const previous = products.find((p) => p.id === id);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setBusyId(null);
    if (!res.ok) {
      if (previous) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? previous : p)),
        );
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update product");
      return;
    }
    router.refresh();
  }

  async function onDelete(id: number, name: string) {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) return;
    setError("");
    setBusyId(id);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } else {
      setError("Failed to delete product");
    }
  }

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Draft" },
    { key: "featured", label: "Featured" },
  ];

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div
        data-tour="tour-products-toolbar"
        className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name, slug or category…"
          className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400"
        />
        <Link href="/admin/products/add" className="admin-btn admin-btn-primary">
          Add product
        </Link>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setStatusFilter(f.key)}
            className={`admin-chip ${statusFilter === f.key ? "admin-chip-active" : ""}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        data-tour="tour-products-table"
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs tracking-wide text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-10 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={mediaUrl(p.image)}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {p.category_name_en || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      disabled={busyId === p.id}
                      defaultValue={p.priority}
                      key={`${p.id}-${p.priority}`}
                      onBlur={(e) => {
                        const next = Number(e.target.value) || 0;
                        if (next === p.priority) return;
                        void patchRow(p.id, { priority: next });
                      }}
                      className="w-20 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 focus:border-[#3c2412] focus:outline-none focus:ring-2 focus:ring-[#3c2412]/15"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {p.price_sek.toLocaleString("sv-SE")} SEK
                  </td>
                  <td className="px-4 py-3">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700">
                      <input
                        type="checkbox"
                        className="size-4 accent-[#3c2412]"
                        checked={Boolean(p.published)}
                        disabled={busyId === p.id}
                        onChange={(e) =>
                          void patchRow(p.id, {
                            published: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                      {p.published ? "Yes" : "No"}
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700">
                      <input
                        type="checkbox"
                        className="size-4 accent-[#3c2412]"
                        checked={Boolean(p.featured)}
                        disabled={busyId === p.id}
                        onChange={(e) =>
                          void patchRow(p.id, {
                            featured: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                      {p.featured ? "Yes" : "No"}
                    </label>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <Link
                        href={`/sv/catalog/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        disabled={busyId === p.id}
                        onClick={() => onDelete(p.id, p.name)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No products match your filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
