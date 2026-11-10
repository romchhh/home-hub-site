type LegalSection = {
  title: string;
  paragraphs: string[];
};

export function LegalDocument({
  intro,
  sections,
}: {
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="site-section site-section--tight-top">
      <div className="legal-doc">
        <p className="legal-doc-intro">{intro}</p>
        {sections.map((section) => (
          <section key={section.title} className="legal-doc-section">
            <h2 className="legal-doc-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}
