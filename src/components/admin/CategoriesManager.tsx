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

type Subcategory = {
  id: number;
  category_id: number;
  slug: string;
  name_sv: string;
  name_en: string;
  priority: number;
};

function categoryKey(row: Category) {
  return `${row.slug}|${row.name_sv}|${row.name_en}|${row.priority}`;
}

function subcategoryKey(row: Subcategory) {
  return `${row.category_id}|${row.slug}|${row.name_sv}|${row.name_en}|${row.priority}`;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
}

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3c2412] focus:outline-none focus:ring-2 focus:ring-[#3c2412]/15";
const cellClass =
  "w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3c2412] focus:outline-none focus:ring-2 focus:ring-[#3c2412]/15";

export default function CategoriesManager({
  initialCategories,
  initialSubcategories,
}: {
  initialCategories: Category[];
  initialSubcategories: Subcategory[];
}) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [subcategories, setSubcategories] = useState(initialSubcategories);
  const [savedCategories, setSavedCategories] = useState(
    () => new Map(initialCategories.map((r) => [r.id, categoryKey(r)])),
  );
  const [savedSubs, setSavedSubs] = useState(
    () => new Map(initialSubcategories.map((r) => [r.id, subcategoryKey(r)])),
  );
  const [expanded, setExpanded] = useState<Set<number>>(
    () => new Set(initialCategories.map((c) => c.id)),
  );
  const [form, setForm] = useState({
    slug: "",
    name_sv: "",
    name_en: "",
    priority: 0,
  });
  const [subForms, setSubForms] = useState<
    Record<number, { slug: string; name_sv: string; name_en: string; priority: number }>
  >({});
  const [error, setError] = useState("");
  const [savingCategoryId, setSavingCategoryId] = useState<number | null>(null);
  const [savingSubId, setSavingSubId] = useState<number | null>(null);

  const dirtyCategoryIds = useMemo(() => {
    const set = new Set<number>();
    for (const row of categories) {
      if (savedCategories.get(row.id) !== categoryKey(row)) set.add(row.id);
    }
    return set;
  }, [categories, savedCategories]);

  const dirtySubIds = useMemo(() => {
    const set = new Set<number>();
    for (const row of subcategories) {
      if (savedSubs.get(row.id) !== subcategoryKey(row)) set.add(row.id);
    }
    return set;
  }, [subcategories, savedSubs]);

  const subsByCategory = useMemo(() => {
    const map = new Map<number, Subcategory[]>();
    for (const sub of subcategories) {
      const list = map.get(sub.category_id) || [];
      list.push(sub);
      map.set(sub.category_id, list);
    }
    for (const [id, list] of map) {
      map.set(
        id,
        [...list].sort((a, b) => a.priority - b.priority || a.id - b.id),
      );
    }
    return map;
  }, [subcategories]);

  function toggleExpanded(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function subFormFor(categoryId: number) {
    return (
      subForms[categoryId] || {
        slug: "",
        name_sv: "",
        name_en: "",
        priority: 0,
      }
    );
  }

  async function refreshAll() {
    const [cats, subs] = await Promise.all([
      fetch("/api/admin/categories").then((r) => r.json()) as Promise<Category[]>,
      fetch("/api/admin/subcategories").then((r) => r.json()) as Promise<Subcategory[]>,
    ]);
    setCategories(cats);
    setSubcategories(subs);
    setSavedCategories(new Map(cats.map((r) => [r.id, categoryKey(r)])));
    setSavedSubs(new Map(subs.map((r) => [r.id, subcategoryKey(r)])));
    router.refresh();
  }

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
    const data = (await res.json()) as { id: number };
    setForm({ slug: "", name_sv: "", name_en: "", priority: 0 });
    setExpanded((prev) => new Set(prev).add(data.id));
    await refreshAll();
  }

  async function saveCategory(row: Category) {
    setError("");
    setSavingCategoryId(row.id);
    const res = await fetch(`/api/admin/categories/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    setSavingCategoryId(null);
    if (!res.ok) {
      setError("Failed to save category");
      return;
    }
    setSavedCategories((prev) => {
      const next = new Map(prev);
      next.set(row.id, categoryKey(row));
      return next;
    });
    router.refresh();
  }

  async function removeCategory(id: number) {
    if (!confirm("Delete this category and its subcategories?")) return;
    setError("");
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete category");
      return;
    }
    setCategories((prev) => prev.filter((r) => r.id !== id));
    setSubcategories((prev) => prev.filter((r) => r.category_id !== id));
    setSavedCategories((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    router.refresh();
  }

  async function createSubcategory(categoryId: number) {
    setError("");
    const formState = subFormFor(categoryId);
    const res = await fetch("/api/admin/subcategories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formState, category_id: categoryId }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to create subcategory");
      return;
    }
    setSubForms((prev) => ({
      ...prev,
      [categoryId]: { slug: "", name_sv: "", name_en: "", priority: 0 },
    }));
    await refreshAll();
  }

  async function saveSubcategory(row: Subcategory) {
    setError("");
    setSavingSubId(row.id);
    const res = await fetch(`/api/admin/subcategories/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    setSavingSubId(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save subcategory");
      return;
    }
    setSavedSubs((prev) => {
      const next = new Map(prev);
      next.set(row.id, subcategoryKey(row));
      return next;
    });
    router.refresh();
  }

  async function removeSubcategory(id: number) {
    if (!confirm("Delete this subcategory?")) return;
    setError("");
    const res = await fetch(`/api/admin/subcategories/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to delete subcategory");
      return;
    }
    setSubcategories((prev) => prev.filter((r) => r.id !== id));
    setSavedSubs((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={createCategory}
        className="rounded-2xl border border-gray-200 bg-white p-5"
      >
        <h3 className="mb-1 text-base font-semibold text-gray-900">
          Add category
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          Top-level groups on the site (entrance doors, interior, flooring…).
          Subcategories live inside each category below.
        </p>
        {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
        <div className="grid gap-3 md:grid-cols-5">
          <input
            className={fieldClass}
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
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
            placeholder="Priority"
            value={form.priority}
            onChange={(e) =>
              setForm((f) => ({ ...f, priority: Number(e.target.value) }))
            }
          />
          <button type="submit" className="admin-btn admin-btn-primary">
            Create category
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-12 text-center text-sm text-gray-500">
            No categories yet. Create one above to organise the catalogue.
          </div>
        ) : (
          categories.map((cat) => {
            const dirty = dirtyCategoryIds.has(cat.id);
            const open = expanded.has(cat.id);
            const subs = subsByCategory.get(cat.id) || [];
            const createState = subFormFor(cat.id);

            return (
              <article
                key={cat.id}
                className={`overflow-hidden rounded-2xl border bg-white ${
                  dirty ? "border-[#d4b89a] shadow-sm" : "border-gray-200"
                }`}
              >
                <div className="flex flex-wrap items-start gap-3 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(cat.id)}
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    aria-expanded={open}
                    aria-label={open ? "Collapse subcategories" : "Expand subcategories"}
                  >
                    <span
                      className={`text-sm transition-transform ${open ? "rotate-90" : ""}`}
                      aria-hidden
                    >
                      ›
                    </span>
                  </button>

                  <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                        Slug
                      </span>
                      <input
                        className={cellClass}
                        value={cat.slug}
                        onChange={(e) =>
                          setCategories((prev) =>
                            prev.map((r) =>
                              r.id === cat.id
                                ? { ...r, slug: slugify(e.target.value) }
                                : r,
                            ),
                          )
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                        Swedish
                      </span>
                      <input
                        className={cellClass}
                        value={cat.name_sv}
                        onChange={(e) =>
                          setCategories((prev) =>
                            prev.map((r) =>
                              r.id === cat.id
                                ? { ...r, name_sv: e.target.value }
                                : r,
                            ),
                          )
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                        English
                      </span>
                      <input
                        className={cellClass}
                        value={cat.name_en}
                        onChange={(e) =>
                          setCategories((prev) =>
                            prev.map((r) =>
                              r.id === cat.id
                                ? { ...r, name_en: e.target.value }
                                : r,
                            ),
                          )
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                        Priority
                      </span>
                      <input
                        type="number"
                        className={cellClass}
                        value={cat.priority}
                        onChange={(e) =>
                          setCategories((prev) =>
                            prev.map((r) =>
                              r.id === cat.id
                                ? { ...r, priority: Number(e.target.value) }
                                : r,
                            ),
                          )
                        }
                      />
                    </label>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2 pt-5 sm:pt-6">
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-500 ring-1 ring-gray-200">
                      {subs.length} sub
                      {subs.length === 1 ? "" : "s"}
                    </span>
                    <button
                      type="button"
                      disabled={!dirty || savingCategoryId === cat.id}
                      onClick={() => saveCategory(cat)}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                    >
                      {savingCategoryId === cat.id ? "Saving…" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCategory(cat.id)}
                      className="admin-btn admin-btn-danger admin-btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {open ? (
                  <div className="space-y-4 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          Subcategories
                        </h4>
                        <p className="text-xs text-gray-500">
                          Optional groups inside this category — e.g. apartment
                          doors under entrance doors.
                        </p>
                      </div>
                    </div>

                    {subs.length === 0 ? (
                      <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-4 text-sm text-gray-500">
                        No subcategories yet. Add one below — products can then
                        pick it in the product form.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {subs.map((sub) => {
                          const subDirty = dirtySubIds.has(sub.id);
                          return (
                            <li
                              key={sub.id}
                              className={`rounded-xl border p-3 ${
                                subDirty
                                  ? "border-[#d4b89a] bg-[#f5ebe0]/35"
                                  : "border-gray-100 bg-gray-50/60"
                              }`}
                            >
                              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
                                <label className="block">
                                  <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                                    Slug
                                  </span>
                                  <input
                                    className={cellClass}
                                    value={sub.slug}
                                    onChange={(e) =>
                                      setSubcategories((prev) =>
                                        prev.map((r) =>
                                          r.id === sub.id
                                            ? {
                                                ...r,
                                                slug: slugify(e.target.value),
                                              }
                                            : r,
                                        ),
                                      )
                                    }
                                  />
                                </label>
                                <label className="block">
                                  <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                                    Swedish
                                  </span>
                                  <input
                                    className={cellClass}
                                    value={sub.name_sv}
                                    onChange={(e) =>
                                      setSubcategories((prev) =>
                                        prev.map((r) =>
                                          r.id === sub.id
                                            ? { ...r, name_sv: e.target.value }
                                            : r,
                                        ),
                                      )
                                    }
                                  />
                                </label>
                                <label className="block">
                                  <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                                    English
                                  </span>
                                  <input
                                    className={cellClass}
                                    value={sub.name_en}
                                    onChange={(e) =>
                                      setSubcategories((prev) =>
                                        prev.map((r) =>
                                          r.id === sub.id
                                            ? { ...r, name_en: e.target.value }
                                            : r,
                                        ),
                                      )
                                    }
                                  />
                                </label>
                                <label className="block">
                                  <span className="mb-1 block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                                    Priority
                                  </span>
                                  <input
                                    type="number"
                                    className={cellClass}
                                    value={sub.priority}
                                    onChange={(e) =>
                                      setSubcategories((prev) =>
                                        prev.map((r) =>
                                          r.id === sub.id
                                            ? {
                                                ...r,
                                                priority: Number(e.target.value),
                                              }
                                            : r,
                                        ),
                                      )
                                    }
                                  />
                                </label>
                                <div className="flex flex-wrap gap-2 lg:justify-end">
                                  <button
                                    type="button"
                                    disabled={!subDirty || savingSubId === sub.id}
                                    onClick={() => saveSubcategory(sub)}
                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                  >
                                    {savingSubId === sub.id ? "Saving…" : "Save"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeSubcategory(sub.id)}
                                    className="admin-btn admin-btn-danger admin-btn-sm"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    <div className="rounded-xl border border-gray-200 bg-white p-3">
                      <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
                        Add subcategory under {cat.name_en || cat.slug}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                        <input
                          className={cellClass}
                          placeholder="Slug"
                          value={createState.slug}
                          onChange={(e) =>
                            setSubForms((prev) => ({
                              ...prev,
                              [cat.id]: {
                                ...createState,
                                slug: slugify(e.target.value),
                              },
                            }))
                          }
                        />
                        <input
                          className={cellClass}
                          placeholder="Name (SV)"
                          value={createState.name_sv}
                          onChange={(e) =>
                            setSubForms((prev) => ({
                              ...prev,
                              [cat.id]: {
                                ...createState,
                                name_sv: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          className={cellClass}
                          placeholder="Name (EN)"
                          value={createState.name_en}
                          onChange={(e) =>
                            setSubForms((prev) => ({
                              ...prev,
                              [cat.id]: {
                                ...createState,
                                name_en: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          type="number"
                          className={cellClass}
                          placeholder="Priority"
                          value={createState.priority}
                          onChange={(e) =>
                            setSubForms((prev) => ({
                              ...prev,
                              [cat.id]: {
                                ...createState,
                                priority: Number(e.target.value),
                              },
                            }))
                          }
                        />
                        <button
                          type="button"
                          className="admin-btn admin-btn-primary admin-btn-sm"
                          disabled={
                            !createState.slug ||
                            !createState.name_sv ||
                            !createState.name_en
                          }
                          onClick={() => createSubcategory(cat.id)}
                        >
                          Add subcategory
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
