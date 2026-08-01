UPDATE "products" SET "price" = 0 WHERE "price" IS NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET NOT NULL;