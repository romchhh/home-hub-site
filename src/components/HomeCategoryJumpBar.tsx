"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export type HomeCategoryJumpItem = {
  slug: string;
  name: string;
};

type JumpBarProps = {
  sections: HomeCategoryJumpItem[];
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

export function HomeCategoryJumpBar({
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
  const inProductsRef = useRef(false);
  const pinnedRef = useRef(pinned);

  useEffect(() => {
    pinnedRef.current = pinned;
    if (pinned) setVisible(true);
  }, [pinned]);

  useEffect(() => {
    let ticking = false;

    const measureZone = () => {
      const gate = gateRef.current;
      if (!gate) return;
      const rect = gate.getBoundingClientRect();
      const header = readHeaderOffset();
      // Enter after the product block rises into the upper half of the screen.
      const started = rect.top < window.innerHeight * 0.52;
      // Leave once the whole block has scrolled away under the header.
      const stillHere = rect.bottom > header + 72;
      const next = started && stillHere;
      inProductsRef.current = next;
      if (!next && !pinnedRef.current) setVisible(false);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measureZone();
        ticking = false;
      });
    };

    measureZone();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [gateRef]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let hideTimer: number | null = null;

    const clearHide = () => {
      if (hideTimer != null) {
        window.clearTimeout(hideTimer);
        hideTimer = null;
      }
    };

    const scheduleHide = () => {
      clearHide();
      hideTimer = window.setTimeout(() => {
        if (!pinnedRef.current) setVisible(false);
      }, 260);
    };

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      ticking = false;

      if (pinnedRef.current) {
        clearHide();
        setVisible(true);
        return;
      }

      if (!inProductsRef.current || y < 140) {
        clearHide();
        setVisible(false);
        return;
      }

      // Ignore trackpad jitter
      if (Math.abs(delta) < 8) return;

      if (delta < 0) {
        clearHide();
        setVisible(true);
      } else {
        scheduleHide();
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearHide();
    };
  }, []);

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
      className={`home-category-jump${visible ? " home-category-jump--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="home-category-jump-shell page-gutter-x">
        <nav
          className="home-category-jump-panel"
          aria-label={ariaLabel}
          inert={!visible}
        >
          <div ref={trackRef} className="home-category-jump-track">
            {sections.map((section) => {
              const active = activeSlug === section.slug;
              return (
                <button
                  key={section.slug}
                  ref={(node) => {
                    btnRefs.current[section.slug] = node;
                  }}
                  type="button"
                  className={`home-category-jump-chip${active ? " home-category-jump-chip--active" : ""}`}
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
