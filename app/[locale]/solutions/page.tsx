import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getWaterProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ui/ProductCard";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";

export const metadata: Metadata = {
  title: "Решения",
};

// Water-supply products are DB-backed and admin-editable at runtime.
export const dynamic = "force-dynamic";

export default async function SolutionsPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const products = await getWaterProducts(locale);

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white">
        <PageContainer className="py-14 pb-6">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: t("Solutions.breadcrumbLabel") }]}
          />
          <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-primary mt-6">
            {t("Solutions.eyebrow")}
          </div>
          <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] text-heading mt-2.5 leading-tight">
            {t("CatalogNav.water-supply-complete")}
          </h1>
        </PageContainer>
      </section>
      <PageContainer className="py-8 pb-20">
        <div className="grid grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-3 gap-6 max-mobile:grid-cols-1">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
