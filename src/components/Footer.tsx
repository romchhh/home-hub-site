import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { ContactInfo } from "@/lib/contactInfo";
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
  { key: "shipping", path: "/leverans" },
  { key: "returns", path: "/retur" },
  { key: "cookies", path: "/cookies" },
] as const;

export function Footer({
  locale,
  dict,
  contact,
}: {
  locale: Locale;
  dict: Dictionary;
  contact: ContactInfo;
}) {
  const n = dict.nav;
  const f = dict.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer page-gutter-x">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo locale={locale} className="footer-logo" />
          <p className="footer-tagline">{contact.tagline[locale]}</p>
          <p className="footer-company text-body-sm text-muted">
            {contact.companyName}
            <br />
            {locale === "sv" ? "Org.nr" : "Org. no."} {contact.orgNr}
            <br />
            {f.vatNote}
            <br />
            {contact.addressLine1}, {contact.addressLine2}
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
          <ContactInfoPanel locale={locale} labels={dict.showroom} contact={contact} compact />
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
        <span>
          © {year} {contact.companyName}
        </span>
        <span>{f.note}</span>
      </div>
    </footer>
  );
}
