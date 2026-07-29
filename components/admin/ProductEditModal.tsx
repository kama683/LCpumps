"use client";

import { useState, useTransition } from "react";
import { AlertCircle, Plus, Trash2, X } from "lucide-react";
import { createProductAction, deleteProductAction, updateProductAction } from "@/app/admin/(protected)/products/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Modal } from "@/components/admin/Modal";
import type { SectionOption } from "@/lib/repositories/sections";
import { parseSpecRow } from "@/lib/catalog-helpers";
import type { ProductInput, ProductTranslationInput } from "@/lib/repositories/products";
import type { ProductCategory } from "@/lib/types";
import type { AppLocale } from "@/i18n/routing";

const FIELD =
  "w-full py-2.5 px-3.5 border border-border-mid rounded-md text-sm text-body bg-white placeholder:text-subtle focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(247,6,32,0.12)] transition-[border-color,box-shadow]";

const LOCALES: AppLocale[] = ["ru", "en", "kk", "zh"];
const LOCALE_LABELS: Record<AppLocale, string> = { ru: "RU", en: "EN", kk: "KK", zh: "ZH" };

const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "pumps", label: "Насосы" },
  { value: "valves", label: "Трубопроводная арматура" },
  { value: "water", label: "Оборудование для водоснабжения" },
  { value: "control", label: "Электрические шкафы управления" },
];

interface SpecRow {
  key: string;
  value: string;
}

interface LocaleForm {
  name: string;
  description: string;
  specRows: SpecRow[];
  applications: string;
}

function toLocaleForm(t: ProductTranslationInput): LocaleForm {
  return {
    name: t.name,
    description: t.description.join("\n"),
    specRows: t.specs.map((spec) => parseSpecRow(spec)),
    applications: t.applications.join("\n"),
  };
}

function fromLocaleForm(form: LocaleForm): ProductTranslationInput {
  return {
    name: form.name.trim(),
    description: form.description.split("\n").map((p) => p.trim()).filter(Boolean),
    specs: form.specRows
      .filter((row) => row.key.trim())
      .map((row) => (row.value.trim() ? `${row.key.trim()}: ${row.value.trim()}` : row.key.trim())),
    applications: form.applications.split("\n").map((a) => a.trim()).filter(Boolean),
  };
}

const EMPTY_LOCALE_FORM: LocaleForm = { name: "", description: "", specRows: [], applications: "" };

interface ProductEditModalProps {
  mode: "create" | "edit";
  product?: ProductInput;
  sections: SectionOption[];
  onClose: () => void;
}

