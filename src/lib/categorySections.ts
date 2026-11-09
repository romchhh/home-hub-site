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
  /** Unique DOM / jump id fragment */
  id: string;
  slug: string;
  name: string;
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

/** Sticky bar targets — always one chip per top-level category section. */
export function buildCategoryJumpTargets(
  sections: CategorySection[],
): CategoryJumpTarget[] {
  return sections.map((section) => ({
    id: section.slug,
    slug: section.slug,
    name: section.name,
  }));
}

/** Sticky bar targets when browsing inside one category with subcategories. */
export function buildSubcategoryJumpTargets(
  section: CategorySection,
): CategoryJumpTarget[] {
  return section.subgroups
    .filter((g): g is CategorySubgroup & { slug: string; name: string } =>
      Boolean(g.slug && g.name),
    )
    .map((g) => ({
      id: `${section.slug}__${g.slug}`,
      slug: g.slug,
      name: g.name,
    }));
}

export function categorySectionDomId(prefix: string, id: string) {
  return `${prefix}-${id}`;
}
