import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type LogoProps = {
  locale: Locale;
  className?: string;
};

const WORDMARK_WIDTH = 640;
const WORDMARK_HEIGHT = 223;

export function Logo({ locale, className = "" }: LogoProps) {
  return (
    <Link
      href={localePath(locale, "/")}
      className={`inline-block shrink-0 ${className}`}
      aria-label="HOME HUB"
    >
      <Image
        src="/logos/wordmark-dark.webp"
        alt=""
        width={WORDMARK_WIDTH}
        height={WORDMARK_HEIGHT}
        priority
        className="block h-9 w-auto max-w-none md:h-11"
        sizes="(min-width: 768px) 200px, 160px"
      />
    </Link>
  );
}
