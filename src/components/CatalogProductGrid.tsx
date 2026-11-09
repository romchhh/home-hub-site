"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import type { CatalogCategoryOption, DoorCategory, DoorModel } from "@/data/models";
import {
  buildCategoryJumpTargets,
  buildCategorySections,
  buildSubcategoryJumpTargets,
  categorySectionDomId,
  type CategoryJumpTarget,
  type CategorySection,
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

function ProductGrid({
  locale,
  dict,
  models,
}: {
  locale: Locale;
  dict: Dictionary;
  models: DoorModel[];
}) {
  const c = dict.catalog;
  return (
    <div className="catalog-products">
      {models.map((m) => (
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
  );
}

function SectionedProducts({
  section,
  locale,
  dict,
}: {
  section: CategorySection;
  locale: Locale;
  dict: Dictionary;
}) {
  const hasNamedSubs = section.subgroups.some((g) => g.slug);
  return (
    <div
      id={categorySectionDomId(SECTION_PREFIX, section.slug)}
      className="catalog-category-section home-category-section"
    >
      <h3 className="home-category-title">{section.name}</h3>
      {section.subgroups.map((group) => {
        const blockId = group.slug
          ? `${section.slug}__${group.slug}`
          : `${section.slug}__other`;
        return (
          <div
            key={blockId}
            id={categorySectionDomId(SECTION_PREFIX, blockId)}
            className="home-category-subgroup"
          >
            {group.name ? (
              <h4 className="home-category-subtitle">{group.name}</h4>
            ) : hasNamedSubs ? (
              <h4 className="home-category-subtitle home-category-subtitle--muted">
                {section.name}
              </h4>
            ) : null}
            <ProductGrid locale={locale} dict={dict} models={group.items} />
          </div>
        );
      })}
    </div>
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
  const productsGateRef = useRef<HTMLDivElement>(null);
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

  const allMode =
    appliedFilters.category === "all" &&
    appliedFilters.subcategory === "all" &&
    searchQuery.trim().length === 0;

  const categoryBrowseMode =
    appliedFilters.category !== "all" && searchQuery.trim().length === 0;

  const allSections = useMemo(
    () => (allMode ? buildCategorySections(categories, visible) : []),
    [allMode, categories, visible],
  );

  const selectedSection = useMemo(() => {
    if (!categoryBrowseMode || !selectedCategory) return null;
    const built = buildCategorySections([selectedCategory], visible);
    return built[0] ?? null;
  }, [categoryBrowseMode, selectedCategory, visible]);

  const subcategoryBrowseMode = Boolean(
    categoryBrowseMode &&
      selectedSection &&
      appliedFilters.subcategory === "all" &&
      buildSubcategoryJumpTargets(selectedSection).length >= 2,
  );

  const jumpTargets: CategoryJumpTarget[] = useMemo(() => {
    if (allMode) return buildCategoryJumpTargets(allSections);
    if (subcategoryBrowseMode && selectedSection) {
      return buildSubcategoryJumpTargets(selectedSection);
    }
    if (categoryBrowseMode) {
      // Switch between top-level categories while filtered
      return categories
        .filter((cat) => models.some((m) => m.category === cat.slug))
        .map((cat) => ({ id: cat.slug, slug: cat.slug, name: cat.name }));
    }
    return [];
  }, [
    allMode,
    subcategoryBrowseMode,
    selectedSection,
    categoryBrowseMode,
    allSections,
    categories,
    models,
  ]);

  const showSticky = jumpTargets.length >= 2;

  useEffect(() => {
    return () => {
      if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showSticky) {
      setActiveSlug(null);
      return;
    }

    const nodes = jumpTargets
      .map((target) =>
        document.getElementById(categorySectionDomId(SECTION_PREFIX, target.id)),
      )
      .filter((el): el is HTMLElement => Boolean(el));

    // Category-switch mode has no section anchors — keep filter chip as active
    if (nodes.length === 0) {
      if (categoryBrowseMode && !subcategoryBrowseMode) {
        setActiveSlug(appliedFilters.category);
      }
      return;
    }

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
  }, [
    showSticky,
    jumpTargets,
    categoryBrowseMode,
    subcategoryBrowseMode,
    appliedFilters.category,
  ]);

  const pinJump = useCallback(() => {
    setJumpPinned(true);
    if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    pinTimerRef.current = window.setTimeout(() => {
      setJumpPinned(false);
      pinTimerRef.current = null;
    }, JUMP_PIN_MS);
  }, []);

  const jumpToSection = useCallback(
    (id: string) => {
      setActiveSlug(id);
      pinJump();

      if (allMode || subcategoryBrowseMode) {
        scrollToCategorySection(categorySectionDomId(SECTION_PREFIX, id));
        return;
      }

      // Category switcher while browsing a filtered category
      setAppliedFilters((prev) => ({
        ...prev,
        category: id as DoorCategory,
        subcategory: "all",
      }));
      requestAnimationFrame(() => {
        const gate = productsGateRef.current;
        if (!gate) return;
        const top =
          gate.getBoundingClientRect().top +
          window.scrollY -
          readCategoryJumpHeaderOffset() -
          16;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    },
    [allMode, subcategoryBrowseMode, pinJump],
  );

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

      {showSticky ? (
        <CategoryJumpBar
          sections={jumpTargets.map((t) => ({ slug: t.id, name: t.name }))}
          activeSlug={activeSlug}
          ariaLabel={
            subcategoryBrowseMode ? c.filterSubcategoryLabel : c.filterCategoryLabel
          }
          gateRef={productsGateRef}
          pinned={jumpPinned}
          onJump={jumpToSection}
        />
      ) : null}

      <div ref={productsGateRef}>
        {allMode ? (
          <div className="catalog-category-sections">
            {allSections.map((section) => (
              <SectionedProducts
                key={section.slug}
                section={section}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        ) : subcategoryBrowseMode && selectedSection ? (
          <div className="catalog-category-sections">
            <SectionedProducts
              section={selectedSection}
              locale={locale}
              dict={dict}
            />
          </div>
        ) : (
          <ProductGrid locale={locale} dict={dict} models={visible} />
        )}
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
