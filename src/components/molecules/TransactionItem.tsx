type TransactionType = "Sent" | "Received";

interface TransactionItemProps {
  type: TransactionType;
  amount: string;
  className?: string;
}

function ArrowUpRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 14L14 6M14 6H7M14 6v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownLeft({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 6L6 14M6 14h7M6 14V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 3h6v6M17 3L9 11M14 11v5a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TransactionItem({
  type,
  amount,
  className = "",
}: TransactionItemProps) {
  const isSent = type === "Sent";

  return (
    <div className={`flex items-center gap-3 py-2 ${className}`}>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          isSent ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
        }`}
      >
        {isSent ? <ArrowUpRight /> : <ArrowDownLeft />}
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-black-500">{type}</span>
      </div>
      <span
        className={`text-sm font-medium ${
          isSent ? "text-red-500" : "text-green-500"
        }`}
      >
        {amount}
      </span>
      <span className="text-black-300">
        <ExternalLinkIcon />
      </span>
    </div>
  );
}

export default TransactionItem;
