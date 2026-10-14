"use client";

import { usePathname } from "next/navigation";
import type { Dictionary } from "@/dictionaries";
import { useRequest } from "@/context/RequestContext";
import { Em } from "./Em";
import { Pill } from "./Pill";

function contactSourceFromPath(pathname: string): string {
  const path = pathname.replace(/^\/(sv|en)/, "") || "/";
  if (path === "/" || path === "") return "Home · Contact section";
  if (path.startsWith("/catalog/saved")) return "Saved · Contact section";
  if (path.startsWith("/catalog/")) return "Catalog product · Contact section";
  if (path.startsWith("/catalog")) return "Catalog · Contact section";
  if (path.startsWith("/about")) return "About · Contact section";
  if (path.startsWith("/offers")) return "Offers · Contact section";
  if (path.startsWith("/projects")) return "Projects · Contact section";
  if (path.startsWith("/services")) return "Services · Contact section";
  if (path.startsWith("/contact")) return "Contact page · Contact section";
  if (path.startsWith("/partnerships")) return "Partnerships · Contact section";
  return `Page ${path} · Contact section`;
}

export function ContactSection({ dict }: { dict: Dictionary }) {
  const c = dict.contactSection;
  const { openRequest } = useRequest();
  const pathname = usePathname();

  return (
    <section className="site-section--flush" aria-label={c.title}>
      <div className="contact">
        <div className="contact-copy">
          <h2>
            {c.title}
            <br />
            <Em>{c.titleEm}</Em>
          </h2>
          <p>{c.text}</p>
        </div>
        <Pill
          light
          className="contact-cta shrink-0"
          onClick={() =>
            openRequest({
              intent: "project",
              source: contactSourceFromPath(pathname),
            })
          }
        >
          {c.cta}
        </Pill>
      </div>
    </section>
  );
}
