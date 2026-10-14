"use client";

import { Pill } from "./Pill";
import { useRequest } from "@/context/RequestContext";

export function OffersActions({ cta, className = "" }: { cta: string; className?: string }) {
  const { openRequest } = useRequest();
  return (
    <div className={`${className}`}>
      <Pill
        onClick={() => openRequest({ intent: "project", source: "Offers page" })}
      >
        {cta}
      </Pill>
    </div>
  );
}
