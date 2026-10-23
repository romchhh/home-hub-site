"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { mediaFilenameAlt } from "@/lib/imageAlt";
import { mediaUrl } from "@/lib/mediaUrl";
import { uploadImages } from "@/lib/admin/uploadImages";

type LibraryFile = {
  filename: string;
  url: string;
  size: number;
  mtime: string;
};

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  mainImage?: string;
  onMainChange?: (image: string) => void;
  label?: string;
  hint?: string;
};

export default function ImageDropzone({
  images,
  onChange,
  mainImage,
  onMainChange,
  label = "Product images",
  hint = "Drag & drop to upload, pick from the media library, or reorder the gallery.",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [library, setLibrary] = useState<LibraryFile[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (!accepted.length) return;
      setUploading(true);
      setError("");
      setProgress(`Uploading 0 / ${accepted.length}…`);
      try {
        const uploadedNames: string[] = [];
        for (let i = 0; i < accepted.length; i++) {
          setProgress(`Uploading ${i + 1} / ${accepted.length}…`);
          const batch = await uploadImages([accepted[i]]);
          uploadedNames.push(...batch.map((f) => f.filename));
        }
        const next = [...images, ...uploadedNames];
        onChange(next);
        if ((!mainImage || !mainImage.trim()) && next[0] && onMainChange) {
          onMainChange(next[0]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
        setProgress("");
      }
    },
    [images, mainImage, onChange, onMainChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    disabled: uploading,
    noDragEventsBubbling: true,
  });

  useEffect(() => {
    if (!libraryOpen) return;
    let cancelled = false;
    void (async () => {
      try {
        const r = await fetch("/api/admin/uploads");
        const data = r.ok ? await r.json() : [];
        if (!cancelled) setLibrary(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setLibrary([]);
      } finally {
        if (!cancelled) setLibraryLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [libraryOpen]);

  function removeAt(index: number) {
    const removed = images[index];
    const next = images.filter((_, i) => i !== index);
    onChange(next);
    if (onMainChange && mainImage === removed) {
      onMainChange(next[0] || "");
    }
  }

  function setMain(filename: string) {
    onMainChange?.(filename);
    if (images[0] !== filename) {
      onChange([filename, ...images.filter((img) => img !== filename)]);
    }
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length || from === to) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  function addFromLibrary(filename: string) {
    if (images.includes(filename)) return;
    const next = [...images, filename];
    onChange(next);
    if ((!mainImage || !mainImage.trim()) && onMainChange) {
      onMainChange(filename);
    }
  }

  function onCardDragStart(index: number) {
    setDragIndex(index);
  }

  function onCardDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overIndex !== index) setOverIndex(index);
  }

  function onCardDrop(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.stopPropagation();
    if (dragIndex !== null && dragIndex !== index) {
      move(dragIndex, index);
    }
    setDragIndex(null);
    setOverIndex(null);
  }

  function onCardDragEnd() {
    setDragIndex(null);
    setOverIndex(null);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="mt-0.5 text-xs text-gray-500">{hint}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setLibraryLoading(true);
            setLibraryOpen(true);
          }}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          Choose from library
        </button>
      </div>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-5 py-10 text-center transition ${
          isDragActive
            ? "border-[#3c2412] bg-[#f5ebe0]/80"
            : "border-gray-300 bg-[#faf8f5] hover:border-[#3c2412]/50 hover:bg-[#f5ebe0]/40"
        } ${uploading ? "pointer-events-none opacity-70" : ""}`}
      >
        <input {...getInputProps()} />
        <p className="text-sm font-semibold text-gray-900">
          {uploading
            ? progress || "Uploading…"
            : isDragActive
              ? "Drop images to upload"
              : "Drag & drop images, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, WEBP · converted to WebP · max width 1600px
        </p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {images.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, index) => {
            const isMain = (mainImage || images[0]) === img;
            const isDragging = dragIndex === index;
            const isOver = overIndex === index && dragIndex !== index;
            return (
              <li
                key={`${img}-${index}`}
                draggable={!uploading}
                onDragStart={() => onCardDragStart(index)}
                onDragOver={(e) => onCardDragOver(e, index)}
                onDrop={(e) => onCardDrop(e, index)}
                onDragEnd={onCardDragEnd}
                className={`overflow-hidden rounded-xl border bg-white transition ${
                  isMain
                    ? "border-[#3c2412] ring-2 ring-[#3c2412]/20"
                    : "border-gray-200"
                } ${isDragging ? "opacity-50" : ""} ${
                  isOver ? "ring-2 ring-[#8b6340] ring-offset-2" : ""
                } ${!uploading ? "cursor-grab active:cursor-grabbing" : ""}`}
              >
                <div className="relative aspect-4/3 bg-gray-100">
                  <Image
                    src={mediaUrl(img)}
                    alt={mediaFilenameAlt(img, index)}
                    fill
                    className="pointer-events-none object-cover"
                    sizes="220px"
                    draggable={false}
                  />
                  <span className="absolute top-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white">
                    #{index + 1}
                  </span>
                  {isMain ? (
                    <span className="absolute top-2 left-2 rounded-full bg-[#3c2412] px-2 py-0.5 text-[10px] font-semibold tracking-wide !text-white uppercase">
                      Main
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2 p-2">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={index === 0 || uploading}
                      onClick={() => move(index, index - 1)}
                      className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Move left"
                      title="Move earlier"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      disabled={index === images.length - 1 || uploading}
                      onClick={() => move(index, index + 1)}
                      className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Move right"
                      title="Move later"
                    >
                      →
                    </button>
                  </div>
                  {!isMain && onMainChange ? (
                    <button
                      type="button"
                      onClick={() => setMain(img)}
                      className="flex-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Set main
                    </button>
                  ) : (
                    <span className="flex-1 px-2 py-1.5 text-xs text-gray-500">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className="rounded-lg border border-red-200 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}

      {libraryOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-library-title"
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h3
                  id="media-library-title"
                  className="text-base font-semibold text-gray-900"
                >
                  Media library
                </h3>
                <p className="text-xs text-gray-500">
                  Click an image to add it to this product
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto p-5">
              {libraryLoading ? (
                <p className="py-10 text-center text-sm text-gray-500">
                  Loading…
                </p>
              ) : library.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-500">
                  No uploads yet. Drop images above or use the Media page.
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {library.map((file) => {
                    const selected = images.includes(file.filename);
                    return (
                      <li key={file.filename}>
                        <button
                          type="button"
                          disabled={selected}
                          onClick={() => {
                            addFromLibrary(file.filename);
                            setLibraryOpen(false);
                          }}
                          className={`group w-full overflow-hidden rounded-xl border text-left transition ${
                            selected
                              ? "cursor-default border-[#3c2412] opacity-70"
                              : "border-gray-200 hover:border-[#3c2412]"
                          }`}
                        >
                          <div className="relative aspect-square bg-gray-100">
                            <Image
                              src={file.url}
                              alt={mediaFilenameAlt(file.filename)}
                              fill
                              className="object-cover"
                              sizes="160px"
                            />
                            {selected ? (
                              <span className="absolute inset-x-2 bottom-2 rounded-full bg-[#3c2412] px-2 py-0.5 text-center text-[10px] font-semibold !text-white">
                                Added
                              </span>
                            ) : null}
                          </div>
                          <p className="truncate px-2 py-1.5 text-[11px] text-gray-500">
                            {file.filename}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
