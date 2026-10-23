import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { ContactInfoPanel } from "./ContactInfoPanel";
import { Logo } from "./Logo";

const links = [
  { key: "home", path: "" },
  { key: "offers", path: "/offers" },
  { key: "catalog", path: "/catalog" },
  { key: "services", path: "/services" },
  { key: "projects", path: "/projects" },
  { key: "partnerships", path: "/partnerships" },
  { key: "contact", path: "/contact" },
  { key: "about", path: "/about" },
] as const;

const legalLinks = [
  { key: "privacy", path: "/integritetspolicy" },
  { key: "terms", path: "/kopvillkor" },
  { key: "cookies", path: "/cookies" },
] as const;

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const n = dict.nav;
  const f = dict.footer;
  return (
    <footer className="site-footer page-gutter-x">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo locale={locale} className="footer-logo" />
          <p className="footer-tagline">{dict.meta.tagline}</p>
          <p className="footer-company text-body-sm text-muted">
            {f.companyName}
            <br />
            {locale === "sv" ? "Org.nr" : "Org. no."} {f.orgNr}
          </p>
        </div>

        <div className="footer-column footer-column--nav">
          <h2 className="footer-column-heading text-label">{f.navHeading}</h2>
          <nav className="footer-nav" aria-label={f.navHeading}>
            {links.map(({ key, path }) => (
              <Link key={key} href={localePath(locale, path || "/")}>
                {n[key]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-column--contact">
          <h2 className="footer-column-heading text-label">{f.contactHeading}</h2>
          <ContactInfoPanel locale={locale} labels={dict.showroom} compact />
        </div>

        <div className="footer-column footer-column--legal">
          <h2 className="footer-column-heading text-label">{f.legalHeading}</h2>
          <nav className="footer-nav" aria-label={f.legalHeading}>
            {legalLinks.map(({ key, path }) => (
              <Link key={key} href={localePath(locale, path)}>
                {f[key]}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{f.copyright}</span>
        <span>{f.note}</span>
      </div>
    </footer>
  );
}
