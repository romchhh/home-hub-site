import type { ContactInfo } from "@/lib/contactInfo";
import { getMapEmbedUrl, getMapsDirectionsUrl } from "@/lib/contactInfo";

export function ShowroomMap({
  title,
  directionsLabel,
  contact,
}: {
  title: string;
  directionsLabel: string;
  contact: ContactInfo;
}) {
  const embedUrl = getMapEmbedUrl(contact);
  const directionsUrl = getMapsDirectionsUrl(contact);

  return (
    <div className="showroom-map">
      <iframe
        title={title}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        className="showroom-map-link text-body-sm"
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {directionsLabel} — {contact.addressLine1}, {contact.addressLine2}
      </a>
    </div>
  );
}
