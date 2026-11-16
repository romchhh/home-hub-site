import { analyticsAllowed, readCookieConsent } from "@/lib/cookieConsent";

/** Shared Google tag / GTM container from Ads setup. */
export const GTM_ID = "GTM-5KCW4RHH";
/** Google Ads conversion account. */
export const AW_ID = "AW-18539496369";
/** Event snippet: “Надсилання форми для лідів”. */
export const AW_CONVERSION_SEND_TO = "AW-18539496369/P3DlCPaGybkdELGHqYhF";

/** Set after a successful lead form POST; consumed once on /tack. */
export const LEAD_CONVERSION_PENDING_KEY = "homehub-pending-lead-conversion";

export function markLeadConversionPending() {
  try {
    sessionStorage.setItem(LEAD_CONVERSION_PENDING_KEY, "1");
  } catch {
    // private mode
  }
}

/** Returns true once per successful form submit (clears the marker). */
export function consumeLeadConversionPending(): boolean {
  try {
    if (sessionStorage.getItem(LEAD_CONVERSION_PENDING_KEY) !== "1") return false;
    sessionStorage.removeItem(LEAD_CONVERSION_PENDING_KEY);
    return true;
  } catch {
    return false;
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function ensureGtag() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
}

export function gtag(...args: unknown[]) {
  ensureGtag();
  window.gtag?.(...args);
}

export function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Config Google tag + Ads after analytics consent. */
export function configureGoogleTags() {
  ensureGtag();
  gtag("js", new Date());
  gtag("config", GTM_ID);
  gtag("config", AW_ID);
}

/** Fire after a successful contact / lead form submit. */
export function trackLeadFormSubmit(details?: {
  model?: string;
  source?: string;
  intent?: string;
}) {
  if (!analyticsAllowed(readCookieConsent())) return;

  // Google Ads conversion snippet (lead form).
  gtag("event", "conversion", {
    send_to: AW_CONVERSION_SEND_TO,
  });

  // Also expose a dataLayer event for GTM triggers if needed.
  pushDataLayer({
    event: "generate_lead",
    form_name: "contact_request",
    ...(details?.model ? { model: details.model } : {}),
    ...(details?.source ? { form_source: details.source } : {}),
    ...(details?.intent ? { form_intent: details.intent } : {}),
  });
}
