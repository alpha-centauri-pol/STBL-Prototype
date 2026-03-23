"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  walletAddress?: string;
}

// ── Icons ────────────────────────────────────────────────────────────

function CopyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function LogoutIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronDoubleRight({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </svg>
  );
}

// ── Mock data ────────────────────────────────────────────────────────

const transactions = [
  { id: 1, type: "Sent", amount: "-$23.09" },
  { id: 2, type: "Sent", amount: "-$23.09" },
  { id: 3, type: "Sent", amount: "-$23.09" },
  { id: 4, type: "Sent", amount: "-$23.09" },
  { id: 5, type: "Sent", amount: "-$23.09" },
  { id: 6, type: "Sent", amount: "-$23.09" },
];

// ── Component ────────────────────────────────────────────────────────

export default function ProfileDrawer({ open, onClose, walletAddress }: ProfileDrawerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const formatted = walletAddress
    ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
    : "0xb976…4c3d";

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 300ms ease-out",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 flex items-start gap-2"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms cubic-bezier(0.25, 0, 0.2, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 shrink-0 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white cursor-pointer transition-colors"
          aria-label="Close profile"
        >
          <ChevronDoubleRight />
        </button>

        {/* Panel content */}
        <div className="bg-white w-[535px] h-full overflow-y-auto relative">
          {/* Decorative background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url(/assets/bg-gradient.png)",
              backgroundSize: "100% auto",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="relative flex flex-col gap-10 px-[29px] pt-8">
            {/* Header: address + actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-purple-100 rounded-full py-2 px-2 pr-4">
                {/* Avatar */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
                <span
                  className="text-base font-medium text-purple-500"
                  style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
                >
                  {formatted}
                </span>
                <button
                  type="button"
                  className="text-purple-500/60 hover:text-purple-500 transition-colors cursor-pointer"
                  aria-label="Copy address"
                >
                  <CopyIcon className="w-5 h-5" />
                </button>
              </div>
              <button
                type="button"
                className="w-[34px] h-[34px] rounded-[10px] bg-white flex items-center justify-center text-black-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
                aria-label="Disconnect wallet"
              >
                <LogoutIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Balance */}
            <div className="flex flex-col">
              <span className="font-[var(--font-heading)] font-light text-base leading-[1.2] tracking-tight uppercase text-black">
                TOTAL BALANCE
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-[var(--font-heading)] font-medium text-[36px] leading-[1.2] tracking-tight text-black"
                  style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
                >
                  $
                </span>
                <span
                  className="font-[var(--font-heading)] font-medium text-[36px] leading-[1.2] tracking-tight text-purple-500"
                  style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
                >
                  2300.54
                </span>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="border border-[#e5e5e5] rounded-xl bg-white overflow-hidden">
              <div className="border-b border-[#e5e5e5] px-5 py-4">
                <span className="text-sm text-black tracking-tight">
                  Recent Transactions
                </span>
              </div>
              <div className="flex flex-col">
                {transactions.map((tx, i) => (
                  <div
                    key={tx.id}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i < transactions.length - 1 ? "border-b border-[#e5e5e5]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[42px] h-[42px] rounded-[3px] bg-purple-100 flex items-center justify-center">
                        <ArrowUpRightIcon className="w-[22px] h-[22px] text-purple-500" />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-base font-medium text-black leading-[1.2] tracking-tight"
                          style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
                        >
                          {tx.type}
                        </span>
                        <span className="text-sm text-red-500 leading-[1.4] tracking-tight">
                          {tx.amount}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-black-300 hover:text-black-500 transition-colors cursor-pointer"
                      aria-label="View on explorer"
                    >
                      <ExternalLinkIcon className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>,
    document.body,
  );
}
