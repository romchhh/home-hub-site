"use client";

import type { Dictionary } from "@/dictionaries";
import { DetailBand } from "./DetailBand";
import { useRequest } from "@/context/RequestContext";

export function HomeDetailBand({ dict }: { dict: Dictionary }) {
  const h = dict.home;
  const { openRequest } = useRequest();

  return (
    <div className="site-section--band">
      <DetailBand
        imageSrc="/images/handle.png"
        title={h.detailTitle}
        titleEm={h.detailTitleEm}
        ctaLabel={h.detailCta}
        onCta={() =>
          openRequest({
            intent: "project",
            model: dict.catalog.hardware,
            source: "Home · Hardware band",
          })
        }
      >
        <p>{h.detailText}</p>
      </DetailBand>
    </div>
  );
}
