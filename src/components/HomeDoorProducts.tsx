"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/dictionaries";
import type { CatalogCategoryOption, DoorModel } from "@/data/models";
import type { Locale } from "@/lib/i18n";
import { Pill } from "./Pill";
import { ProductCard } from "./ProductCard";

const PREVIEW_MOBILE = 4; // 2 rows × 2 cols
const PREVIEW_DESKTOP = 8; // 2 rows × 4 cols

function subscribePreviewCount(onStoreChange: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getPreviewCountSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches ? PREVIEW_DESKTOP : PREVIEW_MOBILE;
}

function getPreviewCountServerSnapshot() {
  return PREVIEW_MOBILE;
}

function usePreviewCount() {
  return useSyncExternalStore(
    subscribePreviewCount,
    getPreviewCountSnapshot,
    getPreviewCountServerSnapshot,
  );
}

export function HomeDoorProducts({
  locale,
  dict,
  models,
  categories,
}: {
  locale: Locale;
  dict: Dictionary;
  models: DoorModel[];
  categories: CatalogCategoryOption[];
}) {
  const c = dict.catalog;
  const h = dict.home;
  const previewCount = usePreviewCount();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const sections = useMemo(
    () =>
      [...categories]
        .sort((a, b) => a.priority - b.priority)
        .map((cat) => ({
          ...cat,
          items: models.filter((m) => m.category === cat.slug),
        }))
        .filter((section) => section.items.length > 0),
    [categories, models],
  );

  return (
    <div className="home-category-sections">
      {sections.map((section) => {
        const isExpanded = Boolean(expanded[section.slug]);
        const visible = isExpanded ? section.items : section.items.slice(0, previewCount);
        const canToggle = section.items.length > previewCount;

        return (
          <div key={section.slug} className="home-category-section">
            <h3 className="home-category-title">{section.name}</h3>
            <div className="catalog-products">
              {visible.map((m) => (
                <ProductCard
                  key={m.slug}
                  locale={locale}
                  model={m}
                  priceFromLabel={c.priceFrom}
                  detailsLabel={c.details}
                  closeLabel={dict.nav.close}
                />
              ))}
            </div>
            {canToggle ? (
              <div className="home-category-more">
                <Pill
                  outline
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [section.slug]: !prev[section.slug],
                    }))
                  }
                >
                  {isExpanded ? h.showLess : h.showMore}
                </Pill>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
