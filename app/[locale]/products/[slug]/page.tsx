import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HomeCtaSection } from "@/components/sections/HomeCtaSection";
import { ProductDownloadButton } from "@/components/products/ProductDownloadButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductImage } from "@/components/ui/ProductImage";
import { ProductCard } from "@/components/ui/ProductCard";
import { Breadcrumb, PageContainer, SpecTable } from "@/components/ui/SpecTable";
import { getAllProducts, getProductBySlug, hasModelCode } from "@/lib/catalog";
import { getProductImageSrc } from "@/lib/product-images";
import { RESERVED_PRODUCT_SLUGS } from "@/lib/site";

// Products are now DB-backed and admin-editable at runtime — no
// generateStaticParams here, so `next build` never needs a live database.
export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);
  if (!product) {
    const t = await getTranslations({ locale, namespace: "CategoryPage" });
    return { title: t("pumpsTitle") };
  }
  return {
    title: hasModelCode(product)
      ? `${product.code} — ${product.name}`
      : product.name,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  if (RESERVED_PRODUCT_SLUGS.has(slug)) notFound();

  const product = await getProductBySlug(slug, locale);
  if (!product) notFound();

  const allProducts = await getAllProducts(locale);
  const sameSection = allProducts.filter(
    (p) => p.sectionId && p.sectionId === product.sectionId && p.slug !== product.slug
  );
  const related = (
    sameSection.length > 0
      ? sameSection
      : allProducts.filter(
          (p) => p.category === product.category && p.slug !== product.slug
        )
  ).slice(0, 3);

  const categoryHref =
    product.category === "pumps"
      ? "/products"
      : `/products/${product.category}`;

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white">
        <PageContainer className="py-14 pb-10">
          <Breadcrumb
            items={[
              { label: t("Common.home"), href: "/" },
              { label: t("Common.products"), href: "/products" },
              { label: t("ProductDetail.category"), href: categoryHref },
              { label: hasModelCode(product) ? product.code : product.name },
            ]}
          />
          {hasModelCode(product) && <Eyebrow>{product.code}</Eyebrow>}
          <div className="flex items-start justify-between gap-6 flex-wrap mt-2.5">
            <h1 className="font-heading font-bold text-[clamp(28px,4.2vw,40px)] text-heading leading-tight max-w-[900px]">
              {product.name}
            </h1>
            <ProductDownloadButton
              slug={product.slug}
              code={product.code}
              name={product.name}
              showModel={hasModelCode(product)}
              imageSrc={getProductImageSrc(product)}
              imageAlt={
                hasModelCode(product)
                  ? `${product.code} — ${product.name} product photo`
                  : `${product.name} product photo`
              }
              description={product.description}
              specs={product.specs}
            />
          </div>
        </PageContainer>
      </section>

      <PageContainer className="pt-5">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 items-start">
          <ProductImage
            alt={
              hasModelCode(product)
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

      <HomeCtaSection />

      {related.length > 0 && (
        <PageContainer className="py-16 pb-20">
          <h2 className="font-heading font-bold text-[28px] text-heading mb-6">
            {t("ProductDetail.relatedTitle")}
          </h2>
          <div className="grid grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-3 gap-6 max-mobile:grid-cols-1">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/products" className="font-bold text-primary">
              {t("ProductDetail.backLink")}
            </Link>
          </div>
        </PageContainer>
      )}
    </>
  );
}
