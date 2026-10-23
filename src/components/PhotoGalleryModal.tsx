"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { mediaUrl } from "@/lib/mediaUrl";

export function PhotoGalleryModal({
  open,
  onClose,
  title,
  images,
  initialIndex = 0,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  initialIndex?: number;
  closeLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open || !trackRef.current) return;
    const track = trackRef.current;
    const slide = track.querySelector<HTMLElement>("[data-gallery-slide]");
    const width = slide?.offsetWidth ?? track.clientWidth;
    track.scrollLeft = width * initialIndex;
  }, [open, initialIndex, images]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="photo-gallery-modal" role="dialog" aria-modal aria-label={title}>
      <button type="button" className="photo-gallery-modal-overlay" aria-label={closeLabel} onClick={onClose} />
      <button
        type="button"
        className="photo-gallery-modal-close"
        aria-label={closeLabel}
        onClick={onClose}
      >
        ×
      </button>
      <div ref={trackRef} className="photo-gallery-modal-track">
        {images.map((key, index) => (
          <figure key={key} data-gallery-slide className="photo-gallery-modal-slide">
            <Image
              src={mediaUrl(key)}
              alt={`${title} — ${index + 1}${images.length > 1 ? ` / ${images.length}` : ""}`}
              fill
              className="photo-gallery-modal-image"
              sizes="100vw"
              priority={key === images[initialIndex]}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
