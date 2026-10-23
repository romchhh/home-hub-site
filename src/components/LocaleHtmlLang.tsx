import type { Locale } from "@/lib/i18n";
import { LocaleHtmlLangClient } from "./LocaleHtmlLangClient";

/**
 * Sets `<html lang>` for the active locale without making the root layout dynamic.
 * Inline script runs before paint / for JS-capable crawlers; effect covers client nav.
 */
export function LocaleHtmlLang({ locale }: { locale: Locale }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <LocaleHtmlLangClient locale={locale} />
    </>
  );
}
