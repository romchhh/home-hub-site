import { JsonLd } from "@/components/JsonLd";
import { LegalDocument } from "@/components/LegalDocument";
import { PageHead } from "@/components/PageHead";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "shipping");
}

export default async function ShippingPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const l = dict.legal;
  const seo = getSeoForPage(locale, "shipping");

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "/leverans",
            name: seo.title,
            description: seo.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: l.shippingTitle, path: "/leverans" },
          ]),
        ]}
      />
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={l.shippingTitle}
        title={l.shippingTitle}
      />
      <LegalDocument intro={l.shippingIntro} sections={l.shippingSections} />
    </>
  );
}
