import { getLocale, getTranslations } from "next-intl/server";
import { HomeCtaSection } from "@/components/sections/HomeCtaSection";
import { AboutVideo } from "@/components/ui/AboutVideo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HeroSlider } from "@/components/ui/HeroSlider";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { StatGrid } from "@/components/ui/StatGrid";
import { PageContainer, SectionHeading } from "@/components/ui/SpecTable";
import { getCatalogIntro, getProductBySlug } from "@/lib/catalog";
import { getProjectsData } from "@/data/projects";
import type { AppLocale } from "@/i18n/routing";
import { HERO_SLIDES } from "@/lib/assets";
import { COMPANY_NAME, HOME_FEATURED_PRODUCTS, getHomeStats } from "@/lib/site";

// Featured products are DB-backed and admin-editable at runtime.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations();
  const projectsData = getProjectsData(locale);
  const featuredProducts = (
    await Promise.all(HOME_FEATURED_PRODUCTS.map((slug) => getProductBySlug(slug, locale)))
  ).filter(Boolean);

  return (
    <>
      <section className="relative bg-heading overflow-hidden min-h-dvh">
        <HeroSlider images={HERO_SLIDES} />
        <PageContainer className="relative z-10 pt-31 pb-16 tablet:pt-42 tablet:pb-22">
          <div className="max-w-[640px]">
            <div className="animate-hero-fade-up inline-block text-[10px] font-bold tracking-[1.1px] uppercase text-primary bg-[#fcf4f5] border border-[#f7e3e5] px-3.5 py-2 rounded-pill mb-7">
              SHANGHAI LIANCHENG (GROUP) CO., LTD.
            </div>
            <h1
              className="animate-hero-fade-up font-heading font-bold text-[clamp(30px,4vw,48px))] leading-[1.12] text-white"
              style={{ animationDelay: "80ms" }}
            >
              {t("Home.heroPrefix")}{" "}
              <span className="text-primary">
                {t("Home.heroHighlight")}
              </span>{" "}
              {t("Home.heroSuffix")}
            </h1>
            <p
              className="animate-hero-fade-up text-[19px] leading-relaxed text-white/85 mt-6 max-w-[560px]"
              style={{ animationDelay: "140ms" }}
            >
              {t("Home.intro")}
            </p>
            <div
              className="animate-hero-fade-up flex gap-4 mt-9 flex-wrap"
              style={{ animationDelay: "200ms" }}
            >
              <Button href="/contact">{t("Common.contactUs")}</Button>
              <Button href="/products">{t("Home.catalogButton")}</Button>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="pt-16 pb-20 tablet:pt-20">
        <StatGrid items={getHomeStats(locale)} columns={5} compact />
      </PageContainer>

      <section className="bg-surface mt-20 border-y border-[#f7eeef]">
        <PageContainer className="py-18">
          <Reveal>
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 items-center">
              <div className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-border-light shadow-card-sm">
                <AboutVideo className="transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
              <div>
                <SectionHeading eyebrow={t("Nav.aboutUs")} title={COMPANY_NAME} />
                <p className="text-base leading-relaxed text-muted mt-4.5">
                  {t("Home.companyParagraph")}
                </p>
                <Button href="/about-us" className="mt-6">
                  {t("Home.aboutButton")}
                </Button>
              </div>
            </div>
          </Reveal>
        </PageContainer>
      </section>

      <PageContainer className="pt-20">
        <Reveal>
          <SectionHeading
            eyebrow={t("Home.productsEyebrow")}
            title={t("Home.catalogTitle")}
            description={getCatalogIntro(locale)}
            center
          />
          <RevealStagger className="grid grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-3 gap-6 mt-10 max-mobile:grid-cols-1">
            {featuredProducts.map(
              (product) =>
                product && <ProductCard key={product.slug} product={product} />
            )}
          </RevealStagger>
          <div className="text-center mt-8">
            <Button href="/products" variant="secondary" arrow>
              {t("Home.wholeCatalogButton")}
            </Button>
          </div>
        </Reveal>
      </PageContainer>

      <PageContainer className="pt-20">
        <Reveal>
          <SectionHeading eyebrow={t("Nav.projects")} title={t("Projects.completedTitle")} />
          <RevealStagger className="grid grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-3 gap-5 mt-8 max-mobile:grid-cols-1">
            {projectsData.featured.slice(0, 6).map((project) => (
              <Card key={project.slug} href={`/project/${project.slug}`}>
                <ProjectImage src={project.image} alt={project.name} aspectRatio="16/10" />
                <div className="p-5.5">
                  <div className="text-xs font-bold tracking-wide uppercase text-primary mb-2">
                    {project.industry}
                  </div>
                  <div className="font-bold text-body leading-snug">{project.name}</div>
                </div>
              </Card>
            ))}
          </RevealStagger>
          <div className="mt-7">
            <ArrowLink href="/projects">{t("Home.allProjectsLink")}</ArrowLink>
          </div>
        </Reveal>
      </PageContainer>

      <Reveal className="pb-20">
        <HomeCtaSection />
      </Reveal>
    </>
  );
}
