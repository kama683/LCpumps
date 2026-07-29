import { getProductForEditAction } from "@/app/admin/(protected)/products/actions";
import { ProductAdminTable } from "@/components/admin/ProductAdminTable";
import { listProductsForAdmin } from "@/lib/repositories/products";
import { listSectionOptions } from "@/lib/repositories/sections";

export default async function AdminProductsPage() {
  const [products, sections] = await Promise.all([listProductsForAdmin(), listSectionOptions()]);

  return (
    <div>
      <h1 className="font-heading text-[28px] font-bold text-heading">Товары</h1>
      <p className="mt-2 text-muted">
        Редактирование, создание и удаление товаров каталога — название, описание, характеристики,
        категория, секция и изображение, отдельно для каждого языка.
      </p>

      <div className="mt-8">
        <ProductAdminTable products={products} sections={sections} loadProduct={getProductForEditAction} />
      </div>
    </div>
  );
}
