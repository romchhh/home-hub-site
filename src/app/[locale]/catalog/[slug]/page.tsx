import { ContactSection } from "@/components/ContactSection";
import { DoorDetailView } from "@/components/DoorDetailView";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/dictionaries";
import {
  getAllModelSlugs,
  getModelBySlug,
  getModels,
  getRelatedModels,
} from "@/lib/catalog";
import { formatDoorPrice } from "@/lib/formatPrice";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo/jsonLd";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

/** Prerender every locale × product slug at build time. */
export const dynamic = "force-static";
/** Unknown slugs (e.g. newly added in admin) generate on first request; known ones are prerendered. */
export const dynamicParams = true;

export function generateStaticParams() {
  const slugs = getAllModelSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/catalog/[slug]">) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const model = getModelBySlug(slug, locale);
  if (!model) return {};
  const dict = getDictionary(locale);
  return createPageMetadata({
    locale,
    path: `/catalog/${slug}`,
    title: model.name,
    description: `${model.description} ${dict.catalog.priceFrom} ${formatDoorPrice(locale, model.priceSek, { perSqm: model.category === "flooring" })}.`,
    image: model.image,
  });
}

export default async function DoorPage({
  params,
}: PageProps<"/[locale]/catalog/[slug]">) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const model = getModelBySlug(slug, locale);
  if (!model) notFound();

  const dict = getDictionary(locale);
  const all = getModels(locale);
  const related = getRelatedModels(model, all, 4);

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(locale, model),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: dict.catalog.breadcrumb, path: "/catalog" },
            { name: model.name },
          ]),
        ]}
      />
      <section className="site-section site-section--tight-top">
        <DoorDetailView
          locale={locale}
          dict={dict}
          model={model}
          related={related}
          catalogModels={all}
        />
      </section>
      <ContactSection dict={dict} />
    </>
  );
}
