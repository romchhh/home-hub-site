import Image from "next/image";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`arrow-icon ${className}`.trim()} aria-hidden>
      <Image
        src="/images/arrow-up-right.svg"
        alt="Arrow"
        width={18}
        height={18}
        className="block"
      />
    </span>
  );
}
