"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/dictionaries";
import { useSavedItems } from "@/context/SavedItemsContext";
import { localePath, type Locale } from "@/lib/i18n";

function SavedIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden fill="none">
      <path
        d="M7.25 3.75h9.5a1.5 1.5 0 0 1 1.5 1.5v14.1l-5.35-3.35a1.75 1.75 0 0 0-1.8 0L5.75 19.35V5.25a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
      />
    </svg>
  );
}

export function SavedItemsNavButton({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { items } = useSavedItems();
  const pathname = usePathname();
  const count = items.length;
  const labels = dict.nav;
  const href = localePath(locale, "/catalog/saved");
  const isActive = pathname === href || pathname === `${href}/`;

  const ariaLabel =
    count > 0 ? `${labels.openSavedItems} (${count})` : labels.openSavedItemsEmpty;

  return (
    <Link
      href={href}
      className={`icon-btn icon-btn--sm header-saved-btn ${count > 0 ? "header-saved-btn--active" : ""} ${
        isActive ? "header-saved-btn--current" : ""
      }`}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}
    >
      <SavedIcon active={count > 0} />
      {count > 0 ? <span className="header-saved-badge">{count}</span> : null}
    </Link>
  );
}
