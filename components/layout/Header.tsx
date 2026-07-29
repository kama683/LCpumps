"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { BRAND, LOGO_PATH, MAIN_NAV } from "@/lib/site";
import { cn, isActiveNav } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-sm border-b border-border-light">
      <div className="max-w-[var(--container-content)] mx-auto px-5 tablet:px-8 py-3 tablet:py-3.5 flex items-center gap-4 tablet:gap-8.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 tablet:gap-3.5 shrink-0 no-underline hover:text-inherit"
        >
          <Image
            src={LOGO_PATH}
            alt={BRAND}
            width={88}
            height={88}
            className="object-contain size-20 tablet:h-28 tablet:w-auto"
            priority
          />
          <span className="font-heading font-bold text-[28px] tablet:text-[32px] text-body tracking-[1.1px] leading-[1.15]">
            LCPUMPS
          </span>
        </Link>

        <nav className="hidden tablet:flex ml-auto items-center gap-7 text-[15px] font-semibold whitespace-nowrap">
          {MAIN_NAV.map((item) => {
            const active = isActiveNav(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "no-underline pb-0.5",
                  active
                    ? "text-primary border-b-2 border-primary"
                    : "text-nav hover:text-primary"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden tablet:block">
          <LanguageSwitcher />
        </div>

        <Button href="/contact" variant="header" className="hidden tablet:inline-flex shrink-0">
          {t("contactCta")}
        </Button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          className="tablet:hidden ml-auto flex size-11 shrink-0 items-center justify-center rounded-md border border-border-mid text-heading transition-colors hover:border-primary hover:text-primary"
        >
          {open ? (
            <X className="size-5" strokeWidth={2} aria-hidden />
          ) : (
            <Menu className="size-5" strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>

      <div
        className={cn(
          "tablet:hidden grid overflow-hidden border-t border-border-light bg-white transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {MAIN_NAV.map((item) => {
              const active = isActiveNav(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-4 py-3.5 text-base font-semibold no-underline transition-colors",
                    active ? "bg-surface-alt text-primary" : "text-nav hover:bg-surface hover:text-primary"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3.5 border-t border-border-light px-5 py-4">
            <LanguageSwitcher inline />
            <Button href="/contact" variant="header" className="justify-center">
              {t("contactCta")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
