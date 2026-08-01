"use client";

import { useState } from "react";
import { Pencil, Plus, Search } from "lucide-react";
import { ProductEditModal } from "@/components/admin/ProductEditModal";
import { getProductImageSrc } from "@/lib/product-images";
import type { AdminProductListItem, ProductInput } from "@/lib/repositories/products";
import type { SectionOption } from "@/lib/repositories/sections";

const FIELD =
  "w-full py-2.5 pl-9 pr-3.5 border border-border-mid rounded-md text-sm text-body bg-white placeholder:text-subtle focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(247,6,32,0.12)] transition-[border-color,box-shadow]";

function ProductRow({
  product,
  onEdit,
}: {
  product: AdminProductListItem;
  onEdit: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border-light px-5 py-3.5 last:border-b-0 max-mobile:flex-wrap">
      {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail may be an admin-uploaded local file */}
      <img
        src={getProductImageSrc(product)}
        alt=""
        className="size-12 shrink-0 rounded-md border border-border-mid bg-white object-contain p-1"
      />
      <div className="min-w-0 flex-1 max-mobile:basis-full">
        <div className="truncate text-sm font-bold text-body">{product.name}</div>
        <div className="mt-0.5 text-xs text-subtle">{product.code}</div>
      </div>
      <span
        className={`shrink-0 rounded-pill px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
          product.stockQuantity > 0 ? "bg-surface-alt text-success" : "bg-surface-alt text-error"
        }`}
      >
        {product.stockQuantity > 0 ? `В наличии: ${product.stockQuantity}` : "Нет в наличии"}
      </span>
      <button
        type="button"
        onClick={() => onEdit(product.slug)}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm border border-border-mid bg-white px-3.5 py-2 text-[13px] font-bold text-body transition-colors hover:border-primary hover:text-primary"
      >
        <Pencil className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
        Редактировать
      </button>
    </div>
  );
}

export function ProductAdminTable({
  products,
  sections,
  loadProduct,
}: {
  products: AdminProductListItem[];
  sections: SectionOption[];
  loadProduct: (slug: string) => Promise<ProductInput | null>;
}) {
  const [query, setQuery] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductInput | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
  });

  async function handleEdit(slug: string) {
    setEditingSlug(slug);
    setLoading(true);
    try {
      const product = await loadProduct(slug);
      setEditingProduct(product);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setEditingSlug(null);
    setEditingProduct(null);
    setCreating(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative max-w-96 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle"
            strokeWidth={2}
            aria-hidden
          />
          <input
            className={FIELD}
            placeholder="Поиск по модели или названию…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-btn transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          <Plus className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
          Добавить товар
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white">
        {filtered.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">Ничего не найдено.</p>
        ) : (
          filtered.map((product) => (
            <ProductRow key={product.slug} product={product} onEdit={handleEdit} />
          ))
        )}
      </div>

      {editingSlug && !loading && editingProduct && (
        <ProductEditModal mode="edit" product={editingProduct} sections={sections} onClose={closeModal} />
      )}
      {creating && <ProductEditModal mode="create" sections={sections} onClose={closeModal} />}
    </div>
  );
}
