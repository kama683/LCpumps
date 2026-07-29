import { useTranslations } from "next-intl";
import type { PumpDimensionRow } from "@/data/pump-dimensions";
import { pumpDimensionGroups } from "@/data/pump-dimensions";
import { cn } from "@/lib/utils";

const DIMENSION_COLUMNS = [
  "B1",
  "B2",
  "B",
  "H",
  "h0",
  "h",
  "h1",
  "h2",
  "H1",
  "L",
  "L0",
  "L3",
  "L4",
  "P",
  "L5",
  "t",
] as const;

// Columns whose repeated values are merged (rowSpan) across a series group in
// the source drawing — only these are ever spanned, everything else always
// renders per row even if values happen to repeat.
const MERGED_COLUMNS = [
  "B1",
  "B2",
  "B",
  "H",
  "h0",
  "h",
  "h1",
  "h2",
  "H1",
  "L3",
  "L4",
  "P",
  "t",
] as const;

type MergedColumn = (typeof MERGED_COLUMNS)[number] | "nd" | "baseWeight";

const CELL = "px-2 py-2 text-center whitespace-nowrap";
const HEAD_CELL =
  "px-2 py-2 text-center whitespace-nowrap font-bold text-[11px] tracking-wide text-nav uppercase";

function computeSpans(rows: PumpDimensionRow[], key: MergedColumn): number[] {
  const spans: number[] = new Array(rows.length).fill(0);
  let i = 0;
  while (i < rows.length) {
    let j = i + 1;
    while (j < rows.length && rows[j][key as keyof PumpDimensionRow] === rows[i][key as keyof PumpDimensionRow]) {
      j++;
    }
    spans[i] = j - i;
    i = j;
  }
  return spans;
}

export function PumpDimensionsTable() {
  const t = useTranslations("PumpTable");

  return (
    <div className="rounded-xl border border-[#e8cfd2] bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12px] text-body min-w-245">
          <thead>
            <tr className="bg-surface-alt border-b border-[#e8cfd2]">
              <th className={cn(HEAD_CELL, "text-left")} rowSpan={2}>
                {t("pumpSeries")}
              </th>
              <th className={cn(HEAD_CELL, "text-left")} rowSpan={2}>
                {t("motorModel")}
              </th>
              <th className={HEAD_CELL} rowSpan={2}>
                {t("power")}
                <br />
                {t("powerUnit")}
              </th>
              <th className={HEAD_CELL} colSpan={DIMENSION_COLUMNS.length}>
                {t("installDimensions")}
              </th>
              <th className={HEAD_CELL} rowSpan={2}>
                {t("mounting")}
                <br />
                n-d
              </th>
              <th className={HEAD_CELL} rowSpan={2}>
                {t("motorWeight")}
                <br />
                {t("motorWeightUnit")}
              </th>
              <th className={HEAD_CELL} rowSpan={2}>
                {t("baseWeight")}
                <br />
                {t("baseWeightUnit")}
              </th>
            </tr>
            <tr className="bg-surface-alt border-b border-[#e8cfd2]">
              {DIMENSION_COLUMNS.map((col) => (
                <th key={col} className={HEAD_CELL}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pumpDimensionGroups.map((group, groupIndex) => (
              <FragmentGroup
                key={group.series}
                series={group.series}
                rows={group.rows}
                alt={groupIndex % 2 === 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FragmentGroup({
  series,
  rows,
  alt,
}: {
  series: string;
  rows: PumpDimensionRow[];
  alt: boolean;
}) {
  const spans = {
    B1: computeSpans(rows, "B1"),
    B2: computeSpans(rows, "B2"),
    B: computeSpans(rows, "B"),
    H: computeSpans(rows, "H"),
    h0: computeSpans(rows, "h0"),
    h: computeSpans(rows, "h"),
    h1: computeSpans(rows, "h1"),
    h2: computeSpans(rows, "h2"),
    H1: computeSpans(rows, "H1"),
    L3: computeSpans(rows, "L3"),
    L4: computeSpans(rows, "L4"),
    P: computeSpans(rows, "P"),
    t: computeSpans(rows, "t"),
    nd: computeSpans(rows, "nd"),
    baseWeight: computeSpans(rows, "baseWeight"),
  };

  const mergedCell = (
    key: keyof typeof spans,
    rowIndex: number,
    value: string | number
  ) => {
    const span = spans[key][rowIndex];
    if (span === 0) return null;
    return (
      <td className={cn(CELL, alt && "bg-surface/60")} rowSpan={span}>
        {value}
      </td>
    );
  };

  return (
    <>
      {rows.map((row, rowIndex) => (
        <tr
          key={row.motorModel}
          className={cn(
            "border-b border-border-light",
            alt && "bg-surface/60",
            rowIndex === 0 && "border-t border-t-[#e8cfd2]"
          )}
        >
          {rowIndex === 0 && (
            <td
              className={cn(CELL, "text-left font-bold text-heading bg-[#fbeeef] align-middle")}
              rowSpan={rows.length}
            >
              {series}
            </td>
          )}
          <td className={cn(CELL, "text-left font-semibold text-heading")}>
            {row.motorModel}
          </td>
          <td className={CELL}>{row.power}</td>
          {mergedCell("B1", rowIndex, row.B1)}
          {mergedCell("B2", rowIndex, row.B2)}
          {mergedCell("B", rowIndex, row.B)}
          {mergedCell("H", rowIndex, row.H)}
          {mergedCell("h0", rowIndex, row.h0)}
          {mergedCell("h", rowIndex, row.h)}
          {mergedCell("h1", rowIndex, row.h1)}
          {mergedCell("h2", rowIndex, row.h2)}
          {mergedCell("H1", rowIndex, row.H1)}
          <td className={CELL}>{row.L}</td>
          <td className={CELL}>{row.L0}</td>
          {mergedCell("L3", rowIndex, row.L3)}
          {mergedCell("L4", rowIndex, row.L4)}
          {mergedCell("P", rowIndex, row.P)}
          <td className={CELL}>{row.L5}</td>
          {mergedCell("t", rowIndex, row.t)}
          {mergedCell("nd", rowIndex, row.nd)}
          <td className={CELL}>{row.motorWeight}</td>
          {mergedCell("baseWeight", rowIndex, row.baseWeight)}
        </tr>
      ))}
    </>
  );
}
