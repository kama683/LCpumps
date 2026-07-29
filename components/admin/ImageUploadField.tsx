"use client";

import { useRef, useState } from "react";
import { AlertCircle, ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_DIMENSION = 1200;

/** Downscales the image via canvas before upload — smaller payload, same
 * UX as before, but now persisted as a real file (via the storage
 * abstraction) instead of a data-URL string. */
function downscaleImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Image failed to load"));
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const scale = MAX_DIMENSION / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas is not supported"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Failed to encode image"))),
          "image/jpeg",
          0.85
        );
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function ImageUploadField({
  value,
  onChange,
  slug,
}: {
  value?: string | null;
  onChange: (url: string) => void;
  slug: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const blob = await downscaleImage(file);
      const body = new FormData();
      body.set("file", blob, "image.jpg");
      body.set("slug", slug);

      const res = await fetch("/api/admin/products/image", { method: "POST", body });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Не удалось загрузить изображение.");
      }
      const { url } = (await res.json()) as { url: string };
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить изображение.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed border-border-mid bg-surface p-4 text-center transition-colors",
        dragOver && "border-primary bg-[#fbeeef]"
      )}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
    >
      {value ? (
        <div className="relative mx-auto mb-3 aspect-4/3 w-full max-w-60 overflow-hidden rounded-lg border border-border-mid bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin-uploaded image, not a static/remote source next/image can optimize */}
          <img src={value} alt="" className="size-full object-contain" />
        </div>
      ) : (
        <ImagePlus className="mx-auto mb-2 size-8 text-subtle" strokeWidth={1.5} aria-hidden />
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="mt-1 inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent text-sm font-semibold text-primary hover:text-primary-dark disabled:cursor-default disabled:opacity-60"
      >
        {loading && <Loader2 className="size-3.5 animate-spin" strokeWidth={2.25} aria-hidden />}
        {value ? "Заменить изображение" : "Загрузить изображение"}
      </button>

      {error && (
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-error">
          <AlertCircle className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
