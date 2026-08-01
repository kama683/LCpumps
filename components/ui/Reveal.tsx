"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export const REVEAL_TRANSITION = "transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms, applied via inline style. */
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        REVEAL_TRANSITION,
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
