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
 * Google tag (gtag.js) for GTM-5KCW4RHH + Google Ads AW-18539496369.
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
      <Script
        id="google-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      />
      <Script id="google-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${GTM_ID}');
          gtag('config', '${AW_ID}');
        `}
      </Script>
    </>
  );
}
