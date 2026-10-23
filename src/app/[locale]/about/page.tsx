import Image from "next/image";
import { ContactSection } from "@/components/ContactSection";
import { ShowroomVisitSection } from "@/components/ShowroomVisitSection";
import { Em } from "@/components/Em";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { ServiceCard } from "@/components/ServiceCard";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const a = dict.about;
  const seo = getSeoForPage(locale, "about");

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "/about",
            name: seo.title,
            description: seo.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: a.breadcrumb, path: "/about" },
          ]),
        ]}
      />
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={a.breadcrumb}
        title={a.title}
        titleEm={a.titleEm}
        lead={a.lead}
      />
      <section className="editorial site-section site-section--tight-top">
        <div className="editorial-media">
          <Image
            src="/images/hero.png"
            alt={dict.home.heroImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="editorial-copy">
          <h2>
            {a.storyTitle}
            <br />
            <Em>{a.storyTitleEm}</Em>
          </h2>
          <p className="editorial-intro">{a.storyIntro}</p>
        </div>
      </section>
      <section className="site-section site-section--tight-top">
        <div className="prose-home">
          {a.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="prose-home-emphasis">{a.welcome}</p>
        </div>
      </section>
      <section className="site-section">
        <div className="section-heading">
          <h2>{a.valuesTitle}</h2>
        </div>
        <div className="services-grid services-grid--3">
          {a.values.map((card) => (
            <ServiceCard key={card.index} index={card.index} title={card.title} text={card.text} />
          ))}
        </div>
      </section>
      <ShowroomVisitSection
        locale={locale}
        dict={dict}
        title={dict.showroom.visitTitle}
        lead={dict.showroom.visitLead}
        showMap
      />
      <ContactSection dict={dict} />
    </>
  );
}
