import type { DoorCategory, DoorModel } from "@/data/models";
import { isPricePublished } from "@/lib/formatPrice";

export const CATALOG_PRICE_STEP = 1_000;

export type CatalogPriceBounds = {
  min: number;
  max: number;
};

export type CatalogFilterState = {
  category: DoorCategory;
  priceMin: number;
  priceMax: number;
  material: string;
  colorHex: "all" | string;
};

export type CatalogColorFilterOption = {
  hex: string;
  name: string;
};

export function getCatalogPriceBounds(models: DoorModel[]): CatalogPriceBounds | null {
  const priced = models.filter((model) => isPricePublished(model.priceSek));
  if (priced.length === 0) {
    return null;
  }

  let min = Infinity;
  let max = -Infinity;
  for (const model of priced) {
    min = Math.min(min, model.priceSek);
    max = Math.max(max, model.priceSek);
  }

  return {
    min: Math.floor(min / CATALOG_PRICE_STEP) * CATALOG_PRICE_STEP,
    max: Math.ceil(max / CATALOG_PRICE_STEP) * CATALOG_PRICE_STEP,
  };
}

export function createDefaultCatalogFilters(bounds: CatalogPriceBounds | null): CatalogFilterState {
  return {
    category: "all",
    priceMin: bounds?.min ?? 0,
    priceMax: bounds?.max ?? 0,
    material: "all",
    colorHex: "all",
  };
}

export function snapCatalogPrice(value: number, bounds: CatalogPriceBounds): number {
  const snapped = Math.round(value / CATALOG_PRICE_STEP) * CATALOG_PRICE_STEP;
  return Math.min(bounds.max, Math.max(bounds.min, snapped));
}

export function isPriceFilterActive(
  filters: CatalogFilterState,
  bounds: CatalogPriceBounds | null,
): boolean {
  if (!bounds) return false;
  return filters.priceMin > bounds.min || filters.priceMax < bounds.max;
}

export function getMaterialFilterOptions(models: DoorModel[]): string[] {
  const materials = new Set<string>();
  for (const model of models) {
    materials.add(model.material);
  }
  return Array.from(materials).sort((a, b) => a.localeCompare(b));
}

export function getColorFilterOptions(models: DoorModel[]): CatalogColorFilterOption[] {
  const byHex = new Map<string, string>();
  for (const model of models) {
    for (const color of model.colors) {
      const hex = color.hex.toLowerCase();
      if (!byHex.has(hex)) byHex.set(hex, color.name);
    }
  }
  return Array.from(byHex.entries())
    .map(([hex, name]) => ({ hex, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function filterCatalogModels(
  models: DoorModel[],
  searchQuery: string,
  filters: CatalogFilterState,
): DoorModel[] {
  const q = searchQuery.trim().toLowerCase();

  return models.filter((model) => {
    if (filters.category !== "all" && model.category !== filters.category) return false;
    if (filters.material !== "all" && model.material !== filters.material) return false;
    if (filters.colorHex !== "all") {
      const target = filters.colorHex.toLowerCase();
      if (!model.colors.some((color) => color.hex.toLowerCase() === target)) return false;
    }
    if (
      isPricePublished(model.priceSek) &&
      (model.priceSek < filters.priceMin || model.priceSek > filters.priceMax)
    ) {
      return false;
    }

    if (!q) return true;

    const haystack = [
      model.name,
      model.label,
      model.material,
      model.finish,
      model.hardware,
      model.description,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function countActiveCatalogFilters(
  filters: CatalogFilterState,
  bounds: CatalogPriceBounds | null,
): number {
  let count = 0;
  if (filters.category !== "all") count += 1;
  if (isPriceFilterActive(filters, bounds)) count += 1;
  if (filters.material !== "all") count += 1;
  if (filters.colorHex !== "all") count += 1;
  return count;
}
