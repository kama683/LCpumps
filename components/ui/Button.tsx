import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "inline-flex items-center justify-center bg-primary text-white font-bold text-[15px] px-7 py-3.5 rounded-sm shadow-btn no-underline transition-[transform,background,color] duration-200 hover:bg-primary-dark hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  secondary:
    "inline-flex items-center justify-center bg-white text-body font-bold text-[15px] px-7 py-3.5 rounded-sm border border-border-mid no-underline transition-[transform,border-color,color] duration-200 hover:border-primary hover:text-primary active:scale-[0.97]",
  header:
    "inline-flex items-center justify-center bg-primary text-white font-bold text-sm px-5.5 py-3 rounded-sm shadow-none no-underline transition-[transform,background,color] duration-200 hover:bg-primary-dark hover:text-white active:scale-[0.97]",
  white:
    "inline-flex items-center justify-center bg-white text-primary font-bold px-7 py-3.5 rounded-sm shadow-none no-underline transition-[transform,background,color] duration-200 hover:bg-white hover:text-primary-dark active:scale-[0.97]",
} as const;

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  arrow?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  arrow = false,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(variants[variant], arrow && "gap-2", className)}
    >
      {children}
      {arrow && <ArrowRight className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />}
    </Link>
  );
}
