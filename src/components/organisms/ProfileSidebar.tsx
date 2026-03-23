"use client";

import { TransactionItem } from "../molecules/TransactionItem";

interface Transaction {
  type: "Sent" | "Received";
  amount: string;
}

interface ProfileSidebarProps {
  walletAddress: string;
  balance: string;
  transactions: Transaction[];
  className?: string;
}

function SettingsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M15.78 4.22l-1.42 1.42M5.64 14.36l-1.42 1.42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DisconnectIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 6V5a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2v-1M3 10h10M11 7l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProfileSidebar({
  walletAddress,
  balance,
  transactions,
  className = "",
}: ProfileSidebarProps) {
  return (
    <aside
      className={`fixed right-0 top-0 h-screen w-[350px] bg-white border-l border-black-50 flex flex-col z-30 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-black-15">
        <div className="flex items-center gap-2 border border-black-50 rounded-full px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-black-500">
            {walletAddress}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="p-1.5 text-black-300">
            <SettingsIcon className="w-5 h-5" />
          </button>
          <button type="button" className="p-1.5 text-black-300">
            <DisconnectIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Total Balance */}
      <div className="px-6 py-6 border-b border-black-15">
        <span className="text-xs font-heading font-light uppercase tracking-wide text-black-300">
          Total Balance
        </span>
        <p className="text-3xl font-heading font-medium text-black-500 mt-1">
          {balance}
        </p>
      </div>

      {/* Recent Transactions */}
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        <span className="text-xs font-heading font-light uppercase tracking-wide text-black-300">
          Recent Transactions
        </span>
        <div className="flex flex-col mt-3">
          {transactions.map((tx, i) => (
            <TransactionItem key={i} type={tx.type} amount={tx.amount} />
          ))}
          {transactions.length === 0 && (
            <p className="text-sm text-black-300 mt-2">No recent transactions</p>
          )}
        </div>
      </div>
    </aside>
  );
}
