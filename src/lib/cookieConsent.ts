export const COOKIE_CONSENT_KEY = "homehub-cookie-consent";
export const COOKIE_CONSENT_EVENT = "homehub:cookie-consent";

export type CookieConsent = "all" | "essential";

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "all" || value === "essential") return value;
  } catch {
    // private mode / blocked storage
  }
  return null;
}

export function writeCookieConsent(value: CookieConsent) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  document.body.classList.toggle("cookie-banner-open", false);
}

export function analyticsAllowed(consent: CookieConsent | null): boolean {
  return consent === "all";
}
