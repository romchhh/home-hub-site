"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRequest } from "@/context/RequestContext";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { LanguageMenu } from "./LanguageMenu";
import { Logo } from "./Logo";
import { Pill } from "./Pill";
import { SavedItemsNavButton } from "./SavedItemsNavButton";

const navItems = [
  { key: "home", path: "" },
  { key: "about", path: "/about" },
  { key: "offers", path: "/offers" },
  { key: "projects", path: "/projects" },
  { key: "services", path: "/services" },
  { key: "contact", path: "/contact" },
  { key: "catalog", path: "/catalog" },
  { key: "partnerships", path: "/partnerships" },
] as const;

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-toggle-icon ${open ? "menu-toggle-icon--open" : ""}`} aria-hidden>
      <span className="menu-toggle-line" />
      <span className="menu-toggle-line" />
      <span className="menu-toggle-line" />
    </span>
  );
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openRequest } = useRequest();
  const n = dict.nav;

  useLockBodyScroll(menuOpen);

  function hrefFor(path: string) {
    return localePath(locale, path || "/");
  }

  function isActive(path: string) {
    const href = hrefFor(path);
    if (path === "") return pathname === href || pathname === `${href}/`;
    return pathname.startsWith(href);
  }

  function handleContact() {
    setMenuOpen(false);
    openRequest({ intent: "general", source: "Header · Contact us" });
  }

  return (
    <header className={`site-header page-gutter-x ${menuOpen ? "site-header--menu-open" : ""}`}>
      <div className="site-header-inner">
        <Logo locale={locale} className="site-header-logo" />

        <nav
          id="nav"
          className={`nav-panel ${menuOpen ? "nav-panel--open" : ""}`}
        >
          <div className="nav-panel-links">
            {navItems.map(({ key, path }) => (
              <Link
                key={key}
                href={hrefFor(path)}
                className={`nav-link ${isActive(path) ? "nav-link--active" : ""}`}
                aria-current={isActive(path) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {n[key]}
              </Link>
            ))}
          </div>
          <div className="nav-panel-cta">
            <Pill className="nav-contact-cta" onClick={handleContact}>
              {n.contactCta}
            </Pill>
          </div>
        </nav>

        <div className="header-tools">
          <Pill className="header-contact-btn" onClick={handleContact}>
            {n.contactCta}
          </Pill>
          <SavedItemsNavButton locale={locale} dict={dict} />
          <LanguageMenu locale={locale} label={n.language} />
          <button
            id="menu"
            type="button"
            className={`header-menu-toggle ${menuOpen ? "header-menu-toggle--open" : ""}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? n.close : n.menu}
            aria-controls="nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuToggleIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label={n.close}
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
