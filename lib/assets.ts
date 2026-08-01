/** Asset paths and dimensions — mirrors `site/assets/` originals. */

export const ASSETS = {
  logo: {
    src: "/assets/logo/newlogo(v5).png",
    width: 1024,
    height: 1024,
    alt: "LCPumps",
  },
  heroBg: {
    src: "/assets/logo/chatgpt-image-8-2026-10_18_08-mrc55t9q-removebg-preview.png",
    width: 500,
    height: 500,
    alt: "",
  },
  logoBackground: {
    src: "/assets/logo/newlogo(v5).png",
    width: 1024,
    height: 1024,
    alt: "",
  },
  logoColor: {
    src: "/assets/logo/newlogo(v5).png",
    width: 1024,
    height: 1024,
    alt: "LCPumps",
  },
  logoFaint: {
    src: "/assets/logo/newlogo(v5).png",
    width: 1024,
    height: 1024,
    alt: "",
  },
  pump: {
    src: "/assets/pump.png",
    width: 1666,
    height: 944,
    alt: "Промышленный насос",
  },
  heroPump: {
    src: "/assets/pump without background.png",
    width: 1666,
    height: 944,
    alt: "",
  },
  aboutPhoto: {
    src: "/assets/hero/lainc.jpg",
    width: 1200,
    height: 800,
    alt: "LCPumps",
  },
} as const;

/** Home hero background slideshow — crossfades through these in order. */
export const HERO_SLIDES = [
  { src: "/assets/hero/hero-1.png", alt: "" },
  { src: "/assets/hero/hero-2.png", alt: "" },
  { src: "/assets/hero/hero-3.png", alt: "" },
] as const;

export const LOGO_PATH = ASSETS.logo.src;
