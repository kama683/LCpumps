import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, getProjectSlugs, getProjectsData } from "@/data/projects";
import type { AppLocale } from "@/i18n/routing";
import { getProductsBySlugs } from "@/lib/catalog";
import { ProjectEquipmentSection } from "@/components/projects/ProjectEquipmentSection";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";
import { cn } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Equipment products are DB-backed and admin-editable at runtime.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale as AppLocale);
  if (project) return { title: project.name };
  const t = await getTranslations({ locale, namespace: "Nav" });
  return { title: t("projects") };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const appLocale = locale as AppLocale;
  const projectsData = getProjectsData(appLocale);
  const project = getProjectBySlug(slug, appLocale);
  if (!project) notFound();

  const index = projectsData.featured.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projectsData.featured[index - 1] : null;
  const next =
    index < projectsData.featured.length - 1
      ? projectsData.featured[index + 1]
      : null;
  const equipmentProducts = await getProductsBySlugs(project.equipmentSlugs, appLocale);

  return (
    <>
      <PageContainer className="pt-12">
        <Breadcrumb
          items={[
            { label: t("Common.home"), href: "/" },
            { label: t("Nav.projects"), href: "/projects" },
            { label: project.name },
          ]}
        />
        <div className="text-xs font-bold tracking-wide uppercase text-primary mb-3">
          {project.industry}
        </div>
        <h1 className="font-heading font-bold text-[clamp(32px,4vw,44px)] text-heading leading-tight max-w-[900px]">
          {project.name}
        </h1>
        {project.location && (
          <p className="text-base text-muted mt-3">{project.location}</p>
        )}
      </PageContainer>

      <PageContainer className="pt-8 pb-20">
        <div className="grid grid-cols-1 tablet:grid-cols-[1fr_300px] gap-12 items-start">
          <div>
            <ProjectImage
              src={project.image}
              alt={project.name}
              aspectRatio="21/9"
              className="rounded-2xl border border-border-light"
            />
            <p className="text-base leading-relaxed text-muted mt-8">
              {project.description}
            </p>

            <div className="bg-surface border border-[#f7eeef] rounded-2xl p-9 mt-10">
              <h2 className="font-heading font-bold text-[22px] text-heading mb-6">
                {t("ProjectDetail.infoTitle")}
              </h2>
              <dl className="grid grid-cols-1 tablet:grid-cols-2 gap-7 tablet:gap-x-10">
                {project.location && (
                  <InfoItem label={t("ProjectDetail.location")} value={project.location} />
                )}
                <InfoItem label={t("ProjectDetail.industry")} value={project.industry} />
                <InfoItem label={t("ProjectDetail.features")} value={project.features} full />
                <InfoItem label={t("ProjectDetail.tasks")} value={project.tasks} full />
                <InfoItem
                  label={t("ProjectDetail.benefits")}
                  value={project.benefits}
                  full
                />
              </dl>
            </div>

            <ProjectEquipmentSection
              description={project.equipment}
              products={equipmentProducts}
            />

            <nav className="flex flex-col tablet:flex-row justify-between gap-5 mt-16 pt-8 border-t border-border-light">
              {prev ? (
                <Link
                  href={`/project/${prev.slug}`}
                  className="flex flex-col gap-1.5 font-bold text-body p-5 border border-border-mid rounded-lg flex-1 max-w-full tablet:max-w-[48%] hover:border-primary hover:text-primary hover:shadow-[0_8px_20px_rgba(38,51,60,0.06)] no-underline transition-all"
                >
                  <span className="text-xs font-semibold text-subtle uppercase tracking-wide">
                    {t("ProjectDetail.previous")}
                  </span>
                  {prev.name}
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <Link
                  href={`/project/${next.slug}`}
                  className="flex flex-col gap-1.5 font-bold text-body p-5 border border-border-mid rounded-lg flex-1 max-w-full tablet:max-w-[48%] text-right items-end hover:border-primary hover:text-primary hover:shadow-[0_8px_20px_rgba(38,51,60,0.06)] no-underline transition-all"
                >
                  <span className="text-xs font-semibold text-subtle uppercase tracking-wide">
                    {t("ProjectDetail.next")}
                  </span>
                  {next.name}
                </Link>
              ) : null}
            </nav>
          </div>

          <aside className="tablet:sticky tablet:top-[88px]">
            <h2 className="font-heading font-bold text-lg text-heading mb-4.5">
              {t("ProjectDetail.otherProjects")}
            </h2>
            {projectsData.featured.map((item) => (
              <Link
                key={item.slug}
                href={`/project/${item.slug}`}
                className={cn(
                  "flex gap-3.5 p-3.5 rounded-lg border border-border-light bg-white mb-3 transition-all no-underline hover:shadow-card-sm hover:-translate-y-0.5 hover:border-[#f2d8db]",
                  item.slug === slug &&
                    "bg-surface-alt border-[#f2d8db] pointer-events-none"
                )}
              >
                <div className="w-[68px] h-[52px] shrink-0 rounded-sm overflow-hidden relative bg-surface">
                  <ProjectImage
                    src={item.image}
                    alt={item.name}
                    aspectRatio="68/52"
                    className="h-full w-full"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-heading leading-snug">
                    {item.name}
                  </div>
                  <div className="text-xs leading-snug text-muted mt-1">
                    {item.industry}
                  </div>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </PageContainer>
    </>
  );
}

function InfoItem({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "tablet:col-span-2" : undefined}>
      <dt className="text-xs font-bold tracking-wide uppercase text-primary mb-2">
        {label}
      </dt>
      <dd className="text-[15px] leading-relaxed text-muted">{value}</dd>
    </div>
  );
}
