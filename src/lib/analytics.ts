import { analyticsAllowed, readCookieConsent } from "@/lib/cookieConsent";

export const GTM_ID = "GTM-5KCW4RHH";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Fire after a successful contact / lead form submit (GTM conversion trigger). */
export function trackLeadFormSubmit(details?: {
  model?: string;
  source?: string;
  intent?: string;
}) {
  if (!analyticsAllowed(readCookieConsent())) return;
  pushDataLayer({
    event: "generate_lead",
    form_name: "contact_request",
    ...(details?.model ? { model: details.model } : {}),
    ...(details?.source ? { form_source: details.source } : {}),
    ...(details?.intent ? { form_intent: details.intent } : {}),
  });
}
