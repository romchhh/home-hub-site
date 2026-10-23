"use client";

import type { Dictionary } from "@/dictionaries";
import { Pill } from "./Pill";
import { useRequest } from "@/context/RequestContext";

export function PartnershipCta({ dict }: { dict: Dictionary }) {
  const p = dict.partnerships;
  const { openRequest } = useRequest();

  return (
    <Pill
      onClick={() =>
        openRequest({
          intent: "project",
          model: p.breadcrumb,
          source: "Partnerships page",
        })
      }
    >
      {dict.nav.contactCta}
    </Pill>
  );
}
