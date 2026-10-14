"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

export function LanguageMenu({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const listId = useId();
  const code = locale.toUpperCase();

  function switchLocale(target: Locale) {
    const rest = pathname.replace(/^\/(sv|en)/, "") || "/";
    return `/${target}${rest === "/" ? "" : rest}`;
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="language-menu relative" ref={rootRef}>
      <button
        type="button"
        className={`language-trigger icon-btn icon-btn--sm ${open ? "language-trigger--open" : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={`${label}: ${code}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="language-trigger-code" aria-hidden>
          {code}
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="language-dropdown"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <Link
                href={switchLocale(loc)}
                lang={loc}
                aria-current={loc === locale ? "page" : undefined}
                className="text-body-sm transition-colors hover:bg-[var(--surface)]"
                onClick={() => setOpen(false)}
              >
                {loc.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
