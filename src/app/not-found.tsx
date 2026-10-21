import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `404 | ${siteName}` },
  description: "Sidan hittades inte.",
  robots: { index: false, follow: true },
};

/** Root fallback — Swedish by default (site primary), English as a quiet alt link. */
export default function NotFound() {
  return (
    <NotFoundView
      locale="sv"
      code="404"
      title="Sidan hittades inte"
      lead="Länken kan vara felaktig eller sidan kan ha flyttats."
      homeLabel="Till startsidan"
      catalogLabel="Våra produkter"
      contactLabel="Kontakt"
      altHome={{ locale: "en", label: "English home" }}
    />
  );
}
