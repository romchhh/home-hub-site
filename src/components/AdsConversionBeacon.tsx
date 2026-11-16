"use client";

import { useEffect, useRef } from "react";
import {
  consumeLeadConversionPending,
  LEAD_CONVERSION_PENDING_KEY,
  trackLeadFormSubmit,
} from "@/lib/analytics";

/**
 * Fires the Google Ads lead conversion once on the thank-you page.
 * Matches Ads “conversion page” setup so Tag Assistant can verify the URL.
 */
export function AdsConversionBeacon() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    try {
      if (sessionStorage.getItem(LEAD_CONVERSION_PENDING_KEY) !== "1") return;
    } catch {
      return;
    }

    let tries = 40;
    function attempt() {
      if (typeof window.gtag === "function") {
        if (!consumeLeadConversionPending()) return;
        fired.current = true;
        trackLeadFormSubmit({ intent: "general", source: "Thank you page" });
        return;
      }
      try {
        if (sessionStorage.getItem(LEAD_CONVERSION_PENDING_KEY) !== "1") return;
      } catch {
        return;
      }
      if (tries-- <= 0) return;
      window.setTimeout(attempt, 250);
    }
    attempt();
  }, []);

  return null;
}
