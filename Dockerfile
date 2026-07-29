# syntax=docker/dockerfile:1

# ---- deps: install once, cached as long as lockfile doesn't change ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: next build against output: "standalone" ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# next build evaluates lib/db/client.ts and lib/auth/session.ts at module
# scope (they throw if these are unset) even though no page actually
# queries the DB at build time — every catalog/admin route is
# `dynamic = "force-dynamic"`. These are throwaway values, never used to
# open a real connection; the real ones come from the runtime environment
# (docker-compose's env_file), not from this stage.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV ADMIN_SESSION_SECRET="build-time-placeholder-0000000000000000000000000000"

RUN npm run build

# ---- runner: minimal image, only the standalone output ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Static assets + product images baked into the image (public/uploads is a
# separate mounted volume — see docker-compose.yml — layered on top at
# runtime, never shadowing these).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Mount points for the local-disk storage driver (lib/storage.ts). Created
# here so the volumes have correct ownership from the first `docker compose up`,
# not just after the app writes to them.
RUN mkdir -p /app/public/uploads /app/data/uploads && chown -R nextjs:nodejs /app/public/uploads /app/data/uploads

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
