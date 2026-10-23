import Image from "next/image";
import { SplitTitle } from "./SplitTitle";

const introDoors = [
  { src: "/images/doors/aurelia-01/01.jpg", alt: "Aurelia 01" },
  { src: "/images/doors/vetro-01/01.jpg", alt: "Ventro 01 innerdörr" },
  { src: "/images/doors/loft-m18/01.jpg", alt: "Loft M18" },

] as const;

export function HomeIntroBlock({
  title,
  titleEm,
  text,
}: {
  title: string;
  titleEm: string;
  text: string;
}) {
  return (
    <section className="intro-block site-section">
      <div className="intro-block-copy">
        <SplitTitle as="h2" title={title} titleEm={titleEm} />
        <p>{text}</p>
      </div>
      <div className="intro-gallery">
        {introDoors.map((door) => (
          <figure key={door.src} className="intro-gallery-figure">
            <Image
              src={door.src}
              alt={door.alt}
              width={960}
              height={1280}
              className="intro-gallery-photo"
              sizes="(max-width: 768px) 42vw, 28vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
