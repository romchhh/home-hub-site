import type {
  CatalogCategoryOption,
  CatalogSubcategoryOption,
  DoorModel,
} from "@/data/models";

export type CategorySubgroup = {
  slug: string | null;
  name: string | null;
  items: DoorModel[];
};

export type CategorySection = CatalogCategoryOption & {
  items: DoorModel[];
  subgroups: CategorySubgroup[];
};

export type CategoryJumpTarget = {
  /** Unique DOM / jump id fragment, e.g. entrance or entrance__apartment */
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  kind: "category" | "subcategory";
};

export function buildCategorySections(
  categories: CatalogCategoryOption[],
  models: DoorModel[],
): CategorySection[] {
  return [...categories]
    .sort((a, b) => a.priority - b.priority)
    .map((cat) => {
      const items = models.filter((m) => m.category === cat.slug);
      const subs = [...(cat.subcategories || [])].sort(
        (a, b) => a.priority - b.priority,
      );
      const subgroups = buildSubgroups(items, subs);
      return {
        ...cat,
        items,
        subgroups,
      };
    })
    .filter((section) => section.items.length > 0);
}

function buildSubgroups(
  items: DoorModel[],
  subs: CatalogSubcategoryOption[],
): CategorySubgroup[] {
  if (subs.length === 0) {
    return [{ slug: null, name: null, items }];
  }

  const groups: CategorySubgroup[] = [];
  for (const sub of subs) {
    const subItems = items.filter((m) => m.subcategory?.slug === sub.slug);
    if (subItems.length === 0) continue;
    groups.push({ slug: sub.slug, name: sub.name, items: subItems });
  }

  const ungrouped = items.filter((m) => !m.subcategory?.slug);
  if (ungrouped.length > 0) {
    groups.push({ slug: null, name: null, items: ungrouped });
  }

  return groups.length > 0 ? groups : [{ slug: null, name: null, items }];
}

/** Jump targets: subcategory chips when present, else the parent category. */
export function buildCategoryJumpTargets(
  sections: CategorySection[],
): CategoryJumpTarget[] {
  const targets: CategoryJumpTarget[] = [];
  for (const section of sections) {
    const namedSubs = section.subgroups.filter((g) => g.slug && g.name);
    if (namedSubs.length === 0) {
      targets.push({
        id: section.slug,
        slug: section.slug,
        name: section.name,
        categorySlug: section.slug,
        kind: "category",
      });
      continue;
    }

    for (const sub of namedSubs) {
      targets.push({
        id: `${section.slug}__${sub.slug}`,
        slug: sub.slug!,
        name: sub.name!,
        categorySlug: section.slug,
        kind: "subcategory",
      });
    }

    const ungrouped = section.subgroups.find((g) => !g.slug);
    if (ungrouped && ungrouped.items.length > 0) {
      targets.push({
        id: section.slug,
        slug: section.slug,
        name: section.name,
        categorySlug: section.slug,
        kind: "category",
      });
    }
  }
  return targets;
}

export function categorySectionDomId(prefix: string, id: string) {
  return `${prefix}-${id}`;
}
