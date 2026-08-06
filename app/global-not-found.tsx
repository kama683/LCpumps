import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";
import { manrope, notoSansSC, ptSans } from "@/lib/fonts";
import { routing, type AppLocale } from "@/i18n/routing";
import { ASSETS } from "@/lib/assets";
import { LOGO_PATH, BRAND } from "@/lib/site";
import "./globals.css";

/** Fallback for genuinely unmatched URLs — this is the one most real
 * visitors actually hit (typo, dead external link, stale bookmark): Next's
 * router only reaches `app/[locale]/not-found.tsx` when `notFound()` is
 * thrown from *inside* an already-matched page (bad product/project/about-us
 * slug); a path that doesn't match any route at all is handled at the
 * routing level and renders this file directly, skipping every nested
 * not-found boundary and the `[locale]` layout — no shared layout, no route
 * params, own <html>/<body>/fonts. A plain `not-found.tsx` shaped like this
 * doesn't get its imported globals.css linked in <head> in this Next
 * version (the CSS chunk compiles and is reachable, it's just never
 * referenced) — `global-not-found.tsx` is the documented fix (requires
 * `experimental.globalNotFound` in next.config.ts; see
 * node_modules/next/dist/docs/.../not-found.md).
 *
 * No `params.locale` here either, so the locale is read straight off the
 * request: next-intl's own middleware already resolved it and stamps it on
 * every request as the `x-next-intl-locale` header — more reliable than
 * guessing from Accept-Language, which reflects the browser's language
 * preference, not the path actually visited. */
export const dynamic = "force-dynamic";

async function resolveLocale(): Promise<AppLocale> {
  const header = (await headers()).get("x-next-intl-locale");
  const supported: readonly string[] = routing.locales;
  return supported.includes(header ?? "") ? (header as AppLocale) : routing.defaultLocale;
}

async function getMessages(locale: AppLocale) {
  return (await import(`../messages/${locale}.json`)).default;
}

function localizedHref(locale: AppLocale, path: string): string {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const messages = await getMessages(locale);
  const t = messages.PageMetadata.notFound;
  return { title: t.title, description: t.description };
}

export default async function GlobalNotFound() {
  const locale = await resolveLocale();
  const messages = await getMessages(locale);
  const t = messages.NotFound;

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${ptSans.variable} ${notoSansSC.variable} antialiased`}
    >
      <body className="min-h-dvh bg-white font-sans text-foreground">
        <div className="mx-auto flex min-h-dvh max-w-[var(--container-content)] flex-col px-5 tablet:px-8">
          <Link
            href={localizedHref(locale, "/")}
            className="flex shrink-0 items-center gap-2.5 py-6 no-underline"
          >
            <Image src={LOGO_PATH} alt={BRAND} width={44} height={44} className="size-11 object-contain" priority />
            <span className="font-heading text-xl font-bold tracking-[-0.3px] text-body">
              LCPUMPS
            </span>
          </Link>

          <section className="relative flex flex-1 items-center overflow-hidden">
            <div className="grid w-full grid-cols-1 items-center gap-12 py-12 tablet:grid-cols-2">
              <div>
                <div
                  className="animate-hero-fade-up text-[13px] font-bold uppercase tracking-[1.5px] text-primary"
                >
                  {t.eyebrow}
                </div>
                <div
                  className="display-heading animate-hero-fade-up mt-3 font-heading text-[clamp(88px,14vw,160px)] leading-none font-bold text-primary"
                  style={{ animationDelay: "60ms" }}
                >
                  404
                </div>
                <h1
                  className="display-heading animate-hero-fade-up mt-2 font-heading text-[clamp(24px,3vw,32px)] leading-tight font-bold text-heading"
                  style={{ animationDelay: "120ms" }}
                >
                  {t.title}
                </h1>
                <p
                  className="animate-hero-fade-up mt-4 max-w-[440px] text-base leading-relaxed text-muted"
                  style={{ animationDelay: "180ms" }}
                >
                  {t.description}
                </p>
                <div
                  className="animate-hero-fade-up mt-8 flex flex-wrap gap-4"
                  style={{ animationDelay: "240ms" }}
                >
                  <Link
                    href={localizedHref(locale, "/")}
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-3.5 text-[15px] font-bold text-white no-underline shadow-btn transition-[transform,background,color] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:text-white active:translate-y-0 active:scale-[0.97]"
                  >
                    {t.homeButton}
                  </Link>
                  <Link
                    href={localizedHref(locale, "/products")}
                    className="inline-flex items-center justify-center rounded-sm border border-border-mid bg-white px-7 py-3.5 text-[15px] font-bold text-body no-underline transition-[border-color,color] duration-200 hover:border-primary hover:text-primary active:scale-[0.97]"
                  >
                    {t.catalogButton}
                  </Link>
                </div>
                <div className="animate-hero-fade-up mt-6" style={{ animationDelay: "300ms" }}>
                  <Link
                    href={localizedHref(locale, "/contact")}
                    className="inline-flex items-center gap-1.5 font-bold text-primary no-underline transition-[gap,color] duration-200 hover:gap-2.5 hover:text-primary-dark"
                  >
                    {t.contactLink}
                    <ArrowRight className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
                  </Link>
                </div>
              </div>

              <div
                className="relative hidden aspect-square items-center justify-center tablet:flex"
                aria-hidden
              >
                <div className="hero-blueprint-grid animate-hero-fade-up absolute aspect-square w-[min(520px,85%)]" />
                <Image
                  src={ASSETS.heroPump.src}
                  alt=""
                  width={ASSETS.heroPump.width}
                  height={ASSETS.heroPump.height}
                  priority
                  className="animate-notfound-pump-in relative z-1 h-auto w-full max-w-[420px] object-contain"
                />
              </div>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
