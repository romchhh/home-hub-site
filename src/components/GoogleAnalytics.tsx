"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import {
  analyticsAllowed,
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
} from "@/lib/cookieConsent";

/** GA4 measurement ID for stream “home” (https://home-hub.se). */
export const GA_MEASUREMENT_ID = "G-BRDQP3CR67";

/**
 * Loads GA4 only after the visitor accepts analytics cookies.
 * Placed in the root layout so it is not nested inside client providers incorrectly.
 */
export function GoogleAnalytics() {
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
  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
