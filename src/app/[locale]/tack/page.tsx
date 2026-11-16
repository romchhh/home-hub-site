import Link from "next/link";
import { AdsConversionBeacon } from "@/components/AdsConversionBeacon";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { getDictionary } from "@/dictionaries";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  return createPageMetadata({
    locale,
    path: "/tack",
    title: dict.thankYou.title,
    description: dict.thankYou.lead,
    noIndex: true,
  });
}

export default async function ThankYouPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const t = dict.thankYou;

  return (
    <>
      <AdsConversionBeacon />
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "/tack",
            name: t.title,
            description: t.lead,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: t.title, path: "/tack" },
          ]),
        ]}
      />
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={t.title}
        title={t.title}
        lead={t.lead}
      />
      <section className="site-section site-section--tight-top">
        <div className="legal-doc">
          <p>{t.body}</p>
          <p>
            <Link href={localePath(locale, "/")} className="cookie-banner-link">
              {t.backHome}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
