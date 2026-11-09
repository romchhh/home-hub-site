"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import type { CatalogCategoryOption, DoorCategory, DoorModel } from "@/data/models";
import {
  buildCategoryJumpTargets,
  buildCategorySections,
  categorySectionDomId,
} from "@/lib/categorySections";
import {
  countActiveCatalogFilters,
  createDefaultCatalogFilters,
  filterCatalogModels,
  getCatalogPriceBounds,
  type CatalogFilterState,
} from "@/lib/catalogFilter";
import type { Locale } from "@/lib/i18n";
import {
  CategoryJumpBar,
  readCategoryJumpHeaderOffset,
  scrollToCategorySection,
} from "./CategoryJumpBar";
import { CatalogFilterChip } from "./CatalogFilterSections";
import { CatalogFilterSheet } from "./CatalogFilterSheet";
import { ProductCard } from "./ProductCard";

const JUMP_PIN_MS = 900;
const SECTION_PREFIX = "catalog-category";

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
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [jumpPinned, setJumpPinned] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const pinTimerRef = useRef<number | null>(null);

  const visible = useMemo(
    () => filterCatalogModels(models, searchQuery, appliedFilters),
    [models, searchQuery, appliedFilters],
  );

  const activeFilterCount = countActiveCatalogFilters(appliedFilters, priceBounds);
  const hasActiveQuery = searchQuery.trim().length > 0 || activeFilterCount > 0;

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.slug === appliedFilters.category) ?? null,
    [categories, appliedFilters.category],
  );
  const openSubcategories = selectedCategory?.subcategories?.length
    ? selectedCategory.subcategories
    : [];

  /** Sectioned "Alla modeller" browse mode — sticky jump bar applies here. */
  const sectionMode =
    appliedFilters.category === "all" &&
    appliedFilters.subcategory === "all" &&
    searchQuery.trim().length === 0;

  const sections = useMemo(
    () => (sectionMode ? buildCategorySections(categories, visible) : []),
    [sectionMode, categories, visible],
  );
  const jumpTargets = useMemo(
    () => (sectionMode ? buildCategoryJumpTargets(sections) : []),
    [sectionMode, sections],
  );

  useEffect(() => {
    return () => {
      if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!sectionMode || jumpTargets.length === 0) {
      setActiveSlug(null);
      return;
    }

    const nodes = jumpTargets
      .map((target) =>
        document.getElementById(categorySectionDomId(SECTION_PREFIX, target.id)),
      )
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const headerOffset = readCategoryJumpHeaderOffset();
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              b.intersectionRatio - a.intersectionRatio,
          );
        const top = visibleEntries[0];
        if (!top?.target.id) return;
        const id = top.target.id.replace(new RegExp(`^${SECTION_PREFIX}-`), "");
        setActiveSlug(id);
      },
      {
        rootMargin: `-${headerOffset + 72}px 0px -48% 0px`,
        threshold: [0.08, 0.2, 0.4],
      },
    );

    for (const node of nodes) observer.observe(node);
    setActiveSlug((prev) => prev ?? jumpTargets[0]?.id ?? null);
    return () => observer.disconnect();
  }, [sectionMode, jumpTargets]);

  const jumpToSection = useCallback((slug: string) => {
    setActiveSlug(slug);
    setJumpPinned(true);
    if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    pinTimerRef.current = window.setTimeout(() => {
      setJumpPinned(false);
      pinTimerRef.current = null;
    }, JUMP_PIN_MS);
    scrollToCategorySection(categorySectionDomId(SECTION_PREFIX, slug));
  }, []);

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

        <div className="catalog-category-nav">
          <div className="catalog-category-track" role="group" aria-label={c.filterCategoryLabel}>
            {(
              [
                { slug: "all" as const, name: c.filters.all },
                ...categories.map((cat) => ({
                  slug: cat.slug as DoorCategory,
                  name: cat.name,
                  hasSubs: Boolean(cat.subcategories?.length),
                })),
              ] as { slug: DoorCategory; name: string; hasSubs?: boolean }[]
            ).map((cat) => {
              const active = appliedFilters.category === cat.slug;
              return (
                <CatalogFilterChip
                  key={cat.slug}
                  active={active}
                  onClick={() =>
                    setAppliedFilters((prev) => ({
                      ...prev,
                      category: cat.slug,
                      subcategory: "all",
                    }))
                  }
                >
                  {cat.name}
                  {cat.hasSubs ? (
                    <span
                      className={`catalog-category-chevron${active ? " catalog-category-chevron--open" : ""}`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  ) : null}
                </CatalogFilterChip>
              );
            })}
          </div>

          {openSubcategories.length > 0 ? (
            <div
              className="catalog-subcategory-track"
              role="group"
              aria-label={c.filterSubcategoryLabel}
            >
              <CatalogFilterChip
                active={appliedFilters.subcategory === "all"}
                onClick={() =>
                  setAppliedFilters((prev) => ({ ...prev, subcategory: "all" }))
                }
              >
                {c.filterSubcategoryAll}
              </CatalogFilterChip>
              {openSubcategories.map((sub) => (
                <CatalogFilterChip
                  key={sub.slug}
                  active={appliedFilters.subcategory === sub.slug}
                  onClick={() =>
                    setAppliedFilters((prev) => ({
                      ...prev,
                      subcategory: sub.slug,
                    }))
                  }
                >
                  {sub.name}
                </CatalogFilterChip>
              ))}
            </div>
          ) : null}
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

      {sectionMode ? (
        <>
          <CategoryJumpBar
            sections={jumpTargets.map((t) => ({ slug: t.id, name: t.name }))}
            activeSlug={activeSlug}
            ariaLabel={c.filterCategoryLabel}
            gateRef={sectionsRef}
            pinned={jumpPinned}
            onJump={jumpToSection}
          />

          <div ref={sectionsRef} className="catalog-category-sections">
            {sections.map((section) => {
              const hasNamedSubs = section.subgroups.some((g) => g.slug);
              return (
                <div
                  key={section.slug}
                  id={categorySectionDomId(SECTION_PREFIX, section.slug)}
                  className="catalog-category-section home-category-section"
                >
                  <h3 className="home-category-title">{section.name}</h3>

                  {section.subgroups.map((group) => {
                    const blockId = group.slug
                      ? `${section.slug}__${group.slug}`
                      : `${section.slug}__other`;
                    return (
                      <div key={blockId} className="home-category-subgroup">
                        {group.name ? (
                          <h4 className="home-category-subtitle">{group.name}</h4>
                        ) : hasNamedSubs ? (
                          <h4 className="home-category-subtitle home-category-subtitle--muted">
                            {section.name}
                          </h4>
                        ) : null}
                        <div className="catalog-products">
                          {group.items.map((m) => (
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
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      ) : (
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
      )}

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
