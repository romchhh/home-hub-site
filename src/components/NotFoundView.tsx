import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

type NotFoundViewProps = {
  locale: Locale;
  code: string;
  title: string;
  lead: string;
  homeLabel: string;
  catalogLabel: string;
  contactLabel: string;
  /** Optional second-language home link (root 404 only). */
  altHome?: { locale: Locale; label: string };
};

export function NotFoundView({
  locale,
  code,
  title,
  lead,
  homeLabel,
  catalogLabel,
  contactLabel,
  altHome,
}: NotFoundViewProps) {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="not-found-panel">
        <Link
          href={localePath(locale, "/")}
          className="not-found-brand"
          aria-label="HOME HUB"
        >
          <Image
            src="/logos/wordmark-dark.webp"
            alt=""
            width={200}
            height={70}
            className="not-found-wordmark"
            priority
          />
        </Link>

        <p className="not-found-code">{code}</p>
        <h1 id="not-found-title" className="not-found-title">
          {title}
        </h1>
        <p className="not-found-lead">{lead}</p>

        <div className="not-found-actions">
          <Link
            href={localePath(locale, "/")}
            className="pill pill-solid border-0 no-underline"
          >
            <span>{homeLabel}</span>
          </Link>
          <Link
            href={localePath(locale, "/catalog")}
            className="pill pill-outline border no-underline"
          >
            <span>{catalogLabel}</span>
          </Link>
          <Link
            href={localePath(locale, "/contact")}
            className="pill pill-outline border no-underline"
          >
            <span>{contactLabel}</span>
          </Link>
        </div>

        {altHome ? (
          <p className="not-found-alt">
            <Link href={localePath(altHome.locale, "/")}>{altHome.label}</Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
