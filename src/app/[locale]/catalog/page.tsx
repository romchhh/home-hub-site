import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";
import { CatalogLegacyRedirect } from "@/components/CatalogLegacyRedirect";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { getDictionary } from "@/dictionaries";
import { getCatalogCategories, getModels } from "@/lib/catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
} from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

/** Always read live catalog DB (admin edits / reseed) — do not bake at build. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/catalog">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "catalog");
}

export default async function CatalogPage({ params }: PageProps<"/[locale]/catalog">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const c = dict.catalog;
  const models = getModels(locale);
  const categories = getCatalogCategories(locale);
  const seo = getSeoForPage(locale, "catalog");

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd(locale, {
            path: "/catalog",
            name: seo.title,
            description: seo.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: c.breadcrumb, path: "/catalog" },
          ]),
          itemListJsonLd(
            locale,
            seo.title,
            models.map((m) => ({
              name: m.name,
              path: `/catalog/${m.slug}`,
              image: m.image,
            })),
          ),
        ]}
      />
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={c.breadcrumb}
        title={c.title}
        titleEm={c.titleEm}
        lead={c.lead}
      />
      <Suspense fallback={null}>
        <CatalogLegacyRedirect locale={locale} />
        <CatalogClient
          locale={locale}
          dict={dict}
          models={models}
          categories={categories}
        />
      </Suspense>
      <ContactSection dict={dict} />
    </>
  );
}
