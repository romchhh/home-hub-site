import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

/** GA4 measurement ID for stream “home” (https://home-hub.se). */
export const GA_MEASUREMENT_ID = "G-BRDQP3CR67";

/**
 * Official Next.js GA4 loader — must sit in the root layout (not inside client providers)
 * so gtag.js actually runs for Google’s tag diagnostics.
 */
export function GoogleAnalytics() {
  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
