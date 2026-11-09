"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export type CategoryJumpItem = {
  slug: string;
  name: string;
};

type JumpBarProps = {
  sections: CategoryJumpItem[];
  activeSlug: string | null;
  ariaLabel: string;
  /** Products block — bar only appears while browsing this zone. */
  gateRef: RefObject<HTMLElement | null>;
  /** While true, keep the bar visible (programmatic section jump). */
  pinned: boolean;
  onJump: (slug: string) => void;
};

function readHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 84;
}

export function CategoryJumpBar({
  sections,
  activeSlug,
  ariaLabel,
  gateRef,
  pinned,
  onJump,
}: JumpBarProps) {
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pinnedRef = useRef(pinned);
  const lastYRef = useRef(0);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    pinnedRef.current = pinned;
    if (pinned) setVisible(true);
  }, [pinned]);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const clearHide = () => {
      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const isInProductsZone = () => {
      const gate = gateRef.current;
      if (!gate) return false;
      const rect = gate.getBoundingClientRect();
      const header = readHeaderOffset();
      const started = rect.top < window.innerHeight * 0.65;
      const stillHere = rect.bottom > header + 48;
      return started && stillHere && window.scrollY > 80;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastYRef.current;
        lastYRef.current = y;
        ticking = false;

        if (pinnedRef.current) {
          clearHide();
          setVisible(true);
          return;
        }

        if (!isInProductsZone()) {
          clearHide();
          setVisible(false);
          return;
        }

        if (Math.abs(delta) < 4) return;

        if (delta < 0) {
          clearHide();
          setVisible(true);
        } else if (delta > 0) {
          clearHide();
          hideTimerRef.current = window.setTimeout(() => {
            if (!pinnedRef.current) setVisible(false);
          }, 180);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearHide();
    };
  }, [gateRef]);

  useEffect(() => {
    if (!visible || !activeSlug) return;
    const btn = btnRefs.current[activeSlug];
    const track = trackRef.current;
    if (!btn || !track) return;

    const btnLeft = btn.offsetLeft;
    const btnRight = btnLeft + btn.offsetWidth;
    const viewLeft = track.scrollLeft;
    const viewRight = viewLeft + track.clientWidth;
    const pad = 32;

    if (btnLeft < viewLeft + pad) {
      track.scrollTo({ left: Math.max(0, btnLeft - pad), behavior: "smooth" });
    } else if (btnRight > viewRight - pad) {
      track.scrollTo({
        left: btnRight - track.clientWidth + pad,
        behavior: "smooth",
      });
    }
  }, [activeSlug, visible]);

  if (sections.length < 2) return null;

  return (
    <div
      className={`category-jump${visible ? " category-jump--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="category-jump-shell page-gutter-x">
        <nav className="category-jump-panel" aria-label={ariaLabel} inert={!visible}>
          <div ref={trackRef} className="category-jump-track">
            {sections.map((section) => {
              const active = activeSlug === section.slug;
              return (
                <button
                  key={section.slug}
                  ref={(node) => {
                    btnRefs.current[section.slug] = node;
                  }}
                  type="button"
                  className={`category-jump-chip${active ? " category-jump-chip--active" : ""}`}
                  aria-current={active ? "true" : undefined}
                  tabIndex={visible ? 0 : -1}
                  onClick={() => onJump(section.slug)}
                >
                  {section.name}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export function readCategoryJumpHeaderOffset() {
  return readHeaderOffset();
}

export function scrollToCategorySection(sectionId: string, jumpBarReserve = 64) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    readHeaderOffset() -
    jumpBarReserve;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
