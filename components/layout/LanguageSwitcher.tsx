"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** Renders every locale as a flat row instead of a popup dropdown — use this inside
   * containers with `overflow-hidden` (e.g. an animated collapse panel), since an
   * absolutely-positioned dropdown would otherwise get clipped by that ancestor. */
  inline?: boolean;
  /** White trigger text — for the transparent header floating over the home hero photo. */
  light?: boolean;
}

export function LanguageSwitcher({ inline = false, light = false }: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  if (inline) {
    return (
      <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            aria-current={loc === locale ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "rounded-md px-3 py-2 transition-colors active:opacity-60 cursor-pointer",
              loc === locale
                ? "bg-pill-blue-bg text-primary"
                : "text-nav hover:bg-surface hover:text-primary"
            )}
          >
            {t(loc)}
          </button>
        ))}
      </div>
    );
  }

  return <LanguageDropdown light={light} />;
}

function LanguageDropdown({ light = false }: { light?: boolean }) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative text-sm font-semibold">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 rounded-sm px-2 py-2.5 tablet:py-1 transition-colors duration-300 cursor-pointer active:opacity-60",
          light ? "text-white hover:text-white/80" : "text-nav hover:text-primary"
        )}
      >
        {t(locale)}
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
          strokeWidth={2.25}
          aria-hidden
        />
      </button>

      <div
        role="listbox"
        className={cn(
          "absolute right-0 top-full z-10 mt-1.5 min-w-23 origin-top-right overflow-hidden rounded-md border border-border-mid bg-white py-1 shadow-card transition-[opacity,transform] duration-150 ease-out",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-95 opacity-0 -translate-y-1"
        )}
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            role="option"
            aria-selected={loc === locale}
            onClick={() => {
              setOpen(false);
              router.replace(pathname, { locale: loc });
            }}
            className={cn(
              "block w-full cursor-pointer px-3.5 py-2.5 text-left transition-colors active:opacity-60",
              loc === locale
                ? "bg-pill-blue-bg text-primary"
                : "text-nav hover:bg-surface hover:text-primary"
            )}
          >
            {t(loc)}
          </button>
        ))}
      </div>
    </div>
  );
}
