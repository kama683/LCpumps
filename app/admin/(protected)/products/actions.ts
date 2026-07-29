"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getSession } from "@/lib/auth/dal";
import * as productsRepo from "@/lib/repositories/products";
import type { ProductInput } from "@/lib/repositories/products";

export interface ProductActionResult {
  error?: string;
}

export async function createProductAction(input: ProductInput): Promise<ProductActionResult> {
  const session = await getSession();
  if (!session) return { error: "Не авторизовано." };

  const slug = input.slug.trim();
  if (!slug) return { error: "Укажите slug товара." };
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug может содержать только латинские буквы, цифры и дефис." };
  }
  if (!input.translations.ru.name.trim()) {
    return { error: "Укажите название товара (RU)." };
  }
  if (await productsRepo.slugExists(slug)) {
    return { error: "Товар с таким slug уже существует." };
  }

  await productsRepo.createProduct({ ...input, slug });
  revalidatePath("/admin/products");
  updateTag("catalog");
  return {};
}

export async function updateProductAction(
  slug: string,
  input: Omit<ProductInput, "slug">
): Promise<ProductActionResult> {
  const session = await getSession();
  if (!session) return { error: "Не авторизовано." };

  if (!input.translations.ru.name.trim()) {
    return { error: "Укажите название товара (RU)." };
  }

  await productsRepo.updateProduct(slug, input);
  revalidatePath("/admin/products");
  updateTag("catalog");
  return {};
}

export async function deleteProductAction(slug: string): Promise<ProductActionResult> {
  const session = await getSession();
  if (!session) return { error: "Не авторизовано." };

  await productsRepo.deleteProduct(slug);
  revalidatePath("/admin/products");
  updateTag("catalog");
  return {};
}

export async function getProductForEditAction(slug: string): Promise<ProductInput | null> {
  const session = await getSession();
  if (!session) return null;

  return productsRepo.getProductForAdmin(slug);
}
