"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  wrapperClassName?: string;
}

export function SearchField({
  className,
  wrapperClassName,
  "aria-label": ariaLabel,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-subtle"
        strokeWidth={2}
        aria-hidden
      />
      <input
        type="search"
        aria-label={ariaLabel ?? placeholder}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border border-border-mid bg-white py-3 pl-10 pr-4 text-sm text-body focus:border-primary focus:shadow-[0_0_0_3px_rgba(247,6,32,0.12)] focus:outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
