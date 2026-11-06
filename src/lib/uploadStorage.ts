import path from "path";

/** Same directory the admin upload API writes into. */
export const uploadDir = path.join(process.cwd(), "public", "uploads");

const SAFE_FILENAME = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,180}$/;

const CONTENT_TYPES: Record<string, string> = {
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  avif: "image/avif",
};

/** Reject path traversal and non-image names. Returns the basename or null. */
export function safeUploadFilename(filename: string): string | null {
  let name = filename;
  try {
    name = decodeURIComponent(filename);
  } catch {
    return null;
  }
  if (!SAFE_FILENAME.test(name)) return null;
  return name;
}

export function uploadContentType(filename: string): string | null {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? null;
}
