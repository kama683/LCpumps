"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 6000;
const FADE_DURATION_MS = 900;
const PARALLAX_STRENGTH = 0.18;
const PARALLAX_MAX_PX = 70;

function useParallaxOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY * PARALLAX_STRENGTH, PARALLAX_MAX_PX));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return offset;
}

interface HeroSliderProps {
  images: ReadonlyArray<{ src: string; alt: string }>;
  className?: string;
}

/** Fullscreen crossfading background slideshow with a dark readability overlay.
 * All slides stay mounted throughout (opacity-only transitions) so the cycle
 * never re-fetches or flashes an empty frame. A slight scroll-linked
 * parallax adds depth; it's capped and skipped under reduced-motion. */
export function HeroSlider({ images, className }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const parallaxOffset = useParallaxOffset();

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)} aria-hidden>
      {images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={i === 0}
          loading={i === 0 ? undefined : "eager"}
          sizes="100vw"
          className="object-cover object-center transition-opacity ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_DURATION_MS}ms`,
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.08)`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
