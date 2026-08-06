"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";
import {
  CATEGORY_PANEL_HERO_IMAGES,
  getCategoryPanelHeroAlt,
  getProductImageSrc,
} from "@/lib/product-images";

interface CategoryHeroImageProps {
  panelId: string;
  fallbackProductSlug?: string;
}

const SLIDE_INTERVAL_MS = 3000;
const FADE_DURATION_MS = 700;

export function CategoryHeroImage({
  panelId,
  fallbackProductSlug,
}: CategoryHeroImageProps) {
  const images = CATEGORY_PANEL_HERO_IMAGES[panelId];
  const alt = getCategoryPanelHeroAlt(panelId);

  const fallbackSrc = fallbackProductSlug
    ? getProductImageSrc({ slug: fallbackProductSlug })
    : ASSETS.pump.src;

  return (
    // Keyed on panelId so switching categories remounts this (restarting any
    // slideshow at slide 1) and, via @starting-style, fades the new photo in
    // instead of hard-cutting the background when a filter tab is clicked.
    <div
      key={panelId}
      className="starting:opacity-0 absolute inset-0 opacity-100 transition-opacity duration-350 ease-(--ease-entrance)"
    >
      {!images || images.length === 0 ? (
        <Image
          src={fallbackSrc}
          alt={alt}
          fill
          sizes="100vw"
          className="object-center object-cover"
          priority
        />
      ) : (
        <CategoryHeroSlideshow images={images} alt={alt} />
      )}
    </div>
  );
}

function CategoryHeroSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          loading={i === 0 ? undefined : "eager"}
          sizes="100vw"
          className="object-center object-cover transition-opacity ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_DURATION_MS}ms`,
          }}
        />
      ))}
    </>
  );
}
