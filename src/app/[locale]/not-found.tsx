import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `404 | ${siteName}` },
  robots: { index: false, follow: true },
};

export default async function LocaleNotFound({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolved = params ? await params : undefined;
  const localeParam = resolved?.locale;
  const locale = (
    localeParam && isLocale(localeParam) ? localeParam : "sv"
  ) as Locale;
  const dict = getDictionary(locale);
  const n = dict.notFound;

  return (
    <NotFoundView
      locale={locale}
      code={n.code}
      title={n.title}
      lead={n.lead}
      homeLabel={n.cta}
      catalogLabel={dict.nav.catalog}
      contactLabel={dict.nav.contact}
    />
  );
}
