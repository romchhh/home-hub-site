"use client";

import { useCallback, useEffect, useState } from "react";

type Review = {
  id: number;
  author_name: string;
  rating: number;
  title_sv: string;
  title_en: string;
  body_sv: string;
  body_en: string;
  published: number;
  created_at: string;
};

type Draft = {
  author_name: string;
  rating: number;
  title_sv: string;
  title_en: string;
  body_sv: string;
  body_en: string;
  published: boolean;
};

const emptyDraft = (): Draft => ({
  author_name: "",
  rating: 5,
  title_sv: "",
  title_en: "",
  body_sv: "",
  body_en: "",
  published: true,
});

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3c2412] focus:outline-none focus:ring-2 focus:ring-[#3c2412]/15";

export default function ProductReviewsManager({
  productId,
}: {
  productId: number;
}) {
  const [rows, setRows] = useState<Review[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/products/${productId}/reviews`);
      if (!res.ok) throw new Error("Failed to load reviews");
      const data = (await res.json()) as Review[];
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void load();
  }, [load]);

  function startEdit(row: Review) {
    setEditingId(row.id);
    setDraft({
      author_name: row.author_name,
      rating: row.rating,
      title_sv: row.title_sv,
      title_en: row.title_en,
      body_sv: row.body_sv,
      body_en: row.body_en,
      published: Boolean(row.published),
    });
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(emptyDraft());
    setError("");
  }

  async function save() {
    setSaving(true);
    setError("");
    const payload = {
      author_name: draft.author_name,
      rating: draft.rating,
      title_sv: draft.title_sv,
      title_en: draft.title_en,
      body_sv: draft.body_sv,
      body_en: draft.body_en,
      published: draft.published,
    };
    try {
      const res = await fetch(
        editingId
          ? `/api/admin/products/${productId}/reviews/${editingId}`
          : `/api/admin/products/${productId}/reviews`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to save review");
      cancelEdit();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save review");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this review?")) return;
    setError("");
    try {
      const res = await fetch(
        `/api/admin/products/${productId}/reviews/${id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Failed to delete review");
      if (editingId === id) cancelEdit();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete review");
    }
  }

  return (
    <section className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Reviews</h2>
        <p className="mt-1 text-sm text-gray-500">
          Customer omdömen shown on the public product page (Reviews tab).
        </p>
      </div>

      <div className="grid gap-3 rounded-xl border border-gray-100 bg-[#faf8f5] p-4 md:grid-cols-2">
        <label className="block space-y-1.5 md:col-span-1">
          <span className="text-sm font-medium text-gray-800">Author</span>
          <input
            className={fieldClass}
            value={draft.author_name}
            onChange={(e) =>
              setDraft((d) => ({ ...d, author_name: e.target.value }))
            }
            placeholder="Anna L."
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-gray-800">Rating</span>
          <select
            className={fieldClass}
            value={draft.rating}
            onChange={(e) =>
              setDraft((d) => ({ ...d, rating: Number(e.target.value) }))
            }
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} / 5
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-gray-800">Title (SV)</span>
          <input
            className={fieldClass}
            value={draft.title_sv}
            onChange={(e) =>
              setDraft((d) => ({ ...d, title_sv: e.target.value }))
            }
            placeholder="Optional"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-gray-800">Title (EN)</span>
          <input
            className={fieldClass}
            value={draft.title_en}
            onChange={(e) =>
              setDraft((d) => ({ ...d, title_en: e.target.value }))
            }
            placeholder="Optional"
          />
        </label>
        <label className="block space-y-1.5 md:col-span-1">
          <span className="text-sm font-medium text-gray-800">Review (SV)</span>
          <textarea
            className={fieldClass}
            rows={3}
            value={draft.body_sv}
            onChange={(e) =>
              setDraft((d) => ({ ...d, body_sv: e.target.value }))
            }
            placeholder="Skriv omdömet på svenska…"
          />
        </label>
        <label className="block space-y-1.5 md:col-span-1">
          <span className="text-sm font-medium text-gray-800">Review (EN)</span>
          <textarea
            className={fieldClass}
            rows={3}
            value={draft.body_en}
            onChange={(e) =>
              setDraft((d) => ({ ...d, body_en: e.target.value }))
            }
            placeholder="Write the review in English…"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-800 md:col-span-2">
          <input
            type="checkbox"
            className="size-4 accent-[#3c2412]"
            checked={draft.published}
            onChange={(e) =>
              setDraft((d) => ({ ...d, published: e.target.checked }))
            }
          />
          Published on site
        </label>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            disabled={saving}
            onClick={() => void save()}
          >
            {saving
              ? "Saving…"
              : editingId
                ? "Save review"
                : "Add review"}
          </button>
          {editingId ? (
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          ) : null}
        </div>
        {error ? (
          <p className="text-sm text-red-600 md:col-span-2" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading reviews…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews yet for this product.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-xl border border-gray-100 px-4 py-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-gray-900">
                    {row.author_name}{" "}
                    <span className="text-sm font-normal text-amber-700">
                      {"★".repeat(row.rating)}
                      {"☆".repeat(5 - row.rating)}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {row.published ? "Published" : "Draft"} ·{" "}
                    {new Date(row.created_at + "Z").toLocaleDateString("sv-SE")}
                  </p>
                  {row.title_sv || row.title_en ? (
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {row.title_sv || row.title_en}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm text-gray-600">
                    {row.body_sv || row.body_en}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => startEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => void remove(row.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
