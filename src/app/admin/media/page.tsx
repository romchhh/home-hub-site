import fs from "fs";
import path from "path";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import MediaManager from "@/components/admin/MediaManager";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  let initial: {
    filename: string;
    url: string;
    size: number;
    mtime: string;
  }[] = [];
  if (fs.existsSync(uploadDir)) {
    initial = fs
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
  }

  return (
    <div data-tour="tour-media-page">
      <PageBreadcrumb pageTitle="Media" />
      <MediaManager initial={initial} />
    </div>
  );
}
