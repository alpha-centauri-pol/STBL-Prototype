"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import Pagination from "@/components/atoms/Pagination";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  totalItems?: number;
  pageSize?: number;
  className?: string;
  id?: string;
}

export default function DataTable({
  columns,
  data,
  totalItems = 940,
  pageSize = 10,
  className = "",
  id = "table",
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const hasMounted = useRef(false);
  useEffect(() => { hasMounted.current = true; }, []);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Tag rows with stable ids + sort
  const sortedData = useMemo(() => {
    const tagged: (Record<string, unknown> & { _rowId: string })[] = data.map((row, i) => ({ ...row, _rowId: row.key != null ? String(row.key) : `r${i}` }));
    if (!sortKey) return tagged;
    const key = sortKey;
    return [...tagged].sort((a, b) => {
      const aVal = String((a as Record<string, unknown>)[key] ?? "");
      const bVal = String((b as Record<string, unknown>)[key] ?? "");
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  return (
    <LayoutGroup id={`dt-${id}`}>
      <div className={`flex flex-col gap-4 ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black-50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="pb-3 pr-4 text-xs font-[var(--font-heading)] font-light uppercase tracking-wide text-black-300"
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 cursor-pointer"
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        <span
                          className="text-[10px] inline-block transition-transform duration-150"
                          style={{
                            transform:
                              sortKey === col.key && sortDir === "asc"
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                          }}
                        >
                          {"\u25B2"}
                        </span>
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, i) => (
                <motion.tr
                  key={row._rowId}
                  layout
                  initial={hasMounted.current ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    layout: { type: "spring", duration: 0.35, bounce: 0.1 },
                    duration: 0.2,
                    delay: hasMounted.current ? 0 : i * 0.03,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="border-b border-black-15 hover:bg-black-15 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 pr-4 text-sm text-black-500">
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            id={id}
          />
        </div>
      </div>
    </LayoutGroup>
  );
}
