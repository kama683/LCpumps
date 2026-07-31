import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import {
  aboutCertifications,
  aboutClients,
  getAboutAwards,
  getAboutStats,
} from "@/data/content";
import type { AppLocale } from "@/i18n/routing";
import { ASSETS } from "@/lib/assets";
import { getCompanyParagraphs } from "@/lib/catalog-helpers";
import { AboutVideo } from "@/components/ui/AboutVideo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import {
  Breadcrumb,
  PageContainer,
  SectionHeading,
} from "@/components/ui/SpecTable";
import { Reveal } from "@/components/ui/Reveal";
import { StatGrid } from "@/components/ui/StatGrid";
import { COMPANY_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "О компании",
};

export default async function AboutPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations();
  const company = getCompanyParagraphs(locale);
  const cert = company[6] ?? "";
  const service = company[5] ?? "";
  const clients = company[9] ?? "";

  return (
    <>
      <section className="relative bg-white overflow-hidden">
        <PageContainer className="relative z-10 py-12 pb-14">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: t("Nav.aboutUs") }]}
          />
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border-light shadow-card-sm mt-7">
            <AboutVideo />
          </div>

          <div className="mt-10">
            <h1 className="font-heading font-bold text-[clamp(32px,4.2vw,48px)] text-heading leading-tight">
              {t("AboutUs.title")}
            </h1>
            {(t.raw("AboutUs.intro") as string[]).map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={cn("text-[17px] leading-relaxed text-muted", index === 0 ? "mt-6" : "mt-5")}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-surface border-y border-[#f7eeef] py-14">
        <PageContainer>
          <StatGrid items={getAboutStats(locale)} />
        </PageContainer>
      </section>

      <PageContainer className="pt-16">
        <Reveal>
          <h2 className="font-heading font-bold text-[clamp(26px,3vw,34px)] text-heading">
            {t("AboutUs.certificationsTitle")}
          </h2>
          <p className="text-base leading-relaxed text-muted mt-4.5 max-w-[960px]">
            {cert}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {aboutCertifications.map((item) => (
              <span
                key={item}
                className="inline-block bg-white text-muted text-sm font-semibold px-4.5 py-2.5 rounded-pill border border-border-mid transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-base leading-relaxed text-muted mt-8">
            {t("AboutUs.awardsIntro")}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {getAboutAwards(locale).map((item) => (
              <span
                key={item}
                className="inline-block bg-pill-blue-bg text-primary text-sm font-semibold px-4.5 py-2.5 rounded-pill transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>
          <ArrowLink href="/about-us/certifications" className="mt-8">
            {t("AboutUs.certificationsLink")}
          </ArrowLink>
        </Reveal>
      </PageContainer>

      <PageContainer className="pt-18 text-center">
        <Reveal>
          <h2 className="font-heading font-bold text-[clamp(24px,3vw,32px)] text-heading">
            {t("AboutUs.clientsTitle")}
          </h2>
          <p className="text-base leading-relaxed text-muted mt-4 max-w-[720px] mx-auto">
            {clients}
          </p>
          <div className="flex flex-wrap justify-center items-end gap-x-12 gap-y-10 mt-12">
            {aboutClients.map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center gap-3.5 min-w-[110px] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={48}
                  className="h-11 w-auto max-w-[130px] object-contain opacity-55 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
                />
                <span className="font-heading font-bold text-lg text-muted-light">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </PageContainer>

      <PageContainer className="py-18 pb-20">
        <Reveal>
          <div className="bg-gradient-to-br from-surface-alt to-[#f8e4e6] border border-[#f2d8db] rounded-3xl p-7 tablet:p-12 tablet:px-14 grid grid-cols-1 tablet:grid-cols-[1.1fr_0.9fr] gap-8 tablet:gap-10 items-center max-tablet:text-center">
            <div>
              <h2 className="font-heading font-bold text-[clamp(24px,3vw,32px)] text-heading leading-tight">
                {COMPANY_NAME}
              </h2>
              <p className="text-base leading-relaxed text-muted mt-4">{service}</p>
              <p className="text-[15px] leading-snug text-muted-light mt-3">
                {t("Common.headquartersNote")}
              </p>
              <Button href="/contact" className="mt-7 max-tablet:mx-auto">
                {t("Common.contactUs")}
              </Button>
            </div>
            <div className="relative flex items-center justify-center max-tablet:order-first">
              <div
                aria-hidden
                className="hero-blueprint-grid absolute left-1/2 top-1/2 aspect-square w-[min(420px,90%)] -translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src={ASSETS.heroPump.src}
                alt="LCPumps industrial pump technical illustration"
                width={ASSETS.heroPump.width}
                height={ASSETS.heroPump.height}
                className="relative z-1 w-[min(420px,100%)] h-auto object-contain opacity-90"
              />
            </div>
          </div>
        </Reveal>
      </PageContainer>

      <PageContainer className="pb-16">
        <Reveal>
          <SectionHeading title={t("AboutUs.sectionsTitle")} />
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mt-8">
            {(
              [
                "our-company",
                "innovation",
                "history",
                "sustainability",
                "production",
                "certifications",
              ] as const
            ).map((slug) => (
              <Link
                key={slug}
                href={`/about-us/${slug}`}
                className="group flex items-center justify-between gap-3 p-5 border border-border rounded-xl text-body font-bold hover:border-primary hover:text-primary no-underline transition-colors"
              >
                <span>{t(`AboutUs.subnav.${slug}`)}</span>
                <ChevronRight
                  className="size-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </PageContainer>
    </>
  );
}
