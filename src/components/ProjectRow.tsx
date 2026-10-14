"use client";

import Image from "next/image";
import { Pill } from "./Pill";
import { useRequest } from "@/context/RequestContext";

export function ProjectRow({
  even,
  image,
  title,
  text,
  note,
  cta,
  prefill,
}: {
  even: boolean;
  image: string;
  title: string;
  text: string;
  note: string;
  cta: string;
  prefill: string;
}) {
  const { openRequest } = useRequest();

  return (
    <article className="project-row">
      <div className={`project-img media-frame relative h-[21.25rem] md:h-[25.625rem] ${even ? "md:order-2" : ""}`}>
        <Image
          src={image.startsWith("/") ? image : `/images/${image}.png`}
          alt={title}
          fill
          className="object-cover object-[center_57%]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <p className="project-note">{note}</p>
        <Pill
          onClick={() =>
            openRequest({
              intent: "project",
              model: prefill,
              source: `Projects · ${title}`,
            })
          }
        >
          {cta}
        </Pill>
      </div>
    </article>
  );
}
