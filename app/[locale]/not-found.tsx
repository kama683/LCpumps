import type { Metadata } from "next";
import Image from "next/image";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageContainer } from "@/components/ui/SpecTable";
import { ASSETS } from "@/lib/assets";
import { routing, type AppLocale } from "@/i18n/routing";

// not-found.js gets no route params (it can be reached from any broken
// slug under this segment), and — for a genuinely unmatched path, as
// opposed to an explicit notFound() thrown from inside a matched page —
// next-intl's ambient request-locale resolution falls back to the default
// locale here instead of the visited one. next-intl's own middleware
// already resolved the real locale and stamped it on the request as
// X-NEXT-INTL-LOCALE, so read that directly rather than trust the ambient
// context for this one file.
async function resolveLocale(): Promise<AppLocale> {
  const header = (await headers()).get("X-NEXT-INTL-LOCALE");
  const supported: readonly string[] = routing.locales;
  return supported.includes(header ?? "") ? (header as AppLocale) : routing.defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const t = await getTranslations({ locale, namespace: "PageMetadata.notFound" });
  return { title: t("title"), description: t("description") };
}

export default async function NotFound() {
  const locale = await resolveLocale();
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <section className="relative overflow-hidden bg-white">
      <PageContainer className="relative z-10 grid min-h-[60vh] grid-cols-1 items-center gap-12 py-20 tablet:grid-cols-2 tablet:py-28">
        <div>
          <div className="animate-hero-fade-up">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
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
            {t("title")}
          </h1>
          <p
            className="animate-hero-fade-up mt-4 max-w-[440px] text-base leading-relaxed text-muted"
            style={{ animationDelay: "180ms" }}
          >
            {t("description")}
          </p>
          <div
            className="animate-hero-fade-up mt-8 flex flex-wrap gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="/">{t("homeButton")}</Button>
            <Button href="/products" variant="secondary">
              {t("catalogButton")}
            </Button>
          </div>
          <div className="animate-hero-fade-up mt-6" style={{ animationDelay: "300ms" }}>
            <ArrowLink href="/contact">{t("contactLink")}</ArrowLink>
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
      </PageContainer>
    </section>
  );
}
