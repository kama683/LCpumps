"use client";

import { useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function useAnimatedDetails() {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleSummaryClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!open) {
      detailsRef.current?.setAttribute("open", "");
      requestAnimationFrame(() => setOpen(true));
    } else {
      setOpen(false);
    }
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "grid-template-rows") return;
    if (!open) {
      detailsRef.current?.removeAttribute("open");
    }
  };

  return { open, detailsRef, handleSummaryClick, handleTransitionEnd };
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ title, children, className }: AccordionItemProps) {
  const { open, detailsRef, handleSummaryClick, handleTransitionEnd } =
    useAnimatedDetails();

  return (
    <details
      ref={detailsRef}
      className={cn(
        "group bg-white border border-border rounded-lg px-6 py-5 mb-3.5",
        className
      )}
    >
      <summary
        onClick={handleSummaryClick}
        className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[17px] text-body transition-opacity active:opacity-60 [&::-webkit-details-marker]:hidden"
      >
        <span>{title}</span>
        <ChevronDown
          className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
          strokeWidth={2.25}
          aria-hidden
        />
      </summary>
      <div
        onTransitionEnd={handleTransitionEnd}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-(--ease-entrance)",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="text-[15px] leading-relaxed text-muted mt-3.5">{children}</div>
        </div>
      </div>
    </details>
  );
}

export function AccordionDetails({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { open, detailsRef, handleSummaryClick, handleTransitionEnd } =
    useAnimatedDetails();

  return (
    <details
      ref={detailsRef}
      className={cn(
        "group bg-white border border-border-mid rounded-lg overflow-hidden mt-5",
        className
      )}
    >
      <summary
        onClick={handleSummaryClick}
        className="flex cursor-pointer list-none items-center justify-between gap-4 px-5.5 py-4.5 font-bold text-[15px] text-body transition-opacity active:opacity-60 [&::-webkit-details-marker]:hidden"
      >
        <span>{title}</span>
        <ChevronDown
          className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
          strokeWidth={2.25}
          aria-hidden
        />
      </summary>
      <div
        onTransitionEnd={handleTransitionEnd}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-(--ease-entrance)",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5.5 pb-5.5">{children}</div>
        </div>
      </div>
    </details>
  );
}

export function BreadcrumbChevron({ light = false }: { light?: boolean }) {
  return (
    <ChevronRight
      className={cn(
        "mx-1.5 inline size-3.5 align-middle",
        light ? "text-white/70" : "text-subtle"
      )}
      strokeWidth={2}
      aria-hidden
    />
  );
}
