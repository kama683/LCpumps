import { useTranslations } from "next-intl";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductImage } from "@/components/ui/ProductImage";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { hasModelCode } from "@/lib/catalog-helpers";
import { getProductImageSrc } from "@/lib/product-images";
import type { ProductDetail } from "@/lib/types";

interface ProjectEquipmentCardProps {
  product: ProductDetail;
}

export function ProjectEquipmentCard({ product }: ProjectEquipmentCardProps) {
  const t = useTranslations("ProjectDetail");

  return (
    <Card
      href={`/products/${product.slug}`}
      className="flex h-full flex-col hover:shadow-card-sm"
    >
      <ProductImage
        alt={product.name}
        src={getProductImageSrc(product)}
        aspectRatio="1/1"
        sizes="(max-width: 900px) 50vw, 22vw"
      />
      <div className="flex flex-1 flex-col p-3.5 pb-4">
        {hasModelCode(product) && (
          <Eyebrow className="mb-1 text-[11px]">{product.code}</Eyebrow>
        )}
        <h3 className="font-heading font-bold text-[13px] text-body leading-snug line-clamp-3 flex-1">
          {product.name}
        </h3>
        <span className="mt-3 inline-flex self-start rounded-sm border border-border-mid bg-white px-3 py-1.5 text-[11px] font-bold text-body transition-colors hover:border-primary hover:text-primary">
          {t("learnMore")}
        </span>
      </div>
    </Card>
  );
}

interface ProjectEquipmentSectionProps {
  description: string;
  products: ProductDetail[];
}

export function ProjectEquipmentSection({
  description,
  products,
}: ProjectEquipmentSectionProps) {
  const t = useTranslations("ProjectDetail");

  if (!products.length) return null;

  return (
    <section className="mt-14">
      <Eyebrow>{t("equipmentEyebrow")}</Eyebrow>
      <h2 className="font-heading font-bold text-[clamp(24px,3vw,32px)] text-heading mt-2.5">
        {t("equipmentTitle")}
      </h2>
      <p className="text-[15px] leading-relaxed text-muted mt-3.5 max-w-[720px]">
        {description}
      </p>
      <RevealStagger className="grid grid-cols-2 tablet:grid-cols-4 gap-4 mt-7 max-mobile:grid-cols-1">
        {products.map((product) => (
          <ProjectEquipmentCard key={product.slug} product={product} />
        ))}
      </RevealStagger>
      <p className="mt-6 text-sm">
        <ArrowLink href="/products">{t("viewCatalog")}</ArrowLink>
      </p>
    </section>
  );
}
