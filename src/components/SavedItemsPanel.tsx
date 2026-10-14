"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Dictionary } from "@/dictionaries";
import type { DoorModel } from "@/data/models";
import { useSavedItems } from "@/context/SavedItemsContext";
import { formatDoorPrice } from "@/lib/formatPrice";
import { localePath, type Locale } from "@/lib/i18n";
import { mediaUrl } from "@/lib/mediaUrl";
import { ProductCard } from "./ProductCard";

const SUGGESTION_COUNT = 8;

export function SavedItemsPanel({
  locale,
  dict,
  catalogModels,
  variant = "embedded",
  currentSlug,
}: {
  locale: Locale;
  dict: Dictionary;
  catalogModels: DoorModel[];
  variant?: "embedded" | "page";
  currentSlug?: string;
}) {
  const c = dict.catalog;
  const s = dict.doorPage.savedItems;
  const sp = dict.savedPage;
  const { items, removeSaved } = useSavedItems();
  const isPage = variant === "page";

  const modelsBySlug = useMemo(() => {
    const map = new Map<string, DoorModel>();
    for (const model of catalogModels) {
      map.set(model.slug, model);
    }
    return map;
  }, [catalogModels]);

  const resolved = useMemo(
    () =>
      items
        .map((item) => {
          const model = modelsBySlug.get(item.slug);
          if (!model) return null;
          const color = item.colorHex
            ? model.colors.find((entry) => entry.hex.toLowerCase() === item.colorHex!.toLowerCase())
            : undefined;
          return { item, model, colorName: color?.name };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null),
    [items, modelsBySlug],
  );

  const suggestions = useMemo(() => {
    if (!isPage || resolved.length > 0) return [];
    return catalogModels.slice(0, SUGGESTION_COUNT);
  }, [catalogModels, isPage, resolved.length]);

  const saveLabels = {
    add: s.addShort,
    remove: s.removeItem,
    inList: s.inList,
  };

  const panelClass = isPage ? "saved-page-panel" : "door-saved-section";
  const listClass = isPage ? "door-saved-list door-saved-list--page" : "door-saved-list";

  if (isPage) {
    return (
      <div className={panelClass}>
        {resolved.length === 0 ? (
          <div className="saved-page-empty">
            <p className="saved-page-empty-text">{sp.empty}</p>
            <Link href={localePath(locale, "/catalog")} className="door-saved-browse">
              {s.browseCatalog}
            </Link>
          </div>
        ) : (
          <div className="catalog-products">
            {resolved.map(({ model }) => (
              <ProductCard
                key={model.slug}
                locale={locale}
                model={model}
                priceFromLabel={c.priceFrom}
                detailsLabel={c.details}
                closeLabel={dict.nav.close}
                allowSave
                saveLabels={saveLabels}
              />
            ))}
          </div>
        )}

        {suggestions.length > 0 ? (
          <div className="saved-suggestions">
            <h2 className="saved-suggestions-title">{sp.youMayLike}</h2>
            <div className="catalog-products">
              {suggestions.map((model) => (
                <ProductCard
                  key={model.slug}
                  locale={locale}
                  model={model}
                  priceFromLabel={c.priceFrom}
                  detailsLabel={c.details}
                  closeLabel={dict.nav.close}
                  allowSave
                  saveLabels={saveLabels}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div id="door-saved" className={panelClass} aria-labelledby="door-saved-title">
      <div className="door-saved-head">
        <div>
          <h2 id="door-saved-title" className="type-section-title door-saved-title">
            {s.title}
          </h2>
          <p className="door-saved-lead text-body-sm text-muted">{s.subtitle}</p>
        </div>
        <div className="door-saved-head-actions">
          {resolved.length > 0 ? (
            <span className="door-saved-count text-label text-muted">{resolved.length}</span>
          ) : null}
          <Link href={localePath(locale, "/catalog/saved")} className="door-saved-view-all">
            {sp.viewAll}
          </Link>
        </div>
      </div>

      {resolved.length === 0 ? (
        <div className="door-saved-empty">
          <p className="text-body-sm text-muted">{s.empty}</p>
          <Link href={localePath(locale, "/catalog")} className="door-saved-browse">
            {s.browseCatalog}
          </Link>
        </div>
      ) : (
        <ul className={listClass} role="list">
          {resolved.map(({ item, model, colorName }) => {
            const href = localePath(locale, `/catalog/${model.slug}`);
            const isCurrent = currentSlug === model.slug;
            return (
              <li key={item.slug} className={`door-saved-item ${isCurrent ? "door-saved-item--current" : ""}`}>
                <Link href={href} className="door-saved-item-link">
                  <span className="door-saved-item-media">
                    <Image
                      src={mediaUrl(model.image)}
                      alt=""
                      width={88}
                      height={112}
                      className="door-saved-item-image"
                    />
                  </span>
                  <span className="door-saved-item-body">
                    <span className="door-saved-item-name">{model.name}</span>
                    <span className="door-saved-item-meta text-caption text-muted">
                      {model.label} · {c.priceFrom}{" "}
                      {formatDoorPrice(locale, model.priceSek, {
                        perSqm: model.category === "flooring",
                      })}
                      {colorName ? ` · ${colorName}` : null}
                    </span>
                  </span>
                </Link>
                <button
                  type="button"
                  className="door-saved-item-remove"
                  aria-label={`${s.removeItem}: ${model.name}`}
                  onClick={() => removeSaved(item.slug)}
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
