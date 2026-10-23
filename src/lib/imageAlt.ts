/** Shared alt text for brand assets (wordmark / icon). */
export const LOGO_ALT = "HOME HUB";

export function galleryImageAlt(productName: string, index: number, total?: number): string {
  const n = index + 1;
  if (total != null && total > 1) {
    return `${productName} — bild ${n} av ${total}`;
  }
  return `${productName} — bild ${n}`;
}

export function galleryImageAltEn(productName: string, index: number, total?: number): string {
  const n = index + 1;
  if (total != null && total > 1) {
    return `${productName} — image ${n} of ${total}`;
  }
  return `${productName} — image ${n}`;
}

export function pickGalleryAlt(
  locale: string,
  productName: string,
  index: number,
  total?: number,
): string {
  return locale === "en"
    ? galleryImageAltEn(productName, index, total)
    : galleryImageAlt(productName, index, total);
}

/** Alt from stored media path or filename. */
export function mediaFilenameAlt(pathOrName: string, index?: number): string {
  const base = pathOrName.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "image";
  const label = base.replace(/[-_]+/g, " ");
  if (index != null) return `Media: ${label} (${index + 1})`;
  return `Media: ${label}`;
}
