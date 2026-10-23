"use client";

import type { CSSProperties } from "react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/dictionaries";
import type { CatalogCategoryOption, DoorCategory, DoorModel } from "@/data/models";
import {
  CATALOG_PRICE_STEP,
  type CatalogFilterState,
  type CatalogPriceBounds,
  getCatalogPriceBounds,
  getMaterialFilterOptions,
  snapCatalogPrice,
} from "@/lib/catalogFilter";
import { formatDoorPrice } from "@/lib/formatPrice";
import type { Locale } from "@/lib/i18n";

function CatalogPriceRangeSlider({
  locale,
  bounds,
  value,
  rangeToLabel,
  onChange,
}: {
  locale: Locale;
  bounds: CatalogPriceBounds;
  value: Pick<CatalogFilterState, "priceMin" | "priceMax">;
  rangeToLabel: string;
  onChange: (next: Pick<CatalogFilterState, "priceMin" | "priceMax">) => void;
}) {
  const span = bounds.max - bounds.min || 1;
  const minPct = ((value.priceMin - bounds.min) / span) * 100;
  const maxPct = ((value.priceMax - bounds.min) / span) * 100;
  const trackStyle = {
    "--price-min-pct": `${minPct}%`,
    "--price-max-pct": `${maxPct}%`,
  } as CSSProperties;

  const disabled = bounds.min >= bounds.max;

  return (
    <div className="catalog-price-slider">
      <p className="catalog-price-slider-values">
        <span>{formatDoorPrice(locale, value.priceMin)}</span>
        <span className="catalog-price-slider-sep">{rangeToLabel}</span>
        <span>{formatDoorPrice(locale, value.priceMax)}</span>
      </p>
      <div className="catalog-price-slider-track" style={trackStyle}>
        <div className="catalog-price-slider-rail" aria-hidden />
        <div className="catalog-price-slider-fill" aria-hidden />
        <input
          type="range"
          className="catalog-price-slider-input catalog-price-slider-input--min"
          min={bounds.min}
          max={bounds.max}
          step={CATALOG_PRICE_STEP}
          value={value.priceMin}
          disabled={disabled}
          aria-label={formatDoorPrice(locale, value.priceMin)}
          onChange={(event) => {
            const nextMin = snapCatalogPrice(Number(event.target.value), bounds);
            onChange({ priceMin: Math.min(nextMin, value.priceMax), priceMax: value.priceMax });
          }}
        />
        <input
          type="range"
          className="catalog-price-slider-input catalog-price-slider-input--max"
          min={bounds.min}
          max={bounds.max}
          step={CATALOG_PRICE_STEP}
          value={value.priceMax}
          disabled={disabled}
          aria-label={formatDoorPrice(locale, value.priceMax)}
          onChange={(event) => {
            const nextMax = snapCatalogPrice(Number(event.target.value), bounds);
            onChange({ priceMin: value.priceMin, priceMax: Math.max(nextMax, value.priceMin) });
          }}
        />
      </div>
      <div className="catalog-price-slider-bounds">
        <span>{formatDoorPrice(locale, bounds.min)}</span>
        <span>{formatDoorPrice(locale, bounds.max)}</span>
      </div>
    </div>
  );
}

function FilterSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="catalog-filter-section">
      <h3 className="catalog-filter-section-label">{label}</h3>
      <div className="catalog-filter-chips">{children}</div>
    </section>
  );
}

function CatalogColorSwatch({
  active,
  onClick,
  hex,
  name,
  allLabel,
}: {
  active: boolean;
  onClick: () => void;
  hex: "all" | string;
  name?: string;
  allLabel?: string;
}) {
  const isAll = hex === "all";
  const label = isAll ? allLabel ?? "All" : name ?? hex;

  return (
    <button
      type="button"
      className={`catalog-color-swatch ${active ? "catalog-color-swatch--active" : ""} ${
        isAll ? "catalog-color-swatch--all" : ""
      }`}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <span
        className="catalog-color-swatch-fill"
        style={isAll ? undefined : { backgroundColor: hex }}
        aria-hidden
      />
    </button>
  );
}

export function CatalogFilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`catalog-filter-chip ${active ? "catalog-filter-chip--active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function CatalogFilterSections({
  locale,
  dict,
  models,
  categories,
  value,
  onChange,
  showCategory = true,
}: {
  locale: Locale;
  dict: Dictionary;
  models: DoorModel[];
  categories: CatalogCategoryOption[];
  value: CatalogFilterState;
  onChange: (next: CatalogFilterState) => void;
  showCategory?: boolean;
}) {
  const c = dict.catalog;
  const materials = getMaterialFilterOptions(models);
  const priceBounds = getCatalogPriceBounds(models);
  const categoryOptions: { slug: DoorCategory; name: string }[] = [
    { slug: "all", name: c.filters.all },
    ...categories.map((cat) => ({ slug: cat.slug as DoorCategory, name: cat.name })),
  ];

  return (
    <>
      {showCategory ? (
        <FilterSection label={c.filterCategoryLabel}>
          {categoryOptions.map((cat) => (
            <CatalogFilterChip
              key={cat.slug}
              active={value.category === cat.slug}
              onClick={() => onChange({ ...value, category: cat.slug })}
            >
              {cat.name}
            </CatalogFilterChip>
          ))}
        </FilterSection>
      ) : null}

      {priceBounds ? (
        <section className="catalog-filter-section">
          <h3 className="catalog-filter-section-label">{c.filterPriceLabel}</h3>
          <CatalogPriceRangeSlider
            locale={locale}
            bounds={priceBounds}
            value={{ priceMin: value.priceMin, priceMax: value.priceMax }}
            rangeToLabel={c.priceRangeTo}
            onChange={(price) => onChange({ ...value, ...price })}
          />
        </section>
      ) : null}

      <FilterSection label={c.filterMaterialLabel}>
        <CatalogFilterChip
          active={value.material === "all"}
          onClick={() => onChange({ ...value, material: "all" })}
        >
          {c.filterMaterialAll}
        </CatalogFilterChip>
        {materials.map((material) => (
          <CatalogFilterChip
            key={material}
            active={value.material === material}
            onClick={() => onChange({ ...value, material })}
          >
            {material}
          </CatalogFilterChip>
        ))}
      </FilterSection>

    </>
  );
}
