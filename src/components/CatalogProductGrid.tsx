"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import type { CatalogCategoryOption, DoorCategory, DoorModel } from "@/data/models";
import type { Locale } from "@/lib/i18n";
import {
  countActiveCatalogFilters,
  createDefaultCatalogFilters,
  filterCatalogModels,
  getCatalogPriceBounds,
  type CatalogFilterState,
} from "@/lib/catalogFilter";
import { CatalogFilterChip } from "./CatalogFilterSections";
import { CatalogFilterSheet } from "./CatalogFilterSheet";
import { ProductCard } from "./ProductCard";

function SearchIcon() {
  return (
    <svg className="catalog-search-icon-svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" d="M16 16l5 5" />
    </svg>
  );
}

export function CatalogProductGrid({
  locale,
  dict,
  models,
  categories,
  showCount = true,
  showNote = false,
}: {
  locale: Locale;
  dict: Dictionary;
  models: DoorModel[];
  categories: CatalogCategoryOption[];
  showCount?: boolean;
  showNote?: boolean;
}) {
  const c = dict.catalog;
  const priceBounds = useMemo(() => getCatalogPriceBounds(models), [models]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<CatalogFilterState>(() =>
    createDefaultCatalogFilters(priceBounds),
  );
  const [draftFilters, setDraftFilters] = useState<CatalogFilterState>(() =>
    createDefaultCatalogFilters(priceBounds),
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const visible = useMemo(
    () => filterCatalogModels(models, searchQuery, appliedFilters),
    [models, searchQuery, appliedFilters],
  );

  const activeFilterCount = countActiveCatalogFilters(appliedFilters, priceBounds);
  const hasActiveQuery = searchQuery.trim().length > 0 || activeFilterCount > 0;

  function openSheet() {
    setDraftFilters(appliedFilters);
    setSheetOpen(true);
  }

  function closeSheet() {
    setDraftFilters(appliedFilters);
    setSheetOpen(false);
  }

  function applySheet() {
    setAppliedFilters(draftFilters);
    setSheetOpen(false);
  }

  function resetDraft() {
    setDraftFilters(createDefaultCatalogFilters(priceBounds));
  }

  function clearAll() {
    setSearchQuery("");
    const defaults = createDefaultCatalogFilters(priceBounds);
    setAppliedFilters(defaults);
    setDraftFilters(defaults);
  }

  return (
    <>
      <div className="catalog-controls-card">
        <div className="catalog-controls-top">
          <label className="catalog-search-field">
            <span className="sr-only">{c.searchLabel}</span>
            <SearchIcon />
            <input
              type="search"
              className="catalog-search-input"
              placeholder={c.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              enterKeyHint="search"
            />
            {searchQuery ? (
              <button
                type="button"
                className="catalog-search-clear"
                aria-label={c.clearSearch}
                onClick={() => setSearchQuery("")}
              >
                ×
              </button>
            ) : null}
          </label>
          <button type="button" className="catalog-filters-open" onClick={openSheet}>
            {c.openFilters}
            {activeFilterCount > 0 ? (
              <span className="catalog-filters-badge">{activeFilterCount}</span>
            ) : null}
          </button>
        </div>

        <div className="catalog-category-track" role="group" aria-label={c.filterCategoryLabel}>
          {(
            [
              { slug: "all" as const, name: c.filters.all },
              ...categories.map((cat) => ({ slug: cat.slug as DoorCategory, name: cat.name })),
            ] as { slug: DoorCategory; name: string }[]
          ).map((cat) => (
            <CatalogFilterChip
              key={cat.slug}
              active={appliedFilters.category === cat.slug}
              onClick={() => setAppliedFilters((prev) => ({ ...prev, category: cat.slug }))}
            >
              {cat.name}
            </CatalogFilterChip>
          ))}
        </div>

        <div className="catalog-controls-meta">
          {showCount ? (
            <span className="catalog-result-count" aria-live="polite">
              {c.shown} <strong>{visible.length}</strong> {c.of} {models.length}
            </span>
          ) : null}
          {hasActiveQuery ? (
            <button type="button" className="catalog-clear-all" onClick={clearAll}>
              {c.clearFilters}
            </button>
          ) : null}
        </div>
      </div>

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

      {visible.length === 0 ? (
        <p className="catalog-empty text-body-sm text-muted">{c.noResults}</p>
      ) : null}

      {showNote ? <p className="catalog-note">{c.note}</p> : null}

      {sheetOpen ? (
        <CatalogFilterSheet
          open={sheetOpen}
          locale={locale}
          dict={dict}
          models={models}
          categories={categories}
          searchQuery={searchQuery}
          draft={draftFilters}
          onDraftChange={setDraftFilters}
          onClose={closeSheet}
          onApply={applySheet}
          onReset={resetDraft}
        />
      ) : null}
    </>
  );
}
