"use client";

import { useState } from "react";
import Link from "next/link";
import Tab, { TabContent } from "@/components/atoms/Tab";
import DataTable from "@/components/organisms/DataTable";
import Badge from "@/components/atoms/Badge";
import StatCard from "@/components/molecules/StatCard";
import { Button } from "@/components/atoms/Button";

const mfsTabs = [
  { label: "Active Stakes", value: "active" },
  { label: "History", value: "history" },
];

const activeStakesData = [
  {
    stakeId: "10421",
    stbl: "500.00",
    usst: "200.00",
    multiplier: "1.5x",
    stakingPeriod: "90 Days",
    unlockTime: "completed",
    action: "claim",
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    stakeId: String(10422 + i),
    stbl: "500.00",
    usst: "200.00",
    multiplier: "1.5x",
    stakingPeriod: "90 Days",
    unlockTime: "45D 12H 30M",
    action: "claim",
  })),
];

const activeColumns = [
  { key: "stakeId", label: "Stake ID" },
  { key: "stbl", label: "STBL", sortable: true },
  { key: "usst", label: "USST", sortable: true },
  { key: "multiplier", label: "Multiplier", sortable: true },
  { key: "stakingPeriod", label: "Staking Period", sortable: true },
  {
    key: "unlockTime",
    label: "Unlock Time",
    render: (value: unknown) =>
      (value as string) === "completed" ? (
        <Badge variant="green">Completed</Badge>
      ) : (
        <span className="text-sm text-black-400">{value as string}</span>
      ),
  },
  {
    key: "action",
    label: "Action",
    render: (_value: unknown, row: Record<string, unknown>) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">Claim</Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={(row.unlockTime as string) !== "completed"}
        >
          Withdraw &gt;
        </Button>
      </div>
    ),
  },
];

const historyData = Array.from({ length: 6 }, (_, i) => ({
  stakeId: String(10421 + i),
  actionType: "Mint",
  stbl: "500.00",
  usst: "200.00",
  dateTime: "22.09.24 14:30",
}));

const historyColumns = [
  { key: "stakeId", label: "Stake ID" },
  {
    key: "actionType",
    label: "Action",
    render: (value: unknown) => (
      <Badge variant="purple">{value as string}</Badge>
    ),
  },
  { key: "stbl", label: "STBL", sortable: true },
  { key: "usst", label: "USST", sortable: true },
  { key: "dateTime", label: "Date & Time", sortable: true },
];

export default function MFSPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="py-10 px-10">
      {/* Page Title */}
      <h1
        className="font-[var(--font-heading)] font-medium text-4xl leading-[1.2] tracking-tight mb-8"
        style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
      >
        MFS 2.0
      </h1>

      {/* Hero Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-4">
          <h2
            className="font-[var(--font-heading)] font-medium text-3xl leading-[1.2] tracking-tight"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Earn Rewards By Staking
          </h2>
          <Link
            href="/mfs/stake"
            className="inline-flex items-center justify-center bg-purple-500 text-white rounded-full px-6 py-3 h-11 text-base font-medium hover:bg-purple-500/90 w-fit"
          >
            Stake
          </Link>
        </div>

        <div className="flex gap-4">
          <StatCard
            value="$138.02"
            label="Total Rewards Available"
            showInfo
            infoText="Total unclaimed rewards across all stakes"
            className="min-w-[220px]"
          />
          <StatCard
            value="12D 0H 0M"
            label="Remaining Duration"
            showInfo
            infoText="Time remaining until next unlock"
            className="min-w-[220px]"
          />
        </div>
      </div>

      {/* Daily Reward Pool */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs font-[var(--font-heading)] font-light uppercase tracking-wide text-black-300">
          Daily Reward Pool:
        </span>
        <span className="text-sm font-medium text-black-500">1 STBL/Block</span>
      </div>

      {/* Claimable Rewards Bar */}
      <div
        className="flex items-center justify-between rounded-lg px-6 py-4 mb-10 bg-purple-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%238b5cf6' stroke-width='1.5' stroke-dasharray='10%2c 8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-black-400">Total Claimable Rewards:</span>
          <span className="text-lg font-[var(--font-heading)] font-medium text-green-500">
            $275.02
          </span>
        </div>
        <Button variant="secondary">
          Claim All
        </Button>
      </div>

      {/* Tabs & Table */}
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <Tab
          tabs={mfsTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          id="mfs-stakes"
        />
        <TabContent value="active" activeTab={activeTab}>
          <DataTable
            columns={activeColumns}
            data={activeStakesData}
            totalItems={940}
            pageSize={10}
          />
        </TabContent>
        <TabContent value="history" activeTab={activeTab}>
          <DataTable
            columns={historyColumns}
            data={historyData}
            totalItems={940}
            pageSize={10}
          />
        </TabContent>
      </div>
    </div>
  );
}
