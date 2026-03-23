"use client";

import Image from "next/image";

interface ChainSwitcherProps {
  chain: "ETH" | "BNB";
  onSwitch?: () => void;
  className?: string;
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const chainConfig = {
  ETH: {
    icon: "/assets/ethereum.png",
    color: "#627EEA",
    label: "Ethereum",
  },
  BNB: {
    icon: "/assets/bnb.png",
    color: "#F3BA2F",
    label: "BNB Chain",
  },
} as const;

export function ChainSwitcher({
  chain,
  onSwitch,
  className = "",
}: ChainSwitcherProps) {
  const config = chainConfig[chain];

  return (
    <button
      type="button"
      onClick={onSwitch}
      className={`
        inline-flex items-center gap-2 h-10 px-3
        bg-white border border-black-50 rounded-full
        cursor-pointer hover:border-black-200 active:scale-[0.97] transition-all duration-150
        group
        ${className}
      `}
    >
      <Image
        src={config.icon}
        alt={config.label}
        width={24}
        height={24}
        className="rounded-full"
      />
      <ChevronDown className="w-4 h-4 text-black-300 transition-transform duration-150 group-hover:rotate-180" />
    </button>
  );
}

export default ChainSwitcher;
