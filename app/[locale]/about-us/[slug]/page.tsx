import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAboutSubpages, getGenericAboutMessage } from "@/data/content";
import type { AppLocale } from "@/i18n/routing";
import { getCompanyParagraphs } from "@/lib/catalog-helpers";
import { Button } from "@/components/ui/Button";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";

const PRIMARY_SUBPAGE_SLUGS = getAboutSubpages("ru").map((p) => p.slug);

function getExtraPageContent(slug: string, locale: AppLocale): string | null {
  const company = getCompanyParagraphs(locale);
  switch (slug) {
    case "production":
      return company[3] ?? "";
    case "certifications":
      return company[6] ?? "";
    case "careers":
    case "media-relations":
    case "investor-relations":
    case "our-divisions":
      return getGenericAboutMessage(locale);
    default:
      return null;
  }
}

const EXTRA_PAGE_SLUGS = [
  "production",
  "certifications",
  "careers",
  "media-relations",
  "investor-relations",
  "our-divisions",
];

interface AboutSubPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = [...PRIMARY_SUBPAGE_SLUGS, ...EXTRA_PAGE_SLUGS];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AboutSubPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (PRIMARY_SUBPAGE_SLUGS.includes(slug)) {
    const t = await getTranslations({ locale, namespace: "AboutUs.subnav" });
    return { title: t(slug as Parameters<typeof t>[0]) };
  }
  if (EXTRA_PAGE_SLUGS.includes(slug)) {
    const t = await getTranslations({ locale, namespace: "AboutSubPage.extraPages" });
    return { title: t(slug as Parameters<typeof t>[0]) };
  }
  const t = await getTranslations({ locale, namespace: "Nav" });
  return { title: t("aboutUs") };
}

export default async function AboutSubPage({ params }: AboutSubPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const appLocale = locale as AppLocale;
  const sub = getAboutSubpages(appLocale).find((p) => p.slug === slug);
  const extraContent = !sub ? getExtraPageContent(slug, appLocale) : null;

  if (!sub && extraContent === null) notFound();

  const title = sub
    ? t(`AboutUs.subnav.${slug}` as Parameters<typeof t>[0])
    : t(`AboutSubPage.extraPages.${slug}` as Parameters<typeof t>[0]);
  const paragraphs = sub?.paragraphs ?? [extraContent!];

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white">
        <PageContainer className="py-14 pb-6">
          <Breadcrumb
            items={[
              { label: t("Common.home"), href: "/" },
              { label: t("Nav.aboutUs"), href: "/about-us" },
              { label: title },
            ]}
          />
          <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-primary mt-6">
            {t("Nav.aboutUs")}
          </div>
          <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] text-heading mt-2.5 leading-tight">
            {title}
          </h1>
        </PageContainer>
      </section>
      <PageContainer className="py-6 pb-20">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 60)}
            className="text-base leading-relaxed text-muted mb-5"
          >
            {paragraph}
          </p>
        ))}
        {!sub && (
          <Button href="/about-us" className="mt-4">
            {t("AboutSubPage.button")}
          </Button>
        )}
        <div className="mt-10">
          <Link href="/about-us" className="font-bold text-primary">
            {t("AboutSubPage.backLink")}
          </Link>
        </div>
      </PageContainer>
    </>
  );
}
