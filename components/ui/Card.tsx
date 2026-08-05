import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface CardProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ href, children, className }: CardProps) {
  const classes = cn(
    "bg-white border border-border rounded-xl overflow-hidden transition-[box-shadow,transform] duration-200",
    href && "group block hover:shadow-card hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
