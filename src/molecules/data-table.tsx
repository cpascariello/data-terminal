"use client";

import { useState } from "react";
import { cn } from "@dt/lib/cn";
import type { ReactNode } from "react";

interface Column<K extends string> {
  key: K;
  label: string;
  sortable?: boolean;
}

export interface DataTableProps<K extends string> {
  columns: Column<K>[];
  rows: Record<K, ReactNode>[];
  className?: string;
}

type SortDir = "asc" | "desc" | null;

export function DataTable<K extends string>({
  columns,
  rows,
  className,
}: DataTableProps<K>) {
  const [sortKey, setSortKey] = useState<K | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  function handleSort(key: K) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  }

  const sortedRows = [...rows];
  if (sortKey && sortDir) {
    sortedRows.sort((a, b) => {
      const aVal = String(a[sortKey] ?? "");
      const bVal = String(b[sortKey] ?? "");
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }

  function sortIndicator(key: K) {
    if (sortKey !== key || !sortDir) return " --";
    return sortDir === "asc" ? " \u25B2" : " \u25BC";
  }

  return (
    <div className={cn("overflow-x-auto border border-border", className)}>
      <table className="w-full font-display text-sm">
        <thead>
          <tr className="border-b border-border bg-foreground/[0.02]">
            {columns.map((col) => {
              const ariaSort: "ascending" | "descending" | undefined =
                sortKey === col.key && sortDir
                  ? sortDir === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined;

              return (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left text-[10px] uppercase tracking-[0.2em] text-foreground/40"
                  aria-sort={ariaSort}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="flex w-full items-center gap-1 text-left"
                    >
                      {col.label}
                      <span className="text-accent/60">
                        {sortIndicator(col.key)}
                      </span>
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <tr
              key={i}
              className="group relative border-b border-border/50 transition-colors hover:bg-foreground/[0.02]"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-foreground/70">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
