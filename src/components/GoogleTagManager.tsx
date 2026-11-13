"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { configureGoogleTags, GTM_ID } from "@/lib/analytics";
import {
  analyticsAllowed,
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
} from "@/lib/cookieConsent";

/**
 * Google tag (gtag.js) for GTM-5KCW4RHH + Google Ads AW-18539496369.
 * Loads only after analytics cookies are accepted.
 * Lead form conversions fire via `trackLeadFormSubmit`.
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

  if (!enabled) return null;

  return (
    <>
      <Script
        id="google-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        onLoad={() => {
          configureGoogleTags();
        }}
      />
      <Script id="google-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GTM_ID}');
          gtag('config', 'AW-18539496369');
        `}
      </Script>
    </>
  );
}
