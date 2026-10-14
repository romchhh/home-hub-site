"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Category = {
  id: number;
  slug: string;
  name_sv: string;
  name_en: string;
  priority: number;
};

function rowKey(row: Category) {
  return `${row.slug}|${row.name_sv}|${row.name_en}|${row.priority}`;
}

export default function CategoriesManager({
  initial,
}: {
  initial: Category[];
}) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [savedSnapshot, setSavedSnapshot] = useState(
    () => new Map(initial.map((r) => [r.id, rowKey(r)])),
  );
  const [form, setForm] = useState({
    slug: "",
    name_sv: "",
    name_en: "",
    priority: 0,
  });
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);

  const dirtyIds = useMemo(() => {
    const set = new Set<number>();
    for (const row of rows) {
      if (savedSnapshot.get(row.id) !== rowKey(row)) set.add(row.id);
    }
    return set;
  }, [rows, savedSnapshot]);

  async function createCategory(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to create category");
      return;
    }
    setForm({ slug: "", name_sv: "", name_en: "", priority: 0 });
    const list = (await fetch("/api/admin/categories").then((r) =>
      r.json(),
    )) as Category[];
    setRows(list);
    setSavedSnapshot(new Map(list.map((r) => [r.id, rowKey(r)])));
    router.refresh();
  }

  async function saveRow(row: Category) {
    setError("");
    setSavingId(row.id);
    const res = await fetch(`/api/admin/categories/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    setSavingId(null);
    if (!res.ok) {
      setError("Failed to save category");
      return;
    }
    setSavedSnapshot((prev) => {
      const next = new Map(prev);
      next.set(row.id, rowKey(row));
      return next;
    });
    router.refresh();
  }

  async function removeRow(id: number) {
    if (!confirm("Delete this category?")) return;
    setError("");
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete category");
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSavedSnapshot((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    router.refresh();
  }

  const fieldClass =
    "rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3c2412] focus:outline-none focus:ring-2 focus:ring-[#3c2412]/15";
  const cellClass =
    "w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3c2412] focus:outline-none focus:ring-2 focus:ring-[#3c2412]/15";

  return (
    <div className="space-y-6">
      <form
        onSubmit={createCategory}
        className="rounded-2xl border border-gray-200 bg-white p-5"
      >
        <h3 className="mb-4 text-base font-semibold text-gray-900">
          Add category
        </h3>
        {error ? (
          <p className="mb-3 text-sm text-red-600">{error}</p>
        ) : null}
        <div className="grid gap-3 md:grid-cols-5">
          <input
            className={fieldClass}
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                slug: e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, "-"),
              }))
            }
            required
          />
          <input
            className={fieldClass}
            placeholder="Name (SV)"
            value={form.name_sv}
            onChange={(e) => setForm((f) => ({ ...f, name_sv: e.target.value }))}
            required
          />
          <input
            className={fieldClass}
            placeholder="Name (EN)"
            value={form.name_en}
            onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))}
            required
          />
          <input
            type="number"
            className={fieldClass}
            placeholder="Priority (lower = first)"
            value={form.priority}
            onChange={(e) =>
              setForm((f) => ({ ...f, priority: Number(e.target.value) }))
            }
          />
          <button type="submit" className="admin-btn admin-btn-primary">
            Create
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-gray-500">
            No categories yet. Create one above to organise the catalogue.
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs tracking-wide text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">Swedish</th>
                <th className="px-4 py-3 text-left font-medium">English</th>
                <th
                  className="px-4 py-3 text-left font-medium"
                  title="Lower number shows first"
                >
                  Priority
                </th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const dirty = dirtyIds.has(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 last:border-0 ${
                      dirty ? "bg-[#f5ebe0]/45" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        className={cellClass}
                        value={row.slug}
                        onChange={(e) =>
                          setRows((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, slug: e.target.value }
                                : r,
                            ),
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        className={cellClass}
                        value={row.name_sv}
                        onChange={(e) =>
                          setRows((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, name_sv: e.target.value }
                                : r,
                            ),
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        className={cellClass}
                        value={row.name_en}
                        onChange={(e) =>
                          setRows((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, name_en: e.target.value }
                                : r,
                            ),
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        className={`${cellClass} w-24`}
                        value={row.priority}
                        onChange={(e) =>
                          setRows((prev) =>
                            prev.map((r) =>
                              r.id === row.id
                                ? { ...r, priority: Number(e.target.value) }
                                : r,
                            ),
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          disabled={!dirty || savingId === row.id}
                          onClick={() => saveRow(row)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          {savingId === row.id ? "Saving…" : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
