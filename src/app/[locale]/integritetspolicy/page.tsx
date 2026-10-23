import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/integritetspolicy">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "privacy");
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[locale]/integritetspolicy">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const l = dict.legal;
  const seo = getSeoForPage(locale, "privacy");

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "/integritetspolicy",
            name: seo.title,
            description: seo.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: l.privacyTitle, path: "/integritetspolicy" },
          ]),
        ]}
      />
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={l.privacyTitle}
        title={l.privacyTitle}
      />
      <section className="site-section site-section--tight-top">
        <p className="text-body-sm text-muted max-w-prose">{l.placeholder}</p>
      </section>
    </>
  );
}
