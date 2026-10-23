"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { SplitTitle } from "./SplitTitle";
import { Pill } from "./Pill";

type DetailBandProps = {
  imageSrc: string;
  title: string;
  titleEm?: string;
  children: ReactNode;
  ctaLabel: string;
  onCta: () => void;
};

export function DetailBand({
  imageSrc,
  title,
  titleEm,
  children,
  ctaLabel,
  onCta,
}: DetailBandProps) {
  return (
    <section className="detail-band">
      <div className="detail-band-media relative">
        <Image
          src={imageSrc}
          alt={
            typeof title === "string"
              ? [title, titleEm].filter(Boolean).join(" ")
              : "Product detail"
          }
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="detail-band-copy">
        <SplitTitle as="h2" title={title} titleEm={titleEm} />
        <div className="detail-band-body">{children}</div>
        <Pill light onClick={onCta}>
          {ctaLabel}
        </Pill>
      </div>
    </section>
  );
}
