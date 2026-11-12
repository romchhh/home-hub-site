"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GTM_ID, pushDataLayer } from "@/lib/analytics";
import {
  analyticsAllowed,
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
} from "@/lib/cookieConsent";

/**
 * Loads Google Tag Manager only after analytics cookies are accepted.
 * Form conversions are pushed to dataLayer as `generate_lead`.
 */
export function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function sync() {
      setEnabled(analyticsAllowed(readCookieConsent()));
    }
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    pushDataLayer({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height={0}
          width={0}
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
