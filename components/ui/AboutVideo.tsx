"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function AboutVideo({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src="/assets/VIDEO.mp4"
        autoPlay
        controls
        loop
        playsInline
        className={cn("absolute inset-0 size-full object-cover", className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Воспроизвести видео"
      className={cn(
        "group/play absolute inset-0 size-full cursor-pointer",
        className
      )}
    >
      <Image
        src={ASSETS.aboutPhoto.src}
        alt={ASSETS.aboutPhoto.alt}
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover/play:bg-black/25" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center size-16 rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover/play:scale-110">
        <Play className="size-6 text-primary ml-1" fill="currentColor" strokeWidth={0} />
      </span>
    </button>
  );
}
