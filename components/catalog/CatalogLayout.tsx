"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductImage } from "@/components/ui/ProductImage";
import { SearchField } from "@/components/ui/SearchField";
import { useCatalogPanel } from "@/components/catalog/CatalogPanelContext";
import { hasModelCode } from "@/lib/catalog-helpers";
import { CATALOG_NAV } from "@/lib/site";
import type { CatalogPanel, SearchIndexItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CatalogLayoutProps {
  panels: CatalogPanel[];
  searchIndex: SearchIndexItem[];
  currentRoute: string;
  searchPlaceholder: string;
}

export function CatalogLayout({
  panels,
  searchIndex,
  currentRoute,
  searchPlaceholder,
}: CatalogLayoutProps) {
  const { activePanel, showPanel } = useCatalogPanel();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const router = useRouter();
  const listboxId = useId();
  const t = useTranslations("CategoryPage");
  const tCatalogNav = useTranslations("CatalogNav");
  const tCommon = useTranslations("Common");

  const [displayedPanel, setDisplayedPanel] = useState(activePanel);
  const [panelVisible, setPanelVisible] = useState(true);

  useEffect(() => {
    if (activePanel === displayedPanel) return;
    setPanelVisible(false);
    const outTimer = setTimeout(() => {
      setDisplayedPanel(activePanel);
      requestAnimationFrame(() => setPanelVisible(true));
    }, 150);
    return () => clearTimeout(outTimer);
  }, [activePanel, displayedPanel]);

  const hits = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return [];
    return searchIndex
      .filter(
        (p) =>
          p.code.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [deferredQuery, searchIndex]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [hits]);

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-[300px_1fr] gap-12 items-start">
      <aside className="tablet:sticky tablet:top-[88px]">
        <SearchField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={Boolean(query)}
          aria-controls={listboxId}
          aria-activedescendant={
            highlightedIndex >= 0 ? `${listboxId}-${highlightedIndex}` : undefined
          }
          onKeyDown={(e) => {
            if (!hits.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlightedIndex((i) => (i + 1) % hits.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlightedIndex((i) => (i <= 0 ? hits.length - 1 : i - 1));
            } else if (e.key === "Enter") {
              const hit = hits[highlightedIndex] ?? hits[0];
              if (hit) {
                e.preventDefault();
                setQuery("");
                router.push(`/products/${hit.slug}`);
              }
            } else if (e.key === "Escape") {
              setQuery("");
            }
          }}
        />

        {query && (
          <div
            id={listboxId}
            role="listbox"
            className="starting:opacity-0 starting:-translate-y-1 mt-2 opacity-100 translate-y-0 transition-[opacity,transform] duration-150"
          >
            {hits.length === 0 ? (
              <div className="py-2.5 px-1 text-[13px] text-subtle">
                {t("noResults")}
              </div>
            ) : (
              hits.map((hit, index) => (
                <Link
                  key={`${hit.slug}-${hit.code}`}
                  id={`${listboxId}-${index}`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  href={`/products/${hit.slug}`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "block py-2.5 px-3 rounded-sm text-sm text-muted leading-snug no-underline hover:bg-[#fcf0f1] hover:text-primary",
                    index === highlightedIndex && "bg-[#fcf0f1] text-primary"
                  )}
                >
                  {hasModelCode(hit) ? (
                    <>
                      <strong className="text-heading">{hit.code}</strong> — {hit.name}
                    </>
                  ) : (
                    hit.name
                  )}
                </Link>
              ))
            )}
          </div>
        )}

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setCategoryMenuOpen((v) => !v)}
            aria-expanded={categoryMenuOpen}
            className="tablet:hidden flex w-full items-center justify-between gap-3 rounded-lg border border-border-light bg-white px-5 py-3.5 text-left text-sm font-semibold text-heading"
          >
            <span className="truncate">
              {tCatalogNav(activePanel === "valves" ? "valvesFooterLabel" : activePanel)}
            </span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-primary transition-transform duration-200",
                categoryMenuOpen && "rotate-180"
              )}
              strokeWidth={2.25}
              aria-hidden
            />
          </button>
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "tablet:grid-rows-[1fr]",
              categoryMenuOpen ? "grid-rows-[1fr] mt-2 tablet:mt-0" : "grid-rows-[0fr] tablet:mt-0"
            )}
          >
            <nav className="overflow-hidden rounded-lg border border-border-light bg-white tablet:overflow-hidden">
              {CATALOG_NAV.map((nav) => {
                const page = nav.page;
                const isCurrentPage = page === currentRoute;
                const navLabelKey = nav.id === "valves" ? "valvesFooterLabel" : nav.id;

                if (isCurrentPage) {
                  const active = nav.id === activePanel;
                  return (
                    <button
                      key={nav.id}
                      type="button"
                      onClick={() => {
                        showPanel(nav.id);
                        setQuery("");
                        setCategoryMenuOpen(false);
                      }}
                      className={cn(
                        "block w-full text-left py-4 px-5 text-sm font-semibold border-b border-border-light leading-snug transition-[background,color,box-shadow] duration-150 active:opacity-60",
                        active
                          ? "bg-surface-alt text-primary shadow-[inset_3px_0_0_#f70620]"
                          : "text-muted hover:bg-surface hover:text-primary"
                      )}
                    >
                      {tCatalogNav(navLabelKey)}
                    </button>
                  );
                }

                const href =
                  nav.category === "pumps" && page === "/products"
                    ? `${page}#${nav.id}`
                    : page;

                return (
                  <Link
                    key={nav.id}
                    href={href}
                    className="block py-4 px-5 text-sm font-semibold text-muted border-b border-border-light leading-snug hover:bg-surface hover:text-primary no-underline last:border-b-0"
                  >
                    {tCatalogNav(navLabelKey)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="bg-gradient-to-br from-surface-alt to-[#f8e4e6] border border-[#f2d8db] rounded-xl p-5.5 mt-6">
          <MessageCircle
            className="size-6 text-primary mb-3"
            strokeWidth={1.75}
            aria-hidden
          />
          <div className="font-bold text-[15px] text-heading">
            {t("helpTitle")}
          </div>
          <p className="text-[13px] leading-relaxed text-muted mt-2">
            {t("helpText")}
          </p>
          <ArrowLink href="/contact" className="mt-3.5 text-sm">
            {tCommon("contactUs")}
          </ArrowLink>
        </div>
      </aside>

      <div>
        {panels.map((panel) => (
          <div
            key={panel.id}
            hidden={panel.id !== displayedPanel}
            className={cn(
              panel.id === displayedPanel ? "block" : "hidden",
              "transition-opacity duration-150",
              panelVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <h2 className="display-heading font-heading font-bold text-heading text-[clamp(24px,3vw,32px)] leading-tight">
              {tCatalogNav(panel.id === "valves" ? "valvesFooterLabel" : panel.id)}
            </h2>
            {panel.id !== "control-panel" &&
              panel.section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-muted mt-4"
                >
                  {paragraph}
                </p>
              ))}
            <div className="grid grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-3 gap-6 mt-7 max-mobile:grid-cols-1">
              {panel.section.products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
              {panel.section.bullets?.map((bullet) => (
                <div
                  key={bullet}
                  className="bg-white border border-border rounded-xl overflow-hidden"
                >
                  <ProductImage alt={`Category item: ${bullet}`} />
                  <div className="px-5 py-4.5">
                    <h3 className="font-heading font-bold text-[15px] text-body leading-snug">
                      {bullet}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
