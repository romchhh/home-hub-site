"use client";

import type { Dictionary } from "@/dictionaries";
import { useRequest } from "@/context/RequestContext";
import type { Locale } from "@/lib/i18n";

export function FloatingContactButton({
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { openRequest } = useRequest();

  return (
    <div className="floating-contact-wrap">
      <button
        type="button"
        className="floating-contact-btn"
        onClick={() =>
          openRequest({ intent: "general", source: "Floating · Kontakta oss" })
        }
      >
        {dict.nav.contactCta}
      </button>
    </div>
  );
}
