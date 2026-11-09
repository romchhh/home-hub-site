"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Dictionary } from "@/dictionaries";
import type { CatalogCategoryOption, DoorModel } from "@/data/models";
import {
  buildCategoryJumpTargets,
  buildCategorySections,
  categorySectionDomId,
} from "@/lib/categorySections";
import type { Locale } from "@/lib/i18n";
import {
  CategoryJumpBar,
  readCategoryJumpHeaderOffset,
  scrollToCategorySection,
} from "./CategoryJumpBar";
import { Pill } from "./Pill";
import { ProductCard } from "./ProductCard";

const PREVIEW_MOBILE = 4;
const PREVIEW_DESKTOP = 8;
const JUMP_PIN_MS = 900;
const SECTION_PREFIX = "home-category";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [jumpPinned, setJumpPinned] = useState(false);
  const pinTimerRef = useRef<number | null>(null);

  const sections = useMemo(
    () => buildCategorySections(categories, models),
    [categories, models],
  );
  const jumpTargets = useMemo(
    () => buildCategoryJumpTargets(sections),
    [sections],
  );

  useEffect(() => {
    return () => {
      if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (jumpTargets.length === 0) return;

    const nodes = jumpTargets
      .map((target) =>
        document.getElementById(categorySectionDomId(SECTION_PREFIX, target.id)),
      )
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const headerOffset = readCategoryJumpHeaderOffset();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              b.intersectionRatio - a.intersectionRatio,
          );
        const top = visible[0];
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
  }, [jumpTargets]);

  const jumpToSection = useCallback((id: string) => {
    setActiveSlug(id);
    setJumpPinned(true);
    if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    pinTimerRef.current = window.setTimeout(() => {
      setJumpPinned(false);
      pinTimerRef.current = null;
    }, JUMP_PIN_MS);
    scrollToCategorySection(categorySectionDomId(SECTION_PREFIX, id));
  }, []);

  return (
    <div ref={rootRef} className="home-category-sections">
      <CategoryJumpBar
        sections={jumpTargets.map((t) => ({ slug: t.id, name: t.name }))}
        activeSlug={activeSlug}
        ariaLabel={c.filterCategoryLabel}
        gateRef={rootRef}
        pinned={jumpPinned}
        onJump={jumpToSection}
      />

      {sections.map((section) => {
        const isExpanded = Boolean(expanded[section.slug]);
        const canToggle = section.items.length > previewCount;
        const visibleSlugs = new Set(
          (isExpanded ? section.items : section.items.slice(0, previewCount)).map(
            (m) => m.slug,
          ),
        );
        const hasNamedSubs = section.subgroups.some((g) => g.slug);

        return (
          <div key={section.slug} className="home-category-section">
            {!hasNamedSubs ? (
              <div id={categorySectionDomId(SECTION_PREFIX, section.slug)}>
                <h3 className="home-category-title">{section.name}</h3>
              </div>
            ) : (
              <h3 className="home-category-title">{section.name}</h3>
            )}

            {section.subgroups.map((group) => {
              const blockId = group.slug
                ? `${section.slug}__${group.slug}`
                : section.slug;
              const visible = group.items.filter((m) => visibleSlugs.has(m.slug));
              if (visible.length === 0) return null;

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
                </div>
              );
            })}

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
