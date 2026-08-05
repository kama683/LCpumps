import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  BRAND,
  CATALOG_NAV,
  COMPANY_NAME,
  LOGO_PATH,
} from "@/lib/site";

const CONTACT_EMAIL = "lcpumpskz@gmail.com";
const CONTACT_PHONE = "+7 771 778 68 77";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tCatalogNav = useTranslations("CatalogNav");

  return (
    <footer className="bg-footer text-footer-text">
      <div className="max-w-[var(--container-content)] mx-auto px-5 tablet:px-8 pt-12 tablet:pt-16 pb-10">
        <div className="grid grid-cols-1 tablet:grid-cols-5 gap-10">
          <div className="tablet:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src={LOGO_PATH}
                alt={BRAND}
                width={44}
                height={44}
                className="object-contain bg-white rounded-sm p-1"
              />
              <span className="font-heading font-bold text-lg text-white">
                {BRAND}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-footer-muted mt-4 max-w-xs">
              {COMPANY_NAME}
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-bold tracking-wide uppercase text-white mb-4">
              {t("navigationHeading")}
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <FooterLink href="/">{tNav("home")}</FooterLink>
              <FooterLink href="/about-us">{tNav("aboutUs")}</FooterLink>
              <FooterLink href="/products">{tNav("catalog")}</FooterLink>
              <FooterLink href="/projects">{tNav("projects")}</FooterLink>
              <FooterLink href="/about-us/certifications">{t("certifications")}</FooterLink>
            </div>
          </div>

          <div className="tablet:col-span-2">
            <h4 className="text-[13px] font-bold tracking-wide uppercase text-white mb-4">
              {t("productsHeading")}
            </h4>
            <div className="grid grid-cols-2 max-mobile:grid-cols-1 gap-x-6 gap-y-2.5 text-sm">
              {CATALOG_NAV.map((item) => {
                const href =
                  item.category === "pumps" && item.page === "/products"
                    ? `${item.page}#${item.id}`
                    : item.page;
                const labelKey = item.id === "valves" ? "valvesFooterLabel" : item.id;

                return (
                  <FooterLink key={item.id} href={href}>
                    {tCatalogNav(labelKey)}
                  </FooterLink>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold tracking-wide uppercase text-white mb-4">
              {t("contactsHeading")}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-footer-link leading-relaxed">
              <span>{COMPANY_NAME}</span>
              <span className="inline-flex items-start gap-2">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
                {t("address")}
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-start gap-2 text-footer-link hover:text-primary no-underline"
              >
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="inline-flex items-start gap-2 text-footer-link hover:text-primary no-underline"
              >
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
                {CONTACT_PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#33434d] mt-11 pt-5 text-[13px] text-footer-muted">
          <span>© {COMPANY_NAME} {t("rightsReserved")}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-footer-link hover:text-primary no-underline">
      {children}
    </Link>
  );
}
