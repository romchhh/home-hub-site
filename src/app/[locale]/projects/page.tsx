import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { ProjectRow } from "@/components/ProjectRow";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { generateLocalePageMetadata } from "@/lib/seo/generatePageMetadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonLd";
import { getSeoForPage } from "@/lib/seo/pageMeta";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  return generateLocalePageMetadata(locale, "projects");
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const p = dict.projects;
  const seo = getSeoForPage(locale, "projects");

  const rows = [
    { image: "/images/floors/chevron/01.jpg", title: p.p1Title, text: p.p1Text, value: p.p1Title },
    { image: "/images/doors/aurelia-01/01.jpg", title: p.p2Title, text: p.p2Text, value: p.p2Title },
    { image: "/images/floors/fiskben/01.jpg", title: p.p3Title, text: p.p3Text, value: p.p3Title },
  ] as const;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd(locale, {
            path: "/projects",
            name: seo.title,
            description: seo.description,
          }),
          breadcrumbJsonLd(locale, [
            { name: dict.nav.home, path: "" },
            { name: p.breadcrumb, path: "/projects" },
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
      <section className="project-list site-section site-section--tight-top">
        {rows.map((row, i) => (
          <ProjectRow
            key={row.title}
            even={i % 2 === 1}
            image={row.image}
            title={row.title}
            text={row.text}
            note={p.projectNote}
            cta={dict.nav.contactCta}
            prefill={row.value}
          />
        ))}
      </section>
      <ContactSection dict={dict} />
    </>
  );
}
