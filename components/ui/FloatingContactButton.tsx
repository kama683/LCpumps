"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Mobile-only floating CTA so a visitor browsing the catalog/product pages
 * doesn't have to scroll to the footer or leave the page to reach /contact. */
export function FloatingContactButton() {
  const t = useTranslations("Nav");

  return (
    <Link
      href="/contact"
      className="tablet:hidden fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-pill bg-primary pl-4 pr-5 py-3.5 text-sm font-bold text-white shadow-btn no-underline transition-transform duration-200 hover:-translate-y-0.5 hover:text-white active:translate-y-0 active:scale-95"
    >
      <MessageCircle className="size-4.5 shrink-0" strokeWidth={2.25} aria-hidden />
      {t("contactCta")}
    </Link>
  );
}
