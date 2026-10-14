"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import type { DoorModel } from "@/data/models";
import { formatDoorPrice } from "@/lib/formatPrice";
import { useDoorGalleryScroll } from "@/hooks/useDoorGalleryScroll";
import { localePath, type Locale } from "@/lib/i18n";
import { mediaUrl } from "@/lib/mediaUrl";
import { Pill } from "./Pill";
import { DoorRequestPill } from "./DoorRequestPill";
import { PhotoGalleryModal } from "./PhotoGalleryModal";
import { ProductCard } from "./ProductCard";
import { SaveModelToggle } from "./SaveModelToggle";
import { SavedItemsSection } from "./SavedItemsSection";

type TabId = "description" | "specs" | "warranty" | "reviews";

export function DoorDetailView({
  locale,
  dict,
  model,
  related,
  catalogModels,
}: {
  locale: Locale;
  dict: Dictionary;
  model: DoorModel;
  related: DoorModel[];
  catalogModels: DoorModel[];
}) {
  const c = dict.catalog;
  const d = dict.doorPage;
  const savedLabels = d.savedItems;
  const [activeImage, setActiveImage] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [gallerySlug, setGallerySlug] = useState(model.slug);
  const [tab, setTab] = useState<TabId>("description");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const heroGalleryRef = useRef<HTMLDivElement>(null);
  const thumbTrackRef = useRef<HTMLDivElement>(null);

  if (model.slug !== gallerySlug) {
    setGallerySlug(model.slug);
    setActiveImage(0);
    setColorIndex(0);
  }

  const priceLabel = `${c.priceFrom} ${formatDoorPrice(locale, model.priceSek, {
    perSqm: model.category === "flooring",
  })}`;
  const gallery = model.gallery;

  useDoorGalleryScroll(heroGalleryRef, thumbTrackRef, activeImage, gallery.length, model.slug);

  function handleHeroScroll() {
    const el = heroGalleryRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== activeImage && index >= 0 && index < gallery.length) {
      setActiveImage(index);
    }
  }

  function openGalleryModal() {
    setGalleryOpen(true);
  }
  const activeColor = model.colors[colorIndex];

  const specRows = useMemo(
    () => [
      [c.material, model.material],
      [c.finish, model.finish],
      [c.hardware, model.hardware],
      [c.priceLabel, formatDoorPrice(locale, model.priceSek, { perSqm: model.category === "flooring" })],
      ...model.specs.map((s) => [s.label, s.value] as [string, string]),
    ],
    [c, model, locale],
  );

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: d.tabs.description },
    { id: "specs", label: d.tabs.specs },
    { id: "warranty", label: d.tabs.warranty },
    { id: "reviews", label: d.tabs.reviews },
  ];

  return (
    <div className="door-page">
      <nav className="door-breadcrumb text-label text-muted" aria-label="Breadcrumb">
        <Link href={localePath(locale, "/")}>{dict.nav.home}</Link>
        <span aria-hidden> / </span>
        <Link href={localePath(locale, "/catalog")}>{c.breadcrumb}</Link>
        <span aria-hidden> / </span>
        <span>{model.name}</span>
      </nav>

      <div className="door-hero">
        <div className="door-hero-media">
          <div
            ref={heroGalleryRef}
            className="door-hero-main door-hero-gallery"
            onScroll={handleHeroScroll}
          >
            {gallery.map((key, index) => (
              <div key={`${key}-${index}`} className="door-hero-slide">
                <Image
                  src={mediaUrl(key)}
                  alt={index === 0 ? model.name : ""}
                  fill
                  priority={index === 0}
                  className="door-hero-image"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  draggable={false}
                  style={{
                    filter: colorIndex === 0 ? undefined : `brightness(${0.92 + colorIndex * 0.04})`,
                  }}
                />
              </div>
            ))}
            {gallery.length > 1 ? (
              <span className="product-gallery-scroll-hint door-hero-scroll-hint" aria-hidden>
                ← →
              </span>
            ) : null}
            <button
              type="button"
              className="door-hero-gallery-open"
              aria-label={d.openGallery}
              onClick={openGalleryModal}
            >
              ⤢
            </button>
          </div>
          <div
            ref={thumbTrackRef}
            className="door-gallery-track"
            role="list"
            aria-label="Product images"
          >
            {gallery.map((key, index) => (
              <button
                key={`${key}-${index}`}
                type="button"
                className={`door-gallery-thumb ${index === activeImage ? "door-gallery-thumb--active" : ""}`}
                aria-label={`Image ${index + 1}`}
                aria-pressed={index === activeImage}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={mediaUrl(key)}
                  alt=""
                  width={120}
                  height={120}
                  className="door-gallery-thumb-img object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="door-hero-info">
          <span className="product-tag door-hero-tag">{model.label}</span>
          <h1 className="door-hero-title">{model.name}</h1>
          <p className="door-hero-price">{priceLabel}</p>
          <p className="door-hero-lead text-body-sm text-muted">{model.description}</p>

          <div className="door-color-picker">
            <p className="door-color-label">{d.colorLabel}</p>
            <div className="door-color-options" role="listbox" aria-label={d.colorLabel}>
              {model.colors.map((color, index) => (
                <button
                  key={color.hex}
                  type="button"
                  role="option"
                  aria-selected={index === colorIndex}
                  className={`door-color-option ${index === colorIndex ? "door-color-option--active" : ""}`}
                  onClick={() => setColorIndex(index)}
                >
                  <span className="door-color-swatch" style={{ background: color.hex }} aria-hidden />
                  <span className="door-color-name">{color.name}</span>
                </button>
              ))}
            </div>
            {activeColor ? (
              <p className="door-color-active text-caption text-muted">{activeColor.name}</p>
            ) : null}
          </div>

          <SaveModelToggle
            slug={model.slug}
            colorHex={activeColor?.hex}
            addLabel={savedLabels.add}
            removeLabel={savedLabels.remove}
            inListLabel={savedLabels.inList}
            className="door-save-model-toggle"
          />

          <div className="door-hero-actions">
            <DoorRequestPill
              label={d.orderCta}
              modelName={model.name}
              className="door-cta door-cta--primary"
            />
            <Pill
              outline
              href={localePath(locale, "/contact")}
              className="door-cta door-cta--secondary"
            >
              {d.contactManager}
            </Pill>
          </div>
          <p className="text-caption text-muted">{c.priceNote}</p>
        </div>
      </div>

      <section className="door-tabs-section" aria-label={d.tabs.description}>
        <div className="door-tabs" role="tablist">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`door-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls={`door-panel-${item.id}`}
              className={`door-tab ${tab === item.id ? "door-tab--active" : ""}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="door-tab-panels">
          {tab === "description" ? (
            <div
              role="tabpanel"
              id="door-panel-description"
              aria-labelledby="door-tab-description"
              className="door-tab-panel"
            >
              <p className="door-detail-intro">{model.detailIntro}</p>
              <h2 className="door-detail-subtitle">{d.advantagesTitle}</h2>
              <ul className="door-detail-list">
                {model.detailBullets.map((bullet) => (
                  <li key={bullet.title}>
                    <strong>{bullet.title}</strong>
                    <span> — {bullet.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === "specs" ? (
            <div
              role="tabpanel"
              id="door-panel-specs"
              aria-labelledby="door-tab-specs"
              className="door-tab-panel"
            >
              <dl className="door-spec-table">
                {specRows.map(([label, value]) => (
                  <div key={label} className="door-spec-row">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {tab === "warranty" ? (
            <div
              role="tabpanel"
              id="door-panel-warranty"
              aria-labelledby="door-tab-warranty"
              className="door-tab-panel"
            >
              <h2 className="door-detail-subtitle">{d.warrantyTitle}</h2>
              <p className="text-body-sm text-muted">{d.warrantyText}</p>
              <ul className="door-detail-list door-detail-list--compact">
                {d.warrantyBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === "reviews" ? (
            <div
              role="tabpanel"
              id="door-panel-reviews"
              aria-labelledby="door-tab-reviews"
              className="door-tab-panel"
            >
              <p className="text-body-sm text-muted">{d.reviewsEmpty}</p>
            </div>
          ) : null}
        </div>
      </section>

      <SavedItemsSection
        locale={locale}
        dict={dict}
        catalogModels={catalogModels}
        currentSlug={model.slug}
      />

      {related.length > 0 ? (
        <section className="door-related site-section--tight-top">
          <div className="section-heading">
            <div>
              <h2 className="type-section-title">{d.relatedTitle}</h2>
              <p className="mt-2 text-body-sm text-muted">{d.relatedSubtitle}</p>
            </div>
          </div>
          <div className="door-related-grid catalog-products">
            {related.map((item) => (
              <ProductCard
                key={item.slug}
                locale={locale}
                model={item}
                priceFromLabel={c.priceFrom}
                detailsLabel={c.details}
                closeLabel={dict.nav.close}
                allowSave
                saveLabels={{
                  add: savedLabels.addShort,
                  remove: savedLabels.removeItem,
                  inList: savedLabels.inList,
                }}
              />
            ))}
          </div>
        </section>
      ) : null}
      <PhotoGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={model.name}
        images={gallery}
        initialIndex={activeImage}
        closeLabel={dict.nav.close}
      />

      <div className="door-mobile-order-bar" aria-label={d.orderCta}>
        <p className="door-mobile-order-bar__meta">
          <span className="door-mobile-order-bar__name">{model.name}</span>
          <span className="door-mobile-order-bar__price">{priceLabel}</span>
        </p>
        <DoorRequestPill
          label={d.orderCta}
          modelName={model.name}
          className="door-cta door-cta--primary door-cta--sticky"
        />
      </div>
    </div>
  );
}
