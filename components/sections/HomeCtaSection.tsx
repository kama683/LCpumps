import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/SpecTable";
import { ASSETS } from "@/lib/assets";

export function HomeCtaSection() {
  const t = useTranslations("HomeCta");

  return (
    <PageContainer className="pt-20">
      <div className="bg-gradient-to-br from-surface-alt to-[#f9e8ea] border border-[#f2d8db] rounded-3xl overflow-hidden grid grid-cols-1 tablet:grid-cols-2 items-center gap-8 p-10 tablet:px-16 tablet:py-14 max-tablet:text-center">
        <div>
          <h2 className="font-heading font-bold text-[clamp(26px,3vw,34px)] text-heading leading-tight">
            {t("title")}
          </h2>
          <p className="text-base leading-relaxed text-muted mt-4 max-w-[440px] max-tablet:mx-auto">
            {t("description")}
          </p>
          <Button href="/contact" className="mt-7 max-tablet:mx-auto">
            {t("button")}
          </Button>
        </div>
        <div className="relative flex items-center justify-center max-tablet:order-first">
          <div
            aria-hidden
            className="hero-blueprint-grid absolute left-1/2 top-1/2 aspect-square w-[min(420px,90%)] -translate-x-1/2 -translate-y-1/2"
          />
          <Image
            src={ASSETS.heroPump.src}
            alt={ASSETS.pump.alt}
            width={ASSETS.heroPump.width}
            height={ASSETS.heroPump.height}
            className="relative z-1 w-[min(420px,100%)] h-auto object-contain opacity-90"
          />
        </div>
      </div>
    </PageContainer>
  );
}
