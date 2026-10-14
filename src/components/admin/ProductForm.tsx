"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ColorOptionsEditor, {
  parseColorOptions,
  serializeColorOptions,
  type ColorOptionRow,
} from "@/components/admin/ColorOptionsEditor";
import ImageDropzone from "@/components/admin/ImageDropzone";

type Category = { id: number; name_en: string; slug: string };

type BulletRow = {
  title_sv: string;
  title_en: string;
  text_sv: string;
  text_en: string;
};

type SpecRow = {
  label_sv: string;
  label_en: string;
  value_sv: string;
  value_en: string;
};

type ProductFormValues = {
  id?: number;
  slug: string;
  name: string;
  category_id: number;
  image: string;
  gallery: string[];
  label_sv: string;
  label_en: string;
  material_sv: string;
  material_en: string;
  finish_sv: string;
  finish_en: string;
  hardware_sv: string;
  hardware_en: string;
  description_sv: string;
  description_en: string;
  detail_intro_sv: string;
  detail_intro_en: string;
  price_sek: number;
  priority: number;
  featured: boolean;
  published: boolean;
};

type Initial = Partial<ProductFormValues> & {
  gallery_json?: string;
  colors_json?: string;
  detail_bullets_json?: string;
  specs_json?: string;
};

const empty: ProductFormValues = {
  slug: "",
  name: "",
  category_id: 0,
  image: "",
  gallery: [],
  label_sv: "",
  label_en: "",
  material_sv: "",
  material_en: "",
  finish_sv: "",
  finish_en: "",
  hardware_sv: "",
  hardware_en: "",
  description_sv: "",
  description_en: "",
  detail_intro_sv: "",
  detail_intro_en: "",
  price_sek: 0,
  priority: 0,
  featured: false,
  published: true,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-gray-800">{label}</span>
      {children}
    </label>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {hint ? <p className="mt-0.5 text-xs text-gray-500">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#3c2412] focus:ring-3 focus:ring-[#3c2412]/12";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseGallery(initial?: Initial): string[] {
  if (Array.isArray(initial?.gallery)) return initial.gallery.filter(Boolean);
  if (initial?.gallery_json) {
    try {
      const parsed = JSON.parse(initial.gallery_json) as string[];
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      /* ignore */
    }
  }
  if (initial?.image) return [initial.image];
  return [];
}

function parseBullets(json?: string): BulletRow[] {
  try {
    const parsed = JSON.parse(json || "[]") as BulletRow[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((b) => ({
      title_sv: b.title_sv || "",
      title_en: b.title_en || "",
      text_sv: b.text_sv || "",
      text_en: b.text_en || "",
    }));
  } catch {
    return [];
  }
}

function parseSpecs(json?: string): SpecRow[] {
  try {
    const parsed = JSON.parse(json || "[]") as SpecRow[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((s) => ({
      label_sv: s.label_sv || "",
      label_en: s.label_en || "",
      value_sv: s.value_sv || "",
      value_en: s.value_en || "",
    }));
  } catch {
    return [];
  }
}

export default function ProductForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: Initial;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(() => {
    const gallery = parseGallery(initial);
    return {
      ...empty,
      ...initial,
      category_id: initial?.category_id || categories[0]?.id || 0,
      gallery,
      image: initial?.image || gallery[0] || "",
      featured: Boolean(initial?.featured),
      published:
        initial?.published === undefined ? true : Boolean(initial.published),
    };
  });
  const [colors, setColors] = useState<ColorOptionRow[]>(() =>
    parseColorOptions(initial?.colors_json || "[]"),
  );
  const [bullets, setBullets] = useState<BulletRow[]>(() =>
    parseBullets(initial?.detail_bullets_json),
  );
  const [specs, setSpecs] = useState<SpecRow[]>(() =>
    parseSpecs(initial?.specs_json),
  );
  const [slugManual, setSlugManual] = useState(Boolean(initial?.slug));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onNameChange(name: string) {
    setValues((prev) => ({
      ...prev,
      name,
      slug: slugManual ? prev.slug : slugify(name),
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const gallery = values.gallery.filter(Boolean);
    const image = values.image || gallery[0] || "";
    if (!image) {
      setSaving(false);
      setError("Add at least one product image");
      return;
    }

    const colors_json = serializeColorOptions(colors);
    const detail_bullets_json = JSON.stringify(
      bullets.filter((b) => b.title_sv || b.title_en || b.text_sv || b.text_en),
    );
    const specs_json = JSON.stringify(
      specs.filter((s) => s.label_sv || s.label_en || s.value_sv || s.value_en),
    );

    const payload = {
      ...values,
      gallery,
      image,
      colors_json,
      detail_bullets_json,
      specs_json,
      featured: values.featured ? 1 : 0,
      published: values.published ? 1 : 0,
    };

    const url = values.id
      ? `/api/admin/products/${values.id}`
      : "/api/admin/products";
    const res = await fetch(url, {
      method: values.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save product");
      return;
    }
    const data = await res.json();
    if (values.id) {
      setSuccess("Saved. Changes are live on the catalogue.");
      router.refresh();
      return;
    }
    router.push(`/admin/products/${data.id}/edit`);
    router.refresh();
  }

  const siteSlug = values.slug.trim();

  return (
    <form
      data-tour="tour-product-form"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {success}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Lower priority numbers appear first in the catalogue.
        </p>
        {siteSlug ? (
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/sv/catalog/${siteSlug}`}
              target="_blank"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              View on site (SV)
            </Link>
            <Link
              href={`/en/catalog/${siteSlug}`}
              target="_blank"
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              View on site (EN)
            </Link>
          </div>
        ) : null}
      </div>

      <Section title="Basics" hint="Name, slug and category">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name">
            <input
              className={inputClass}
              value={values.name}
              onChange={(e) => onNameChange(e.target.value)}
              required
            />
          </Field>
          <Field label="Slug">
            <input
              className={inputClass}
              value={values.slug}
              onChange={(e) => {
                setSlugManual(true);
                set("slug", slugify(e.target.value));
              }}
              required
            />
          </Field>
          <Field label="Category">
            <select
              className={inputClass}
              value={values.category_id}
              onChange={(e) => set("category_id", Number(e.target.value))}
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_en}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      <Section title="Images" hint="First / main image is the catalogue cover">
        <ImageDropzone
          images={values.gallery}
          mainImage={values.image}
          onChange={(gallery) =>
            setValues((prev) => ({
              ...prev,
              gallery,
              image:
                prev.image && gallery.includes(prev.image)
                  ? prev.image
                  : gallery[0] || "",
            }))
          }
          onMainChange={(image) => set("image", image)}
        />
      </Section>

      <Section title="Swedish copy">
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["label_sv", "Label"],
              ["material_sv", "Material"],
              ["finish_sv", "Finish"],
              ["hardware_sv", "Hardware"],
            ] as const
          ).map(([key, label]) => (
            <Field key={key} label={label}>
              <input
                className={inputClass}
                value={values[key]}
                onChange={(e) => set(key, e.target.value)}
              />
            </Field>
          ))}
          <Field label="Short description">
            <textarea
              className={`${inputClass} min-h-24`}
              value={values.description_sv}
              onChange={(e) => set("description_sv", e.target.value)}
            />
          </Field>
          <Field label="Detail intro">
            <textarea
              className={`${inputClass} min-h-24`}
              value={values.detail_intro_sv}
              onChange={(e) => set("detail_intro_sv", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="English copy">
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["label_en", "Label"],
              ["material_en", "Material"],
              ["finish_en", "Finish"],
              ["hardware_en", "Hardware"],
            ] as const
          ).map(([key, label]) => (
            <Field key={key} label={label}>
              <input
                className={inputClass}
                value={values[key]}
                onChange={(e) => set(key, e.target.value)}
              />
            </Field>
          ))}
          <Field label="Short description">
            <textarea
              className={`${inputClass} min-h-24`}
              value={values.description_en}
              onChange={(e) => set("description_en", e.target.value)}
            />
          </Field>
          <Field label="Detail intro">
            <textarea
              className={`${inputClass} min-h-24`}
              value={values.detail_intro_en}
              onChange={(e) => set("detail_intro_en", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Details"
        hint="Colours, feature bullets and specifications on the product page"
      >
        <div className="space-y-8">
          <ColorOptionsEditor value={colors} onChange={setColors} />

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Feature bullets
                </p>
                <p className="text-xs text-gray-500">
                  Highlighted points under the product intro
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setBullets((prev) => [
                    ...prev,
                    {
                      title_sv: "",
                      title_en: "",
                      text_sv: "",
                      text_en: "",
                    },
                  ])
                }
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Add bullet
              </button>
            </div>
            {bullets.length === 0 ? (
              <p className="rounded-xl border border-dashed border-gray-200 px-4 py-5 text-center text-sm text-gray-500">
                No bullets yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {bullets.map((b, index) => (
                  <li
                    key={index}
                    className="space-y-3 rounded-xl border border-gray-200 bg-[#faf8f5] p-3"
                  >
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        className={inputClass}
                        placeholder="Title (SV)"
                        value={b.title_sv}
                        onChange={(e) =>
                          setBullets((prev) =>
                            prev.map((row, i) =>
                              i === index
                                ? { ...row, title_sv: e.target.value }
                                : row,
                            ),
                          )
                        }
                      />
                      <input
                        className={inputClass}
                        placeholder="Title (EN)"
                        value={b.title_en}
                        onChange={(e) =>
                          setBullets((prev) =>
                            prev.map((row, i) =>
                              i === index
                                ? { ...row, title_en: e.target.value }
                                : row,
                            ),
                          )
                        }
                      />
                      <textarea
                        className={`${inputClass} min-h-20`}
                        placeholder="Text (SV)"
                        value={b.text_sv}
                        onChange={(e) =>
                          setBullets((prev) =>
                            prev.map((row, i) =>
                              i === index
                                ? { ...row, text_sv: e.target.value }
                                : row,
                            ),
                          )
                        }
                      />
                      <textarea
                        className={`${inputClass} min-h-20`}
                        placeholder="Text (EN)"
                        value={b.text_en}
                        onChange={(e) =>
                          setBullets((prev) =>
                            prev.map((row, i) =>
                              i === index
                                ? { ...row, text_en: e.target.value }
                                : row,
                            ),
                          )
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setBullets((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Remove bullet
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Specifications
                </p>
                <p className="text-xs text-gray-500">
                  Size, thickness and other fact rows
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSpecs((prev) => [
                    ...prev,
                    {
                      label_sv: "",
                      label_en: "",
                      value_sv: "",
                      value_en: "",
                    },
                  ])
                }
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Add spec
              </button>
            </div>
            {specs.length === 0 ? (
              <p className="rounded-xl border border-dashed border-gray-200 px-4 py-5 text-center text-sm text-gray-500">
                No specifications yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {specs.map((s, index) => (
                  <li
                    key={index}
                    className="grid gap-3 rounded-xl border border-gray-200 bg-[#faf8f5] p-3 md:grid-cols-2"
                  >
                    <input
                      className={inputClass}
                      placeholder="Label (SV)"
                      value={s.label_sv}
                      onChange={(e) =>
                        setSpecs((prev) =>
                          prev.map((row, i) =>
                            i === index
                              ? { ...row, label_sv: e.target.value }
                              : row,
                          ),
                        )
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="Label (EN)"
                      value={s.label_en}
                      onChange={(e) =>
                        setSpecs((prev) =>
                          prev.map((row, i) =>
                            i === index
                              ? { ...row, label_en: e.target.value }
                              : row,
                          ),
                        )
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="Value (SV)"
                      value={s.value_sv}
                      onChange={(e) =>
                        setSpecs((prev) =>
                          prev.map((row, i) =>
                            i === index
                              ? { ...row, value_sv: e.target.value }
                              : row,
                          ),
                        )
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="Value (EN)"
                      value={s.value_en}
                      onChange={(e) =>
                        setSpecs((prev) =>
                          prev.map((row, i) =>
                            i === index
                              ? { ...row, value_en: e.target.value }
                              : row,
                          ),
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSpecs((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 md:col-span-2 md:w-fit"
                    >
                      Remove spec
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      <Section title="Visibility" hint="Price, order and publish state">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Price (SEK)">
            <input
              type="number"
              className={inputClass}
              value={values.price_sek}
              onChange={(e) => set("price_sek", Number(e.target.value))}
              min={0}
            />
          </Field>
          <Field label="Priority (lower = first)">
            <input
              type="number"
              className={inputClass}
              value={values.priority}
              onChange={(e) => set("priority", Number(e.target.value))}
            />
          </Field>
          <div className="flex flex-wrap items-end gap-6 pb-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <input
                type="checkbox"
                className="size-4 accent-[#3c2412]"
                checked={values.published}
                onChange={(e) => set("published", e.target.checked)}
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <input
                type="checkbox"
                className="size-4 accent-[#3c2412]"
                checked={values.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Featured
            </label>
          </div>
        </div>
      </Section>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={saving}
          className="admin-btn admin-btn-primary"
        >
          {saving ? "Saving…" : values.id ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="admin-btn admin-btn-secondary"
        >
          {values.id ? "Back to list" : "Cancel"}
        </button>
      </div>
    </form>
  );
}
