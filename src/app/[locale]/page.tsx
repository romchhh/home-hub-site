import Image from "next/image";
import { ContactSection } from "@/components/ContactSection";
import { SplitTitle } from "@/components/SplitTitle";
import { HomeDetailBand } from "@/components/HomeDetailBand";
import { HomeIntroBlock } from "@/components/HomeIntroBlock";
import { HomeDoorProducts } from "@/components/HomeDoorProducts";
import { JsonLd } from "@/components/JsonLd";
import { Pill } from "@/components/Pill";
import { ServiceCard } from "@/components/ServiceCard";
import { getDictionary } from "@/dictionaries";
import { getCatalogCategories, getModels } from "@/lib/catalog";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { itemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

/** Home product strip reads catalog DB at request time. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "home");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const h = dict.home;
  const models = getModels(locale);
  const categories = getCatalogCategories(locale);
  const seo = getSeoForPage(locale, "home");
  const featured = [...categories]
    .sort((a, b) => a.priority - b.priority)
    .flatMap((cat) => models.filter((m) => m.category === cat.slug).slice(0, 2));

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "",
            name: seo.title,
            description: seo.description,
          }),
          itemListJsonLd(
            locale,
            locale === "sv" ? "Utvalda dörrar" : "Featured doors",
            featured.map((m) => ({
              name: m.name,
              path: `/catalog/${m.slug}`,
              image: m.image,
            })),
          ),
        ]}
      />
      <section className="hero site-section--flush">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <SplitTitle as="h1" title={h.heroTitle} titleEm={h.heroTitleEm} />
            <p className="hero-lead">{h.heroLead}</p>
            <Pill href={localePath(locale, "/catalog")}>{h.heroCta}</Pill>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-img relative">
            <Image
              src="/images/hero.png"
              alt={h.heroImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, 55vw"
            />
          </div>
          <p className="hero-showroom-caption">
            <strong>{h.heroShowroomTitle}</strong>
            <span>{h.heroShowroomAddress}</span>
          </p>
        </div>
      </section>

      <section className="site-section site-section--tight-top">
        <div className="section-heading">
          <SplitTitle as="h2" title={h.featuredTitle} titleEm={h.featuredTitleEm} />
          <Pill href={localePath(locale, "/catalog")} outline>
            {h.featuredCta}
          </Pill>
        </div>
        <HomeDoorProducts
          locale={locale}
          dict={dict}
          models={models}
          categories={categories}
        />
      </section>

      <HomeDetailBand dict={dict} />

      <HomeIntroBlock title={h.introTitle} titleEm={h.introTitleEm} text={h.introText} />

      <section className="site-section">
        <div className="section-heading">
          <SplitTitle as="h2" title={h.servicesTitle} titleEm={h.servicesTitleEm} />
          <Pill href={localePath(locale, "/services")} outline>
            {h.servicesCta}
          </Pill>
        </div>
        <div className="services-grid services-grid--3">
          <ServiceCard index="01" title={h.service1Title} text={h.service1Text} />
          <ServiceCard index="02" title={h.service2Title} text={h.service2Text} />
          <ServiceCard index="03" title={h.service3Title} text={h.service3Text} />
        </div>
      </section>

      <ContactSection dict={dict} />
    </>
  );
}
