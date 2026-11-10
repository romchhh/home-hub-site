import { JsonLd } from "@/components/JsonLd";
import { LegalDocument } from "@/components/LegalDocument";
import { PageHead } from "@/components/PageHead";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/cookies">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "cookies");
}

export default async function CookiesPage({ params }: PageProps<"/[locale]/cookies">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const l = dict.legal;
  const seo = getSeoForPage(locale, "cookies");

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "/cookies",
            name: seo.title,
            description: seo.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: l.cookiesTitle, path: "/cookies" },
          ]),
        ]}
      />
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={l.cookiesTitle}
        title={l.cookiesTitle}
      />
      <LegalDocument intro={l.cookiesIntro} sections={l.cookiesSections} />
    </>
  );
}
