import { ContactSection } from "@/components/ContactSection";
import { PageHead } from "@/components/PageHead";
import { SavedItemsPanel } from "@/components/SavedItemsPanel";
import { getDictionary } from "@/dictionaries";
import { getModels } from "@/lib/catalog";
import { localePath, isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/catalog/saved">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "catalogSaved");
}

export default async function SavedCatalogPage({ params }: PageProps<"/[locale]/catalog/saved">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const c = dict.catalog;
  const sp = dict.savedPage;
  const models = getModels(locale);

  return (
    <>
      <PageHead
        locale={locale}
        homeLabel={dict.nav.home}
        breadcrumb={sp.breadcrumb}
        breadcrumbTrail={[{ label: c.breadcrumb, href: localePath(locale, "/catalog") }]}
        title={sp.title}
        titleEm={sp.titleEm}
        lead={sp.lead}
      />
      <section className="site-section site-section--tight-top">
        <SavedItemsPanel locale={locale} dict={dict} catalogModels={models} variant="page" />
      </section>
      <ContactSection dict={dict} />
    </>
  );
}
