"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "@/lib/cookieConsent";
import { localePath, type Locale } from "@/lib/i18n";

export function CookieConsentBanner({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [visible, setVisible] = useState(false);
  const c = dict.cookieBanner;

  useEffect(() => {
    const existing = readCookieConsent();
    if (!existing) {
      setVisible(true);
      document.body.classList.add("cookie-banner-open");
    }
  }, []);

  function choose(value: CookieConsent) {
    writeCookieConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-live="polite">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-copy">
          <h2 id="cookie-banner-title" className="cookie-banner-title">
            {c.title}
          </h2>
          <p className="cookie-banner-text">
            {c.text}{" "}
            <Link href={localePath(locale, "/cookies")} className="cookie-banner-link">
              {c.learnMore}
            </Link>
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-banner-btn cookie-banner-btn--ghost" onClick={() => choose("essential")}>
            {c.essentialOnly}
          </button>
          <button type="button" className="cookie-banner-btn cookie-banner-btn--solid" onClick={() => choose("all")}>
            {c.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