export function ProductEditModal({ mode, product, sections, onClose }: ProductEditModalProps) {
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [code, setCode] = useState(product?.code ?? "");
  const [category, setCategory] = useState<ProductCategory>(product?.category ?? "pumps");
  const [sectionId, setSectionId] = useState<string>(product?.sectionId ?? "");
  const [image, setImage] = useState<string | null>(product?.image ?? null);
  const [stockQuantity, setStockQuantity] = useState(String(product?.stockQuantity ?? 0));
  const [locale, setLocale] = useState<AppLocale>("ru");
  const [forms, setForms] = useState<Record<AppLocale, LocaleForm>>(() =>
    Object.fromEntries(
      LOCALES.map((l) => [l, product ? toLocaleForm(product.translations[l]) : EMPTY_LOCALE_FORM])
    ) as Record<AppLocale, LocaleForm>
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const form = forms[locale];

  function updateForm(patch: Partial<LocaleForm>) {
    setForms((prev) => ({ ...prev, [locale]: { ...prev[locale], ...patch } }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const translations = Object.fromEntries(
      LOCALES.map((l) => [l, fromLocaleForm(forms[l])])
    ) as Record<AppLocale, ProductTranslationInput>;

    const input = {
      code: code.trim(),
      category,
      sectionId: sectionId || null,
      image,
      stockQuantity: Math.max(0, Number(stockQuantity) || 0),
      translations,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createProductAction({ ...input, slug: slug.trim() })
          : await updateProductAction(product!.slug, input);

      if (result.error) {
        setError(result.error);
        return;
      }
      onClose();
    });
  }

  function handleDelete() {
    if (!product) return;
    if (!window.confirm(`Удалить товар «${product.code}»? Это необратимо.`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteProductAction(product.slug);
      if (result.error) {
        setError(result.error);
        return;
      }
      onClose();
    });
  }

  return (
    <Modal title={mode === "create" ? "Новый товар" : `Редактировать: ${product?.code}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">Slug</label>
            <input
              className={FIELD}
              value={slug}
              disabled={mode === "edit"}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="my-pump-model"
            />
            {mode === "create" && (
              <p className="mt-1 text-xs text-subtle">Латиница, цифры, дефис. Нельзя изменить после создания.</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">Код модели</label>
            <input className={FIELD} value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">Категория</label>
            <select
              className={FIELD}
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">Секция каталога</label>
            <select className={FIELD} value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
              <option value="">— не выбрано —</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">
            Количество в наличии
          </label>
          <input
            type="number"
            min={0}
            step={1}
            className={`${FIELD} max-w-40`}
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
          <p className="mt-1 text-xs text-subtle">Видно и редактируется только в админ-панели.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">Изображение</label>
          <ImageUploadField value={image} onChange={setImage} slug={slug || "unassigned"} />
        </div>

        <div className="border-t border-border-light pt-4">
          <div className="mb-3 flex gap-1.5 rounded-md bg-surface p-1">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className={`flex-1 rounded-sm py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  locale === l ? "bg-white text-primary shadow-sm" : "text-subtle hover:text-body"
                }`}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">
                Название ({LOCALE_LABELS[locale]})
              </label>
              <input className={FIELD} value={form.name} onChange={(e) => updateForm({ name: e.target.value })} />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">
                Описание (каждый абзац с новой строки)
              </label>
              <textarea
                className={`${FIELD} min-h-30 resize-y`}
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wide text-subtle">Характеристики</label>
                <button
                  type="button"
                  onClick={() => updateForm({ specRows: [...form.specRows, { key: "", value: "" }] })}
                  className="inline-flex cursor-pointer items-center gap-1 border-none bg-transparent text-xs font-bold text-primary hover:text-primary-dark"
                >
                  <Plus className="size-3.5" strokeWidth={2.5} aria-hidden />
                  Добавить
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {form.specRows.map((row, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className={FIELD}
                      placeholder="Параметр"
                      value={row.key}
                      onChange={(e) =>
                        updateForm({
                          specRows: form.specRows.map((r, i) => (i === index ? { ...r, key: e.target.value } : r)),
                        })
                      }
                    />
                    <input
                      className={FIELD}
                      placeholder="Значение"
                      value={row.value}
                      onChange={(e) =>
                        updateForm({
                          specRows: form.specRows.map((r, i) => (i === index ? { ...r, value: e.target.value } : r)),
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => updateForm({ specRows: form.specRows.filter((_, i) => i !== index) })}
                      aria-label="Удалить характеристику"
                      className="flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-border-mid bg-white px-2.5 text-muted hover:border-error hover:text-error"
                    >
                      <X className="size-3.5" strokeWidth={2.25} aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-subtle">
                Области применения (каждая с новой строки)
              </label>
              <textarea
                className={`${FIELD} min-h-24 resize-y`}
                value={form.applications}
                onChange={(e) => updateForm({ applications: e.target.value })}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="flex items-center gap-2 text-sm font-semibold text-error">
            <AlertCircle className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-border-light pt-5">
          {mode === "edit" ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent text-sm font-semibold text-muted hover:text-error disabled:cursor-default disabled:opacity-60"
            >
              <Trash2 className="size-3.5" strokeWidth={2.25} aria-hidden />
              Удалить товар
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={pending}
            className="rounded-sm bg-primary px-6 py-3 text-sm font-bold text-white shadow-btn transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {pending ? "Сохранение…" : "Сохранить"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
