import Image from "next/image";
import Link from "next/link";
import { LOGO_ALT } from "@/lib/imageAlt";

type AdminLogoProps = {
  /** Show wordmark when sidebar/header has room */
  showWordmark?: boolean;
  className?: string;
};

export default function AdminLogo({
  showWordmark = true,
  className = "",
}: AdminLogoProps) {
  return (
    <Link
      href="/admin"
      className={`admin-logo inline-flex items-center gap-2.5 ${className}`}
      aria-label="HOME HUB Admin"
    >
      <Image
        src="/icon.png"
        alt={LOGO_ALT}
        width={36}
        height={36}
        className="admin-logo-mark h-9 w-9 shrink-0 rounded-lg object-contain"
        priority
      />
      {showWordmark ? (
        <Image
          src="/logos/wordmark-dark.webp"
          alt="HOME HUB"
          width={140}
          height={48}
          className="admin-logo-wordmark h-7 w-auto"
          priority
        />
      ) : null}
    </Link>
  );
}
