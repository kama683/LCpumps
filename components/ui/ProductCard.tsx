import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductImage } from "@/components/ui/ProductImage";
import { hasModelCode } from "@/lib/catalog-helpers";
import { getProductImageSrc } from "@/lib/product-images";
import type { CatalogProductRef, ProductDetail } from "@/lib/types";

interface ProductCardProps {
  product: CatalogProductRef | ProductDetail;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card href={`/products/${product.slug}`}>
      <ProductImage
        alt={product.name}
        src={getProductImageSrc(product)}
        imagePadding="p-7"
      />
      <div className="px-5.5 py-5">
        {hasModelCode(product) && (
          <Eyebrow className="mb-2">{product.code}</Eyebrow>
        )}
        <h3 className="font-heading font-bold text-base text-body leading-snug">
          {product.name}
        </h3>
      </div>
    </Card>
  );
}
