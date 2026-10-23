import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export function FloatingContactButton({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="floating-contact-wrap">
      <Link href={localePath(locale, "/contact")} className="floating-contact-btn">
        {dict.nav.contactCta}
      </Link>
    </div>
  );
}
