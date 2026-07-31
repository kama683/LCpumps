"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";
import {
  CATEGORY_PANEL_HERO_IMAGES,
  getCategoryPanelHeroAlt,
  getProductImageSrc,
} from "@/lib/product-images";
import { cn } from "@/lib/utils";

interface CategoryHeroImageProps {
  panelId: string;
  fallbackProductSlug?: string;
}

// TEMPORARY: every category panel shows this one corporate placeholder photo
// until dedicated per-category banners are ready. To restore per-category
// images, change `dedicatedSrc` back to `CATEGORY_PANEL_HERO_IMAGES[panelId]`
// and the className back to the wastewater-submersible-only conditional.
const PLACEHOLDER_HERO_SRC = CATEGORY_PANEL_HERO_IMAGES["wastewater-submersible"];

export function CategoryHeroImage({
  panelId,
  fallbackProductSlug,
}: CategoryHeroImageProps) {
  const dedicatedSrc = PLACEHOLDER_HERO_SRC;
  const fallbackSrc = fallbackProductSlug
    ? getProductImageSrc({ slug: fallbackProductSlug })
    : ASSETS.pump.src;

  const [src, setSrc] = useState(dedicatedSrc ?? fallbackSrc);

  useEffect(() => {
    setSrc(dedicatedSrc ?? fallbackSrc);
  }, [dedicatedSrc, fallbackSrc, panelId]);

  return (
    <Image
      key={`${panelId}-${src}`}
      src={src}
      alt={getCategoryPanelHeroAlt(panelId)}
      fill
      sizes="(max-width: 900px) 100vw, 42vw"
      className={cn("object-center object-contain")}
      priority
      onError={() => {
        if (src !== fallbackSrc) setSrc(fallbackSrc);
      }}
    />
  );
}
