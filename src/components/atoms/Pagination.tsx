"use client";

import { useEffect, useRef } from "react";
import { motion, LayoutGroup } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  id?: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  id = "pagination",
  className = "",
}: PaginationProps) {
  const hasMounted = useRef(false);
  useEffect(() => { hasMounted.current = true; }, []);
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const getPageNumbers = (): (number | "ellipsis")[] => {
    // Always return a fixed number of slots so width stays constant
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // 7 slots: [1] [..] [a] [b] [c] [..] [last]
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <LayoutGroup id={`pg-${id}`}>
      <div
        className={`flex items-center gap-2 text-sm text-black-300 ${className}`}
      >
        {/* Prev button */}
        <button
          type="button"
          onClick={() => hasPrev && onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className={`w-8 h-8 rounded-lg border border-black-50 flex items-center justify-center transition-all duration-150 ${
            hasPrev
              ? "cursor-pointer text-black-400 hover:bg-black-15 hover:border-black-200 active:scale-95"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Page numbers */}
        {pageNumbers.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-black-200">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`relative w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-150 cursor-pointer ${
                p === currentPage
                  ? "text-white"
                  : "border border-black-50 text-black-400 hover:bg-black-15 hover:border-black-200 active:scale-95"
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {p === currentPage && (
                <motion.div
                  layoutId={`page-active-${id}`}
                  className="absolute inset-0 bg-purple-500 rounded-lg"
                  transition={hasMounted.current ? { type: "spring", duration: 0.25, bounce: 0.1 } : { duration: 0 }}
                />
              )}
              <span className="relative z-10">{p}</span>
            </button>
          ),
        )}

        {/* Next button */}
        <button
          type="button"
          onClick={() => hasNext && onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`w-8 h-8 rounded-lg border border-black-50 flex items-center justify-center transition-all duration-150 ${
            hasNext
              ? "cursor-pointer text-black-400 hover:bg-black-15 hover:border-black-200 active:scale-95"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Range text — fixed width so layout doesn't shift as numbers change */}
        <span className="ml-2 text-xs text-black-200 text-right min-w-20" style={{ fontVariantNumeric: "tabular-nums" }}>
          {startItem}-{endItem} of {totalItems}
        </span>
      </div>
    </LayoutGroup>
  );
}

export default Pagination;
