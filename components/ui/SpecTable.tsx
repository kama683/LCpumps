import { Link } from "@/i18n/navigation";
import { parseSpecRow } from "@/lib/catalog-helpers";
import { cn } from "@/lib/utils";
import { BreadcrumbChevron } from "./Accordion";
import { Eyebrow } from "./Eyebrow";

interface SpecTableProps {
  specs: string[];
  className?: string;
}

export function SpecTable({ specs, className }: SpecTableProps) {
  if (!specs.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full min-w-115 border-collapse text-[15px]", className)}>
        <tbody>
          {specs.map((spec) => {
            const { key, value } = parseSpecRow(spec);
            return (
              <tr key={spec} className="border-b border-border-light">
                <th className="w-[38%] px-[18px] py-3.5 text-left text-muted font-semibold bg-surface">
                  {key}
                </th>
                <td className="px-[18px] py-3.5 text-body font-semibold">{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({
  items,
  light = false,
}: {
  items: BreadcrumbItem[];
  /** White text — for breadcrumbs sitting on a dark photo overlay. */
  light?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-[13px] mb-3.5", light ? "text-white/80" : "text-subtle")}
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center">
          {index > 0 && <BreadcrumbChevron light={light} />}
          {item.href ? (
            <Link
              href={item.href}
              className={light ? "text-white/80 hover:text-white" : "text-subtle hover:text-primary"}
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageContainer({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-5 tablet:px-8",
        narrow ? "max-w-[800px]" : "max-w-[var(--container-content)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={cn(center && "text-center")}>
      {eyebrow && <Eyebrow className={center ? "mb-2.5" : ""}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-heading font-bold text-heading text-[clamp(26px,3vw,38px)]",
          eyebrow && "mt-2.5"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-[17px] text-muted mt-3.5 leading-relaxed max-w-[680px]",
            center && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
