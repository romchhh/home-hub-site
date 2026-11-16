"use client";

import { useEffect, useRef } from "react";
import { trackLeadFormSubmit } from "@/lib/analytics";

/**
 * Fires the Google Ads lead conversion once on the thank-you page.
 * Matches Ads “conversion page” setup so Tag Assistant can verify the URL.
 */
export function AdsConversionBeacon() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    let tries = 40;
    function attempt() {
      if (typeof window.gtag === "function") {
        trackLeadFormSubmit({ intent: "general", source: "Thank you page" });
        return;
      }
      if (tries-- <= 0) return;
      window.setTimeout(attempt, 250);
    }
    attempt();
  }, []);

  return null;
}
