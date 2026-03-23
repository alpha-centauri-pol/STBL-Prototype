"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { WalletIcon, ChevronDown, ChevronRight } from "../icons";
import { Button } from "../atoms/Button";

interface TopNavProps {
  connected?: boolean;
  walletAddress?: string;
  isCollapsed?: boolean;
}

const chains = [
  { id: "bnb", label: "BNB Chain", icon: "/assets/bnb.png" },
  { id: "ethereum", label: "Ethereum", icon: "/assets/ethereum.png" },
  { id: "polygon", label: "Polygon", icon: null },
  { id: "arbitrum", label: "Arbitrum", icon: null },
  { id: "base", label: "Base", icon: null },
];

function ChainFallbackIcon({ label }: { label: string }) {
  return (
    <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center">
      <span className="text-xs font-medium text-purple-500">{label.charAt(0)}</span>
    </div>
  );
}

export default function TopNav({ connected = false, walletAddress, isCollapsed = false }: TopNavProps) {
  const sidebarWidth = isCollapsed ? 88 : 272;
  const [selectedChain, setSelectedChain] = useState("bnb");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeChain = chains.find((c) => c.id === selectedChain) ?? chains[0];

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Format wallet address like in design: 0xSrr…rsA4
  const formattedAddress = walletAddress
    ? `${walletAddress.slice(0, 5)}…${walletAddress.slice(-4)}`
    : "0xSrr…rsA4";

  return (
    <header
      className="fixed top-0 right-0 h-[80px] bg-white border-b border-purple-200 flex items-center justify-end px-[52px] z-10 transition-all duration-300 ease-in-out"
      style={{ left: `${sidebarWidth}px` }}
    >
      {connected && walletAddress ? (
        <div className="flex items-center gap-[18.76px]">
          {/* Chain selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white border border-[#e8e0f4] flex items-center gap-[7px] h-[48px] pl-[4.69px] pr-[9.38px] py-[4.69px] rounded-[50px] cursor-pointer hover:border-purple-300 transition-colors"
            >
              <div className="relative w-[35px] h-[35px]">
                {activeChain.icon ? (
                  <Image src={activeChain.icon} alt={activeChain.label} fill className="rounded-full object-cover" />
                ) : (
                  <ChainFallbackIcon label={activeChain.label} />
                )}
              </div>
              <ChevronDown className={`w-6 h-6 text-black transition-transform duration-100 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            <div
              role="listbox"
              style={{
                transformOrigin: "top right",
                transition: "transform 100ms ease-out, opacity 100ms ease-out",
                transform: dropdownOpen ? "scale(1)" : "scale(0.95)",
                opacity: dropdownOpen ? 1 : 0,
                pointerEvents: dropdownOpen ? "auto" : "none",
              }}
              className="absolute top-full right-0 mt-2 w-[200px] bg-white border border-[#e8e0f4] rounded-xl shadow-lg overflow-hidden z-50"
            >
              {chains.map((chain, index) => (
                <button
                  key={chain.id}
                  type="button"
                  role="option"
                  aria-selected={chain.id === selectedChain}
                  onClick={() => {
                    setSelectedChain(chain.id);
                    setDropdownOpen(false);
                  }}
                  style={{
                    opacity: dropdownOpen ? 1 : 0,
                    transform: dropdownOpen ? "translateY(0)" : "translateY(-4px)",
                    transition: `opacity 100ms ease-out ${index * 20}ms, transform 100ms ease-out ${index * 20}ms`,
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    chain.id === selectedChain
                      ? "bg-purple-100 text-purple-500 font-medium"
                      : "text-black-500 hover:bg-black-15"
                  }`}
                >
                  <div className="relative w-6 h-6 shrink-0">
                    {chain.icon ? (
                      <Image src={chain.icon} alt={chain.label} fill className="rounded-full object-cover" />
                    ) : (
                      <ChainFallbackIcon label={chain.label} />
                    )}
                  </div>
                  <span>{chain.label}</span>
                  {chain.id === selectedChain && (
                    <svg className="w-4 h-4 ml-auto text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Wallet address */}
          <div className="border border-[#4100a4] flex items-center gap-2 px-6 py-3 rounded-[41px] cursor-pointer hover:bg-gray-50 transition-colors">
            <span
              className="text-base text-black font-medium"
              style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
            >
              {formattedAddress}
            </span>
            <ChevronRight className="w-6 h-6 text-black" />
          </div>
        </div>
      ) : (
        <Button
          variant="primary"
          size="lg"
          icon={<WalletIcon className="w-5 h-5" />}
        >
          Connect Wallet
        </Button>
      )}
    </header>
  );
}
