"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { scrollToTopInstant } from "@/lib/scrollToTop";

const STORAGE_PREFIX = "hh-scroll:";

function storageKey(path: string) {
  return `${STORAGE_PREFIX}${path}`;
}

function readScroll(path: string): number | null {
  try {
    const raw = sessionStorage.getItem(storageKey(path));
    if (raw == null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function writeScroll(path: string, y: number) {
  try {
    sessionStorage.setItem(storageKey(path), String(Math.max(0, Math.round(y))));
  } catch {
    // private mode / quota
  }
}

function restoreScroll(y: number) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  const apply = () => {
    window.scrollTo({ top: y, left: 0 });
  };

  apply();
  requestAnimationFrame(() => {
    apply();
    requestAnimationFrame(apply);
  });
  // Home/catalog content can settle after paint — nudge a few times.
  const t1 = window.setTimeout(apply, 50);
  const t2 = window.setTimeout(apply, 160);
  const t3 = window.setTimeout(apply, 360);

  html.style.scrollBehavior = previous;
  return () => {
    window.clearTimeout(t1);
    window.clearTimeout(t2);
    window.clearTimeout(t3);
  };
}

/**
 * Scroll to top on forward navigations; restore previous position on Back/Forward.
 */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const isPopRef = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const onPopState = () => {
      isPopRef.current = true;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        writeScroll(pathnameRef.current, window.scrollY);
        ticking = false;
      });
    };

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a[href]")) return;
      writeScroll(pathnameRef.current, window.scrollY);
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClickCapture, true);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  useEffect(() => {
    const previousPath = pathnameRef.current;
    if (previousPath !== pathname) {
      writeScroll(previousPath, window.scrollY);
    }
    pathnameRef.current = pathname;

    if (isPopRef.current) {
      isPopRef.current = false;
      const y = readScroll(pathname);
      if (y != null && y > 0) {
        return restoreScroll(y);
      }
    }

    scrollToTopInstant();
  }, [pathname]);

  return null;
}
