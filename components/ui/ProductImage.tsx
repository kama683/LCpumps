"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { useImageLoaded } from "@/hooks/useImageLoaded";
import { useAutoFrameScale } from "@/hooks/useAutoFrameScale";

interface ProductImageProps {
  alt: string;
  src?: string;
  className?: string;
  aspectRatio?: string;
  sizes?: string;
  imagePadding?: string;
  /** Subtle cursor-tracking 3D tilt — opt-in, meant for a single large hero
   * shot (e.g. the product detail page), not the small catalog grid cards. */
  tilt?: boolean;
  /** Evens out catalog photos that have a lot of built-in whitespace around
   * a small product — see hooks/useAutoFrameScale.ts. Opt-in since it's only
   * worth the analysis pass for grids where the inconsistency is visible. */
  autoFrame?: boolean;
}

const TILT_MAX_DEG = 8;
const TILT_RESET = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

export function ProductImage({
  alt,
  src,
  className,
  aspectRatio = "4/3",
  sizes = "(max-width: 900px) 100vw, 33vw",
  imagePadding = "p-4",
  tilt = false,
  autoFrame = false,
}: ProductImageProps) {
  const imageSrc = src ?? ASSETS.pump.src;
  const { imgRef, loaded, onLoad } = useImageLoaded();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tiltTransform, setTiltTransform] = useState(TILT_RESET);
  const frameScale = useAutoFrameScale(imgRef, autoFrame, aspectRatio);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt || reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * TILT_MAX_DEG * 2;
    const rotateX = (0.5 - py) * TILT_MAX_DEG * 2;
    setTiltTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? () => setTiltTransform(TILT_RESET) : undefined}
      className={cn("relative bg-white overflow-hidden", className)}
      style={{ aspectRatio, transformStyle: tilt ? "preserve-3d" : undefined }}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-surface transition-opacity duration-300",
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        )}
      />
      <Image
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        fill
        sizes={sizes}
        onLoad={onLoad}
        className={cn(
          "object-contain ease-out transition-[opacity,transform]",
          autoFrame
            ? "scale-[calc(var(--auto-scale,1))] group-hover:scale-[calc(var(--auto-scale,1)*1.05)]"
            : "group-hover:scale-105",
          tilt ? "duration-200" : "duration-400",
          imagePadding,
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{
          ...(tilt ? { transform: tiltTransform } : undefined),
          ...(autoFrame ? { "--auto-scale": frameScale } as React.CSSProperties : undefined),
        }}
      />
    </div>
  );
}
