"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface StatGridItem {
  value: string;
  label: string;
}

const STAGGER_STEP_MS = 60;
const STAGGER_CAP = 8;
const COUNT_UP_DURATION_MS = 900;

function parseLeadingNumber(raw: string) {
  const match = raw.match(/^(-?[\d\s.,]*\d)([\s\S]*)$/);
  if (!match) return null;
  const numStr = match[1];
  const suffix = match[2];
  const target = Number.parseInt(numStr.replace(/[\s.,]/g, ""), 10);
  if (Number.isNaN(target)) return null;
  return { target, suffix, numStr };
}

function formatGrouped(n: number, sample: string): string {
  const sepMatch = sample.match(/[^\d]/);
  const sep = sepMatch ? sepMatch[0] : "";
  const digits = Math.round(n).toString();
  if (!sep) return digits;
  const parts: string[] = [];
  for (let i = digits.length; i > 0; i -= 3) {
    parts.unshift(digits.slice(Math.max(0, i - 3), i));
  }
  return parts.join(sep);
}

function StatValue({
  value,
  inView,
  className,
}: {
  value: string;
  inView: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const parsed = parseLeadingNumber(value);
    if (!parsed) return;

    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / COUNT_UP_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (t >= 1) {
        setDisplay(value);
        return;
      }
      const current = Math.round(parsed.target * eased);
      setDisplay(formatGrouped(current, parsed.numStr) + parsed.suffix);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div className={cn("tabular-nums", className)}>{display}</div>
  );
}

export function StatGrid({
  items,
  columns = 4,
  compact = false,
}: {
  items: StatGridItem[];
  columns?: 4 | 5;
  compact?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-px bg-stat-grid border border-stat-grid rounded-2xl overflow-hidden",
        columns === 5
          ? "grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-5 max-mobile:grid-cols-1"
          : "grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-4 max-mobile:grid-cols-1",
        compact && "grid-cols-1 max-tablet:grid-cols-2 tablet:grid-cols-5 max-mobile:grid-cols-1"
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          style={{
            transitionDelay: `${Math.min(index, STAGGER_CAP) * STAGGER_STEP_MS}ms`,
          }}
          className={cn(
            "bg-white transition-[opacity,transform] duration-[420ms] ease-(--ease-entrance)",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            compact ? "px-[18px] py-5.5 text-center" : "px-6 py-7"
          )}
        >
          <StatValue
            value={item.value}
            inView={inView}
            className={cn(
              "font-heading font-bold text-primary leading-none",
              compact ? "text-[28px]" : "text-4xl"
            )}
          />
          <div
            className={cn(
              "text-muted mt-2.5 leading-snug",
              compact ? "text-[13px] font-semibold text-muted-light" : "text-sm"
            )}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
