import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Breadcrumb, PageContainer } from "@/components/ui/SpecTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PageMetadata.news" });
  return { title: t("title"), description: t("description") };
}

export default function NewsPage() {
  const t = useTranslations();

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white">
        <PageContainer className="py-14 pb-6">
          <Breadcrumb
            items={[{ label: t("Common.home"), href: "/" }, { label: t("News.label") }]}
          />
          <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-primary mt-6">
            {t("News.label")}
          </div>
          <h1 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] text-heading mt-2.5 leading-tight">
            {t("News.title")}
          </h1>
        </PageContainer>
      </section>
      <PageContainer className="py-6 pb-20">
        <p className="text-base leading-relaxed text-muted">
          {t("News.body")}
        </p>
      </PageContainer>
    </>
  );
}
