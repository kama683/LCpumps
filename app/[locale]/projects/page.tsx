import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getProjectsData } from "@/data/projects";
import type { AppLocale } from "@/i18n/routing";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BulletList } from "@/components/ui/BulletList";
import { Card } from "@/components/ui/Card";
import { HeroBgImage } from "@/components/ui/HeroBgImage";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { Breadcrumb, PageContainer, SectionHeading } from "@/components/ui/SpecTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PageMetadata.projects" });
  return { title: t("title"), description: t("description") };
}

export default async function ProjectsPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations();
  const projectsData = getProjectsData(locale);

  return (
    <>
      <section className="relative bg-white overflow-hidden">
        <HeroBgImage variant="page" />
        <PageContainer className="relative z-10 pt-12 pb-6">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: t("Nav.projects") }]}
          />
          <SectionHeading
            eyebrow={t("Nav.projects")}
            title={t("Projects.completedTitle")}
            description={projectsData.heroIntro}
          />
        </PageContainer>
      </section>

      <PageContainer className="pb-12">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-7 [&>*:last-child:nth-child(odd)]:tablet:col-span-2 [&>*:last-child:nth-child(odd)]:tablet:mx-auto [&>*:last-child:nth-child(odd)]:tablet:max-w-[calc(50%-14px)]">
          {projectsData.featured.map((project) => (
            <Card key={project.slug} href={`/project/${project.slug}`}>
              <ProjectImage src={project.image} alt={project.name} />
              <div className="p-7 pb-7.5 flex flex-col flex-1">
                <div className="text-xs font-bold tracking-wide uppercase text-primary mb-2">
                  {project.industry}
                </div>
                <h3 className="font-heading font-bold text-xl text-heading leading-snug">
                  {project.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted mt-3 flex-1">
                  {project.short}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>

      <section className="bg-surface border-y border-[#f7eeef]">
        <PageContainer className="py-16">
          <Reveal>
            <h2 className="font-heading font-bold text-[clamp(26px,3vw,34px)] text-heading">
              {t("Projects.industriesTitle")}
            </h2>
            <RevealStagger className="grid grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-3 gap-6 mt-8 max-mobile:grid-cols-1">
              {projectsData.industries.map((industry) => (
                <div
                  key={industry.id}
                  className="bg-white border border-border rounded-xl p-7 hover:shadow-card-sm hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200"
                >
                  <h3 className="font-heading font-bold text-xl text-heading">
                    {industry.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted mt-3">
                    {industry.intro}
                  </p>
                  <BulletList items={industry.items} className="mt-4" />
                </div>
              ))}
            </RevealStagger>
          </Reveal>
        </PageContainer>
      </section>

      <PageContainer className="py-16 pb-20">
        <Reveal>
          <h2 className="font-heading font-bold text-2xl text-heading mb-6">
            {t("Projects.otherSitesTitle")}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {projectsData.compact.map((name) => (
              <span
                key={name}
                className="inline-block px-4 py-2.5 rounded-pill border border-border-mid bg-white text-[13px] font-semibold text-muted transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <ArrowLink href="/contact">{t("Projects.discussButton")}</ArrowLink>
          </div>
        </Reveal>
      </PageContainer>
    </>
  );
}
