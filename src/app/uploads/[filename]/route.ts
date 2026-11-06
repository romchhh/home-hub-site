import { readFile, stat } from "fs/promises";
import path from "path";
import {
  safeUploadFilename,
  uploadContentType,
  uploadDir,
} from "@/lib/uploadStorage";

export const runtime = "nodejs";
// Public files are snapshotted when `next start` boots. Uploads written after
// that are missing from the snapshot and would 404. Read the file on demand.
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ filename: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  const { filename: raw } = await params;
  const filename = safeUploadFilename(raw);
  const contentType = filename ? uploadContentType(filename) : null;
  if (!filename || !contentType) {
    return new Response("Not Found", { status: 404 });
  }

  const filePath = path.join(uploadDir, filename);
  try {
    const info = await stat(filePath);
    if (!info.isFile()) {
      return new Response("Not Found", { status: 404 });
    }
    const body = await readFile(filePath);
    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(info.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
