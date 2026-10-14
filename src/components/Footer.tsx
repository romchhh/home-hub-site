import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { ContactInfoPanel } from "./ContactInfoPanel";
import { Logo } from "./Logo";

const links = [
  { key: "home", path: "" },
  { key: "about", path: "/about" },
  { key: "catalog", path: "/catalog" },
  { key: "offers", path: "/offers" },
  { key: "projects", path: "/projects" },
  { key: "services", path: "/services" },
  { key: "partnerships", path: "/partnerships" },
  { key: "contact", path: "/contact" },
] as const;

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const n = dict.nav;
  return (
    <footer className="site-footer page-gutter-x">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo locale={locale} className="footer-logo" />
          <p className="footer-tagline">{dict.meta.tagline}</p>
        </div>

        <div className="footer-column footer-column--nav">
          <h2 className="footer-column-heading text-label">{dict.footer.navHeading}</h2>
          <nav className="footer-nav" aria-label={dict.footer.navHeading}>
            {links.map(({ key, path }) => (
              <Link key={key} href={localePath(locale, path || "/")}>
                {n[key]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-column--contact">
          <h2 className="footer-column-heading text-label">{dict.footer.contactHeading}</h2>
          <ContactInfoPanel locale={locale} labels={dict.showroom} compact />
        </div>
      </div>

      <div className="footer-bottom">
        <span>{dict.footer.copyright}</span>
        <span>{dict.footer.note}</span>
      </div>
    </footer>
  );
}
