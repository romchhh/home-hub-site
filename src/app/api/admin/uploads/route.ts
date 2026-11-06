import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { randomBytes } from "crypto";
import { uploadDir } from "@/lib/uploadStorage";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json([]);
  }
  const files = fs
    .readdirSync(uploadDir)
    .filter((f) => !f.startsWith("."))
    .map((filename) => {
      const stat = fs.statSync(path.join(uploadDir, filename));
      return {
        filename,
        url: `/uploads/${filename}`,
        size: stat.size,
        mtime: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => b.mtime.localeCompare(a.mtime));
  return NextResponse.json(files);
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return NextResponse.json(
        {
          error:
            "Could not read upload body. Try fewer/smaller files, or restart the dev server after the body-size config change.",
        },
        { status: 413 },
      );
    }

    const files = form
      .getAll("files")
      .filter((f): f is File => typeof File !== "undefined" && f instanceof File);
    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const saved: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (buffer.byteLength === 0) {
        return NextResponse.json(
          { error: `Empty file: ${file.name || "unknown"}` },
          { status: 400 },
        );
      }
      const base = randomBytes(8).toString("hex");
      const filename = `${base}.webp`;
      const out = path.join(uploadDir, filename);
      await sharp(buffer)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out);
      saved.push(filename);
    }

    return NextResponse.json({
      files: saved.map((filename) => ({
        filename,
        url: `/uploads/${filename}`,
        key: filename.replace(/\.webp$/, ""),
      })),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }
  const filePath = path.join(uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  return NextResponse.json({ success: true });
}
