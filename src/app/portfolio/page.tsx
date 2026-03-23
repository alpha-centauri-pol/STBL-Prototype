"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { BracketBox } from "@/components/CornerBracket";
import Tab, { TabContent } from "@/components/atoms/Tab";
import DataTable from "@/components/organisms/DataTable";
import InfoTooltip from "@/components/atoms/InfoTooltip";

const yieldDetailsTabs = [
  { label: "Yield Details", value: "yield" },
  { label: "Claimed Yield", value: "claimed" },
];

const yieldData = Array.from({ length: 6 }, (_, i) => ({
  id: "12862",
  asset: "USDY",
  usstMinted: "400.23",
  claimableYield: "$56.09",
  maturityDate: "22.09.24",
  action: "details",
  key: i,
}));

const yieldColumns = [
  { key: "id", label: "Yield ID" },
  {
    key: "asset",
    label: "Asset",
    render: (value: unknown) => (
      <div className="inline-flex items-center gap-2">
        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">U</span>
        </div>
        <span className="font-medium">{value as string}</span>
      </div>
    ),
  },
  { key: "usstMinted", label: "USST Minted", sortable: true },
  { key: "claimableYield", label: "Claimable Yield", sortable: true },
  { key: "maturityDate", label: "Maturity Date", sortable: true },
  {
    key: "action",
    label: "Action",
    render: () => (
      <Link
        href="/portfolio/detail"
        className="inline-flex items-center gap-1 text-sm font-medium text-purple-500 group/link"
      >
        Details
        <span className="inline-block transition-transform duration-150 group-hover/link:translate-x-0.5">&gt;</span>
      </Link>
    ),
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("yield");

  return (
    <DashboardLayout
      activePage="portfolio"
      connected={true}
      walletAddress="0xSrr...rsA4"
    >
      <div className="py-10 px-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex flex-col gap-1">
            <h1
              className="font-[var(--font-heading)] font-medium text-4xl leading-[1.2] tracking-tight"
              style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
            >
              Portfolio
            </h1>
            <p
              className="text-base leading-[1.4] tracking-tight opacity-70"
              style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
            >
              Overview of your collateral and yield
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Link
              href="#"
              className="inline-flex items-center justify-center border border-purple-500 text-purple-500 rounded-full px-6 py-2.5 text-sm font-medium hover:bg-purple-100"
            >
              Bridge &gt;
            </Link>
            <p className="text-xs text-black-300">
              Move your USST between supported blockchains
            </p>
          </div>
        </div>

        {/* Stats Row — fixed equal height so corner brackets align */}
        <div className="flex gap-[16.42px] mb-10 items-stretch">
          <BracketBox className="flex h-[107px] w-[228px] shrink-0 flex-col">
            <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3">
              <p
                className="font-[var(--font-heading)] font-medium text-[32px] leading-[1.2] tracking-[-0.32px] text-purple-500 w-[185px] text-center"
                style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
              >
                $138.02
              </p>
              <div className="flex items-center justify-center gap-1.5 w-[185px]">
                <span className="font-[var(--font-heading)] font-light text-[14px] leading-[1.2] tracking-[-0.16px] uppercase text-black opacity-70 whitespace-nowrap">
                  COLLATERAL LOCKED
                </span>
                <InfoTooltip size="sm" tooltip="Total value of collateral locked in the protocol" />
              </div>
            </div>
          </BracketBox>

          <BracketBox className="flex h-[107px] w-[228px] shrink-0 flex-col">
            <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3">
              <p
                className="font-[var(--font-heading)] font-medium text-[32px] leading-[1.2] tracking-[-0.32px] text-purple-500 w-[146px] text-center"
                style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
              >
                $192.67
              </p>
              <div className="flex items-center justify-center gap-1.5 w-[146px]">
                <span className="font-[var(--font-heading)] font-light text-[14px] leading-[1.2] tracking-[-0.16px] uppercase text-black opacity-70 whitespace-nowrap">
                  USST AVAILABLE
                </span>
                <InfoTooltip size="sm" tooltip="Total USST available in your wallet" />
              </div>
            </div>
          </BracketBox>

          <BracketBox className="flex h-[107px] min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex h-full min-h-0 items-center justify-between gap-4 overflow-hidden px-3 py-1">
              <div className="flex shrink-0 items-center gap-3">
                <div className="relative flex h-[92px] w-[124px] shrink-0 -translate-y-1 items-center justify-center">
                  {(() => {
                    const cx = 62;
                    const r = 45;
                    const sw = 12;
                    const yBase = 56;
                    const vbW = 124;
                    const vbMinY = yBase - 2 * r - sw / 2 - 2;
                    const vbH = yBase + sw / 2 + 2 - vbMinY;
                    const arcLen = Math.PI * r;
                    const pct = 0.5;
                    const arc = `M ${cx - r},${yBase} A ${r} ${r} 0 0 1 ${cx + r},${yBase}`;
                    return (
                      <svg
                        viewBox={`0 ${vbMinY} ${vbW} ${vbH}`}
                        className="block h-full w-full"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden
                      >
                        <path
                          d={arc}
                          fill="none"
                          stroke="#E8E0F4"
                          strokeWidth={sw}
                          strokeLinecap="butt"
                        />
                        <path
                          d={arc}
                          fill="none"
                          stroke="#4100A4"
                          strokeWidth={sw}
                          strokeLinecap="butt"
                          strokeDasharray={`${pct * arcLen} ${arcLen}`}
                        />
                      </svg>
                    );
                  })()}
                </div>
                <div className="flex min-w-0 flex-col items-start justify-center gap-0.5 text-left">
                  <p
                    className="font-[var(--font-heading)] font-medium text-[20px] leading-tight tracking-[-0.2px] text-purple-500"
                    style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
                  >
                    $91.42
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="font-[var(--font-heading)] font-light text-[9px] leading-tight tracking-[-0.08px] uppercase text-black whitespace-nowrap">
                      total yield to date
                    </span>
                    <InfoTooltip size="sm" tooltip="Total yield earned across all positions" />
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 pl-1">
                <div className="flex items-center gap-[5px]">
                  <div className="w-[9px] h-[9px] rounded-full bg-[#4100A4] shrink-0" />
                  <div className="flex items-center gap-[2px]">
                    <span className="font-[var(--font-heading)] font-light text-[12px] leading-[1.2] tracking-[-0.12px] uppercase text-black whitespace-nowrap">
                      yield accrued:
                    </span>
                    <InfoTooltip size="sm" tooltip="Yield earned but not yet claimed" />
                  </div>
                  <span className="font-['Aspekta',sans-serif] text-[12px] leading-[16px] tracking-[-0.12px] text-black whitespace-nowrap">
                    $50.09
                  </span>
                </div>
                <div className="flex items-center gap-[5px]">
                  <div className="w-[9px] h-[9px] rounded-full bg-[#E8E0F4] shrink-0" />
                  <div className="flex items-center gap-[2px]">
                    <span className="font-[var(--font-heading)] font-light text-[12px] leading-[1.2] tracking-[-0.12px] uppercase text-black whitespace-nowrap">
                      yield CLAIMED:
                    </span>
                    <InfoTooltip size="sm" tooltip="Yield already claimed to your wallet" />
                  </div>
                  <span className="font-['Aspekta',sans-serif] text-[12px] leading-[16px] tracking-[-0.12px] text-black whitespace-nowrap">
                    $50.09
                  </span>
                </div>
              </div>
            </div>
          </BracketBox>
        </div>

        {/* Tabs & Table */}
        <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
          <Tab
            tabs={yieldDetailsTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            id="portfolio"
          />
          <TabContent value="yield" activeTab={activeTab}>
            <DataTable
              columns={yieldColumns}
              data={yieldData}
              totalItems={940}
              pageSize={10}
            />
          </TabContent>
          <TabContent value="claimed" activeTab={activeTab}>
            <div className="flex flex-col items-center gap-2 py-16">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path opacity="0.28" d="M11.92 33.44c4.43.55 8.9.55 13.33 0 13.67-1.7 9.21-22.3-1.61-25.86A14.5 14.5 0 0 0 19.6 6.5h-3.63c-.56 0-1.12.05-1.65.13C3.05 8.58-2.53 31.11 11.92 33.44Z" fill="#7F7F7F"/>
                <path d="M21 21.5v1.45m0 0h-1.34a2.69 2.69 0 0 0 0 5.38h2.69a2.69 2.69 0 0 1 0 5.38H21m0-10.76h1.43c.92 0 1.74.5 2.22 1.27M21 33.71v1.45m0-1.45h-1.43c-.92 0-1.74-.5-2.22-1.27M25.24 15.73a14.5 14.5 0 0 0-3.24-.52h-3.63c-.56 0-1.11.05-1.65.13m8.52.39 3.11-7.78-1.14-.45a5.38 5.38 0 0 0-6.44 1.12 5.38 5.38 0 0 1-5.22.83l-1.71-.34 2.88 6.48m8.64-.26c10.82 3.56 15.28 24.17 1.61 25.86-4.43.55-8.9.55-13.33 0C2.2 39.71 7.8 17.18 19.72 15.24" stroke="#7F7F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p
                className="typo-p-lg text-black-300 text-center"
                style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
              >
                No Active YLD Positions
              </p>
              <Link
                href="/mint"
                className="inline-flex items-center justify-center bg-purple-500 text-white rounded-full px-4 h-8 text-sm tracking-tight hover:bg-purple-500/90"
              >
                Mint
              </Link>
            </div>
          </TabContent>
        </div>
      </div>
    </DashboardLayout>
  );
}
