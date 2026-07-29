import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";

type HeroBgVariant = "page" | "catalog" | "home" | "contact";

const variantClasses: Record<"page" | "catalog", string> = {
  page: "absolute -right-[-180px] top-1/2 -translate-y-1/2 w-[min(360px,40vw)] h-auto object-contain opacity-[0.34] z-0 pointer-events-none max-tablet:-right-[120px] max-tablet:opacity-[0.22] max-tablet:w-[min(420px,60vw)]",
  catalog:
    "absolute -right-[30px] top-1/2 -translate-y-1/2 w-[min(520px,75%)] h-auto object-contain opacity-45 pointer-events-none",
};

/** Pump + blueprint: separate sizes per page */
const pumpLayouts = {
  home: {
    frame:
      "absolute right-32 top-[45%] -translate-y-1/2 w-[min(620px,66vw)] max-tablet:w-[min(640px,90vw)]",
    grid: "w-[min(790px,60vw)] max-tablet:w-[min(570px,68vw)]",
  },
  contact: {
    frame:
      "absolute right-30 top-1/2 -translate-y-1/2 w-[min(520px,42vw)] max-tablet:w-[min(400px,78vw)]",
    grid: "w-[min(780px,70vw)] max-tablet:w-[min(560px,95vw)]",
  },
} as const;

function PumpHeroBackdrop({
  layout,
  className,
  priority,
}: {
  layout: keyof typeof pumpLayouts;
  className?: string;
  priority?: boolean;
}) {
  const sizes = pumpLayouts[layout];

  return (
    <div
      className={cn(
        sizes.frame,
        "z-0 pointer-events-none flex items-center justify-center",
        // On the home hero, the pump illustration sits behind a single-column text
        // block below the `tablet` breakpoint and overlaps/clutters the copy, so it's
        // hidden on mobile/tablet and only shown once the two-column desktop layout applies.
        layout === "home" && "max-tablet:hidden",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "hero-blueprint-grid absolute left-[60%] top-[40%] -translate-x-1/2 -translate-y-1/2 aspect-square",
          sizes.grid
        )}
      />
      <Image
        src={ASSETS.heroPump.src}
        alt=""
        width={ASSETS.heroPump.width}
        height={ASSETS.heroPump.height}
        priority={priority}
        className="relative z-[1] w-full h-auto object-contain"
      />
    </div>
  );
}

export function HeroBgImage({
  variant = "page",
  className,
  priority,
}: {
  variant?: HeroBgVariant;
  className?: string;
  priority?: boolean;
}) {
  if (variant === "home" || variant === "contact") {
    return (
      <PumpHeroBackdrop
        layout={variant}
        className={className}
        priority={priority}
      />
    );
  }

  const asset = variant === "page" ? ASSETS.logoBackground : ASSETS.heroBg;

  return (
    <Image
      src={asset.src}
      alt=""
      aria-hidden
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={cn(variantClasses[variant], className)}
    />
  );
}
