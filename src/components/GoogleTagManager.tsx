"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { AW_ID, GTM_ID } from "@/lib/analytics";
import {
  analyticsAllowed,
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
} from "@/lib/cookieConsent";

/**
 * GTM-M3WMD66Z + Google Ads AW-18539496369.
 * Loads only after analytics cookies are accepted.
 * Consent Mode is updated to granted at load (user already opted in).
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
      <Script id="google-gtm" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
          });
        `}
      </Script>
      <Script
        id="google-gtm-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
      <Script
        id="google-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`}
      />
      <Script id="google-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${AW_ID}');
        `}
      </Script>
    </>
  );
}
