"use client";

import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductImage } from "@/components/ui/ProductImage";
import { Breadcrumb, PageContainer, SpecTable } from "@/components/ui/SpecTable";
import { hasModelCode } from "@/lib/catalog-helpers";
import { getProductImageSrc } from "@/lib/product-images";
import type { ProductDetail } from "@/lib/types";

export function ProductDetailView({ product }: { product: ProductDetail }) {
  const t = useTranslations();
  const showModel = hasModelCode(product);

  const categoryHref =
    product.category === "pumps" ? "/products" : `/products/${product.category}`;

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white">
        <PageContainer className="py-14 pb-10">
          <Breadcrumb
            items={[
              { label: t("Common.home"), href: "/" },
              { label: t("Common.products"), href: "/products" },
              { label: t("ProductDetail.category"), href: categoryHref },
              { label: showModel ? product.code : product.name },
            ]}
          />
          <div className="min-w-0">
            {showModel && <Eyebrow>{product.code}</Eyebrow>}
            <h1 className="font-heading font-bold text-[clamp(28px,4.2vw,40px)] text-heading mt-2.5 leading-tight max-w-[900px]">
              {product.name}
            </h1>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="pt-5">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 items-start">
          <ProductImage
            alt={
              showModel
                ? `${product.code} — ${product.name} product photo`
                : `${product.name} product photo`
            }
            src={getProductImageSrc(product)}
            aspectRatio="4/3"
          />
          <div>
            <h2 className="font-heading font-bold text-2xl text-heading">
              {t("ProductDetail.description")}
            </h2>
            {product.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 50)}
                className="text-base leading-relaxed text-muted mt-3.5"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </PageContainer>

      <PageContainer className="pt-12">
        <h2 className="font-heading font-bold text-[28px] text-heading mb-5">
          {t("ProductDetail.specsHeading")}
        </h2>
        <SpecTable specs={product.specs} />
        {product.applications.length > 0 && (
          <>
            <h3 className="font-heading font-bold text-[22px] text-heading mt-10">
              {t("ProductDetail.applications")}
            </h3>
            <ul className="mt-4 pl-5 text-muted leading-relaxed text-base list-disc">
              {product.applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </PageContainer>
    </>
  );
}
