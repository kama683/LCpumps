"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { useImageLoaded } from "@/hooks/useImageLoaded";

interface ProjectImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function ProjectImage({
  src,
  alt,
  className,
  aspectRatio = "16/10",
}: ProjectImageProps) {
  const hasPhoto = Boolean(src);
  const { imgRef, loaded, onLoad } = useImageLoaded();

  return (
    <div
      className={cn("relative bg-surface overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      {hasPhoto ? (
        <>
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-surface transition-opacity duration-300",
              loaded ? "opacity-0" : "opacity-100 animate-pulse"
            )}
          />
          <Image
            ref={imgRef}
            src={src!}
            alt={alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            onLoad={onLoad}
            className={cn(
              "object-cover transition-[opacity,transform] duration-400 ease-out group-hover:scale-105",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
        </>
      ) : (
        <Image
          src={ASSETS.pump.src}
          alt={alt}
          width={ASSETS.pump.width}
          height={ASSETS.pump.height}
          sizes="(max-width: 900px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-contain p-3"
        />
      )}
    </div>
  );
}
