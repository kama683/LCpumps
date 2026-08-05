"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Matches the duration of .animate-modal-panel-out below (the longer of the
// two exit animations) so the real unmount lands right as it finishes.
const EXIT_DURATION_MS = 180;

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [closing, setClosing] = useState(false);
  // The Escape handler below is registered once (mount-only effect), so it
  // closes over a stale `closing` state forever. A ref survives that closure
  // and guards against Escape/backdrop/button firing requestClose twice.
  const closingRef = useRef(false);

  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      onClose();
      return;
    }
    setClosing(true);
    setTimeout(onClose, EXIT_DURATION_MS);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable?.[0] ?? dialogRef.current)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-footer/60 p-4",
        closing ? "animate-modal-scrim-out" : "animate-modal-scrim-in"
      )}
      onMouseDown={(e) => {
        if (!dialogRef.current?.contains(e.target as Node)) requestClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "flex max-h-[90vh] w-full max-w-140 flex-col overflow-hidden rounded-2xl bg-white shadow-card",
          closing ? "animate-modal-panel-out" : "animate-modal-panel-in"
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border-light px-6 py-4.5">
          <h2 id={titleId} className="font-heading text-lg font-bold text-heading">
            {title}
          </h2>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Закрыть"
            className="flex size-8 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-muted transition-colors hover:bg-surface hover:text-primary"
          >
            <X className="size-4.5" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
