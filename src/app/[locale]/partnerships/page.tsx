import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { PartnershipCta } from "@/components/PartnershipCta";
import { ServiceCard } from "@/components/ServiceCard";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/partnerships">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "partnerships");
}

export default async function PartnershipsPage({
  params,
}: PageProps<"/[locale]/partnerships">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const p = dict.partnerships;
  const seo = getSeoForPage(locale, "partnerships");

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "/partnerships",
            name: seo.title,
            description: seo.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: p.breadcrumb, path: "/partnerships" },
          ]),
        ]}
      />
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={p.breadcrumb}
        title={p.title}
        titleEm={p.titleEm}
        lead={p.lead}
      />
      <section className="site-section site-section--tight-top">
        <div className="services-grid services-grid--3 partnerships-cards">
          {p.cards.map((card) => (
            <ServiceCard key={card.index} index={card.index} title={card.title} text={card.text} />
          ))}
        </div>
      </section>
      <section className="editorial editorial--partnerships site-section">
        <div className="editorial-media">
          <Image
            src="/images/doors/vetro-01/01.jpg"
            alt={locale === "sv" ? "Ventro 01 — innerdörr" : "Ventro 01 — interior door"}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="editorial-copy">
          <h2>{p.briefTitle}</h2>
          <ol className="editorial-steps">
            {p.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <PartnershipCta dict={dict} />
        </div>
      </section>
    </>
  );
}
