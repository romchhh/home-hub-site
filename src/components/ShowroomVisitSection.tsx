import type { Dictionary } from "@/dictionaries";
import type { ContactInfo } from "@/lib/contactInfo";
import type { Locale } from "@/lib/i18n";
import { ContactInfoPanel } from "./ContactInfoPanel";
import { ShowroomMap } from "./ShowroomMap";

export function ShowroomVisitSection({
  locale,
  dict,
  contact,
  title,
  lead,
  showMap = true,
}: {
  locale: Locale;
  dict: Dictionary;
  contact: ContactInfo;
  title: string;
  lead?: string;
  showMap?: boolean;
}) {
  const s = dict.showroom;

  return (
    <section className="showroom-visit site-section site-section--tight-top" aria-labelledby="showroom-visit-title">
      <div className="showroom-visit-head">
        <h2 id="showroom-visit-title" className="type-section-title">
          {title}
        </h2>
        {lead ? <p className="showroom-visit-lead text-body-sm text-muted">{lead}</p> : null}
      </div>
      <div className={`showroom-visit-grid ${showMap ? "showroom-visit-grid--with-map" : ""}`}>
        <ContactInfoPanel locale={locale} labels={s} contact={contact} />
        {showMap ? (
          <ShowroomMap
            title={s.mapTitle}
            directionsLabel={s.mapDirections}
            contact={contact}
          />
        ) : null}
      </div>
    </section>
  );
}
