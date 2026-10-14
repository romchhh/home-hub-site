"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImages } from "@/lib/admin/uploadImages";

type MediaFile = {
  filename: string;
  url: string;
  size: number;
  mtime: string;
};

export default function MediaManager({ initial }: { initial: MediaFile[] }) {
  const [files, setFiles] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const refresh = useCallback(async () => {
    const list = await fetch("/api/admin/uploads").then((r) => r.json());
    setFiles(Array.isArray(list) ? list : []);
  }, []);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (!accepted.length) return;
      setUploading(true);
      setError("");
      try {
        for (let i = 0; i < accepted.length; i++) {
          setProgress(`Uploading ${i + 1} / ${accepted.length}…`);
          await uploadImages([accepted[i]]);
        }
        await refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
        await refresh();
      } finally {
        setUploading(false);
        setProgress("");
      }
    },
    [refresh],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    disabled: uploading,
  });

  async function remove(filename: string) {
    if (!confirm(`Delete ${filename}?`)) return;
    const res = await fetch(
      `/api/admin/uploads?filename=${encodeURIComponent(filename)}`,
      { method: "DELETE" },
    );
    if (!res.ok) {
      alert("Failed to delete");
      return;
    }
    setFiles((prev) => prev.filter((f) => f.filename !== filename));
  }

  async function copyName(filename: string) {
    await navigator.clipboard.writeText(filename);
    setCopied(filename);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-14 text-center transition ${
          isDragActive
            ? "border-[#3c2412] bg-[#f5ebe0]"
            : "border-gray-300 bg-[#faf8f5] hover:border-[#3c2412]/45 hover:bg-[#f5ebe0]/50"
        } ${uploading ? "pointer-events-none opacity-70" : ""}`}
      >
        <input {...getInputProps()} />
        <p className="text-base font-semibold text-gray-900">
          {uploading
            ? progress || "Uploading…"
            : isDragActive
              ? "Drop files to upload"
              : "Drag & drop files here, or click to browse"}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Images are converted to WebP (max width 1600px)
        </p>
      </div>
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {files.map((file) => (
          <div
            key={file.filename}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="relative aspect-4/3 bg-gray-100">
              <Image
                src={file.url}
                alt={file.filename}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <div className="space-y-2 p-3">
              <p className="truncate text-xs font-medium text-gray-700">
                {file.filename}
              </p>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => copyName(file.filename)}
                  className="admin-btn admin-btn-secondary admin-btn-sm flex-1"
                >
                  {copied === file.filename ? "Copied" : "Copy name"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(file.filename)}
                  className="admin-btn admin-btn-danger admin-btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {files.length === 0 ? (
        <p className="text-center text-sm text-gray-600">
          No uploads yet. Drop files above to get started.
        </p>
      ) : null}
    </div>
  );
}
