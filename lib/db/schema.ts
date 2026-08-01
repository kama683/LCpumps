import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const productCategoryEnum = pgEnum("product_category", [
  "pumps",
  "valves",
  "control",
  "water",
]);

export const submissionModeEnum = pgEnum("submission_mode", ["basic", "technical"]);

export const submissionStatusEnum = pgEnum("submission_status", ["new", "read"]);

export const localeEnum = pgEnum("locale", ["ru", "en", "kk", "zh"]);

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sections = pgTable("sections", {
  id: text("id").primaryKey(),
  projectList: jsonb("project_list").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sectionTranslations = pgTable(
  "section_translations",
  {
    sectionId: text("section_id")
      .notNull()
      .references(() => sections.id, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    title: text("title").notNull(),
    paragraphs: jsonb("paragraphs").$type<string[]>().notNull().default([]),
    bullets: jsonb("bullets").$type<string[] | null>(),
  },
  (t) => [primaryKey({ columns: [t.sectionId, t.locale] })]
);

export const products = pgTable(
  "products",
  {
    slug: text("slug").primaryKey(),
    code: text("code").notNull(),
    category: productCategoryEnum("category").notNull(),
    sectionId: text("section_id").references(() => sections.id, { onDelete: "set null" }),
    image: text("image"),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    /** Admin-only — never exposed on the public site (see getAllProductsPublic). */
    price: integer("price").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("products_section_id_idx").on(t.sectionId), index("products_category_idx").on(t.category)]
);

export const productTranslations = pgTable(
  "product_translations",
  {
    productSlug: text("product_slug")
      .notNull()
      .references(() => products.slug, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    name: text("name").notNull(),
    description: jsonb("description").$type<string[]>().notNull().default([]),
    specs: jsonb("specs").$type<string[]>().notNull().default([]),
    applications: jsonb("applications").$type<string[]>().notNull().default([]),
  },
  (t) => [primaryKey({ columns: [t.productSlug, t.locale] })]
);

export const contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    mode: submissionModeEnum("mode").notNull(),
    name: text("name").notNull(),
    company: text("company").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    message: text("message").notNull(),
    techPrimary: jsonb("tech_primary").$type<Record<string, string>>(),
    techExtra: jsonb("tech_extra").$type<Record<string, string>>(),
    status: submissionStatusEnum("status").notNull().default("new"),
  },
  (t) => [
    index("contact_submissions_status_idx").on(t.status),
    index("contact_submissions_created_at_idx").on(t.createdAt),
  ]
);

export const submissionAttachments = pgTable("submission_attachments", {
  id: uuid("id").primaryKey().defaultRandom(),
  submissionId: uuid("submission_id")
    .notNull()
    .references(() => contactSubmissions.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  storagePath: text("storage_path").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
