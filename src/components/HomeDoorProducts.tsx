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
import type { Locale } from "@/lib/i18n";
import { HomeCategoryJumpBar } from "./HomeCategoryJumpBar";
import { Pill } from "./Pill";
import { ProductCard } from "./ProductCard";

const PREVIEW_MOBILE = 4; // 2 rows × 2 cols
const PREVIEW_DESKTOP = 8; // 2 rows × 4 cols
const JUMP_PIN_MS = 900;

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

function sectionDomId(slug: string) {
  return `home-category-${slug}`;
}

function readHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 84;
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

  useEffect(() => {
    return () => {
      if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const nodes = sections
      .map((section) => document.getElementById(sectionDomId(section.slug)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const headerOffset = readHeaderOffset();

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
        const slug = top.target.id.replace(/^home-category-/, "");
        setActiveSlug(slug);
      },
      {
        rootMargin: `-${headerOffset + 72}px 0px -48% 0px`,
        threshold: [0.08, 0.2, 0.4],
      },
    );

    for (const node of nodes) observer.observe(node);
    setActiveSlug((prev) => prev ?? sections[0]?.slug ?? null);
    return () => observer.disconnect();
  }, [sections]);

  const jumpToSection = useCallback((slug: string) => {
    const el = document.getElementById(sectionDomId(slug));
    if (!el) return;

    setActiveSlug(slug);
    setJumpPinned(true);
    if (pinTimerRef.current != null) window.clearTimeout(pinTimerRef.current);
    pinTimerRef.current = window.setTimeout(() => {
      setJumpPinned(false);
      pinTimerRef.current = null;
    }, JUMP_PIN_MS);

    const headerOffset = readHeaderOffset();
    const jumpBar = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - jumpBar;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  return (
    <div ref={rootRef} className="home-category-sections">
      <HomeCategoryJumpBar
        sections={sections.map((s) => ({ slug: s.slug, name: s.name }))}
        activeSlug={activeSlug}
        ariaLabel={c.filterCategoryLabel}
        gateRef={rootRef}
        pinned={jumpPinned}
        onJump={jumpToSection}
      />

      {sections.map((section) => {
        const isExpanded = Boolean(expanded[section.slug]);
        const visible = isExpanded ? section.items : section.items.slice(0, previewCount);
        const canToggle = section.items.length > previewCount;

        return (
          <div
            key={section.slug}
            id={sectionDomId(section.slug)}
            className="home-category-section"
          >
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
