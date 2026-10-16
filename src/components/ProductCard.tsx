"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import type { DoorModel } from "@/data/models";
import { formatDoorPrice } from "@/lib/formatPrice";
import { localePath, type Locale } from "@/lib/i18n";
import { mediaUrl } from "@/lib/mediaUrl";
import { ArrowIcon } from "./ArrowIcon";
import { SaveModelToggle } from "./SaveModelToggle";

export function ProductCard({
  locale,
  model,
  priceFromLabel,
  detailsLabel,
  allowSave = false,
  saveLabels,
}: {
  locale: Locale;
  model: DoorModel;
  priceFromLabel: string;
  detailsLabel: string;
  closeLabel?: string;
  allowSave?: boolean;
  saveLabels?: { add: string; remove: string; inList: string };
}) {
  const href = localePath(locale, `/catalog/${model.slug}`);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const galleryRef = useRef<HTMLAnchorElement>(null);
  const hasCarousel = model.gallery.length > 1;

  const scrollGallery = useCallback((dir: -1 | 1) => {
    const el = galleryRef.current;
    if (!el) return;
    const width = el.clientWidth || 1;
    const current = Math.round(el.scrollLeft / width);
    const next = Math.max(0, Math.min(model.gallery.length - 1, current + dir));
    el.scrollTo({ left: next * width, behavior: "smooth" });
  }, [model.gallery.length]);

  return (
    <article className="product product-card">
      <div className="product-card-media">
        <Link
          ref={galleryRef}
          href={href}
          className="product-card-gallery"
          aria-label={`${model.name} — ${detailsLabel}`}
          onPointerDown={(e) => {
            pointerStart.current = { x: e.clientX, y: e.clientY };
          }}
          onClick={(e) => {
            const start = pointerStart.current;
            if (start) {
              const dx = Math.abs(e.clientX - start.x);
              const dy = Math.abs(e.clientY - start.y);
              if (dx > 10 || dy > 10) {
                e.preventDefault();
              }
            }
          }}
        >
          {model.gallery.map((key, index) => (
            <div key={`${model.slug}-${key}-${index}`} className="product-card-slide">
              <Image
                src={mediaUrl(key)}
                alt={index === 0 ? `${model.name} — ${model.material}` : ""}
                fill
                className="product-card-image"
                sizes="(max-width: 768px) 46vw, 22vw"
                draggable={false}
              />
            </div>
          ))}
          <span className="product-tag">{model.label}</span>
        </Link>
        {hasCarousel ? (
          <div className="product-gallery-nav">
            <button
              type="button"
              className="product-gallery-nav-btn product-gallery-nav-btn--prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollGallery(-1);
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="product-gallery-nav-btn product-gallery-nav-btn--next"
              aria-label="Next image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollGallery(1);
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : null}
        {allowSave && saveLabels ? (
          <SaveModelToggle
            slug={model.slug}
            addLabel={saveLabels.add}
            removeLabel={saveLabels.remove}
            inListLabel={saveLabels.inList}
            compact
            className="product-card-save"
          />
        ) : null}
      </div>
      <Link href={href} className="product-meta product-card-link">
        <div className="top flex items-center justify-between gap-1">
          <h3 className="product-title">{model.name}</h3>
          <ArrowIcon />
        </div>
        <p className="product-price">
          {priceFromLabel}{" "}
          {formatDoorPrice(locale, model.priceSek, { perSqm: model.category === "flooring" })}
        </p>
        <p className="mt-1.5 text-caption text-muted md:mt-2">
          {model.material} · {model.finish}
        </p>
        <div className="swatch-row">
          {model.colors.map((color) => (
            <i
              key={color.hex}
              className="color-swatch"
              style={{ background: color.hex }}
              title={color.name}
              aria-hidden
            />
          ))}
          <span className="product-details-link">{detailsLabel}</span>
        </div>
      </Link>
    </article>
  );
}
