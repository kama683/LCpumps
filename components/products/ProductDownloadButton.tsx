"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SpecTable } from "@/components/ui/SpecTable";
import { cn } from "@/lib/utils";

interface ProductDownloadButtonProps {
  slug: string;
  code: string;
  name: string;
  showModel: boolean;
  imageSrc: string;
  imageAlt: string;
  description: string[];
  specs: string[];
  className?: string;
}

// A4 in mm, with a print-safe margin.
const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const MARGIN_MM = 12;

export function ProductDownloadButton({
  slug,
  code,
  name,
  showModel,
  imageSrc,
  imageAlt,
  description,
  specs,
  className,
}: ProductDownloadButtonProps) {
  const t = useTranslations("ProductDetail");
  const captureRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const node = captureRef.current;
      if (!node) return;

      const img = node.querySelector("img");
      if (img && !img.complete) {
        await new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      }
      await document.fonts.ready;

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const contentWidthMM = PAGE_WIDTH_MM - MARGIN_MM * 2;
      const contentHeightMM = PAGE_HEIGHT_MM - MARGIN_MM * 2;
      const imgWidthMM = contentWidthMM;
      const imgHeightMM = (canvas.height * imgWidthMM) / canvas.width;
      // JPEG, not PNG: jsPDF embeds PNG canvas data as an uncompressed raw
      // bitmap (a single product card came out to ~9MB), while JPEG goes
      // through DCTDecode and lands under 1MB at this quality with no
      // visible loss on this mostly-text-and-photo content.
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      const pdf = new jsPDF("p", "mm", "a4");
      let heightLeft = imgHeightMM;
      let position = MARGIN_MM;

      pdf.addImage(imgData, "JPEG", MARGIN_MM, position, imgWidthMM, imgHeightMM);
      heightLeft -= contentHeightMM;

      while (heightLeft > 0) {
        position = MARGIN_MM - (imgHeightMM - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", MARGIN_MM, position, imgWidthMM, imgHeightMM);
        heightLeft -= contentHeightMM;
      }

      pdf.save(`${showModel ? code : slug}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className={cn(
          "inline-flex items-center justify-center gap-2 bg-white text-body font-bold text-[15px] px-5.5 py-3 rounded-sm border border-border-mid no-underline transition-[border-color,color] duration-200 hover:border-primary hover:text-primary disabled:opacity-60 disabled:cursor-not-allowed shrink-0",
          className
        )}
      >
        {isGenerating ? (
          <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
        ) : (
          <Image
            src="/assets/pdfICON.png"
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0 object-contain"
            aria-hidden
          />
        )}
        {isGenerating ? t("downloading") : t("download")}
      </button>

      {/* Off-screen copy of the card, captured with html2canvas. Kept
          separate from the visible page so the PDF never picks up the
          header, nav, breadcrumbs, or the button itself. Fixed pixel sizes
          throughout (no clamp/vw) so the output doesn't depend on the
          viewport width at the moment the button is clicked. */}
      <div
        aria-hidden
        style={{ position: "fixed", top: 0, left: -10000, width: 820 }}
      >
        <div ref={captureRef} className="bg-white p-10">
          {showModel && (
            <div className="text-xs font-bold tracking-wide uppercase text-primary mb-2">
              {code}
            </div>
          )}
          <h1 className="font-heading font-bold text-[32px] text-heading leading-tight">
            {name}
          </h1>

          <div className="grid grid-cols-2 gap-12 items-start mt-8">
            <div
              className="relative bg-white overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl text-heading">
                {t("description")}
              </h2>
              {description.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 50)}
                  className="text-base leading-relaxed text-muted mt-3.5"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <h2 className="font-heading font-bold text-[28px] text-heading mt-10 mb-5">
            {t("specsHeading")}
          </h2>
          <SpecTable specs={specs} />
        </div>
      </div>
    </>
  );
}
