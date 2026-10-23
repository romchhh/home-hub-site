import type { ReactNode } from "react";
import { Em } from "./Em";

/** Section/page title — keeps a word space for screen readers and single-line wraps. */
export function SplitTitle({
  title,
  titleEm,
  as: Tag = "h1",
}: {
  title: ReactNode;
  titleEm?: string;
  as?: "h1" | "h2";
}) {
  if (!titleEm) {
    return <Tag>{title}</Tag>;
  }
  return (
    <Tag>
      {title}
      <span className="sr-only"> </span>
      <br aria-hidden="true" />
      <Em>{titleEm}</Em>
    </Tag>
  );
}
