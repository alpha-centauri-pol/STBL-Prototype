"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tab } from "../atoms/Tab";
import { Input } from "../atoms/Input";
import { Slider } from "../atoms/Slider";
import { Button } from "../atoms/Button";
import { DetailRow } from "../molecules/DetailRow";
import { BracketBox } from "../CornerBracket";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const stakeTabs = [
  { label: "STBL", value: "stbl" },
  { label: "STBL + USST", value: "stbl-usst" },
];

const durationMarks = [
  { value: 3, label: "3D" },
  { value: 7, label: "7D" },
  { value: 14, label: "14D" },
  { value: 30, label: "30D" },
  { value: 38, label: "38D" },
];

export default function StakeForm() {
  const [activeTab, setActiveTab] = useState("stbl");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(14);

  return (
    <BracketBox className="p-6">
      <motion.div
        className="flex flex-col gap-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Tab switcher */}
        <motion.div variants={fadeUp}>
        <Tab
          tabs={stakeTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          id="stake"
        />
        </motion.div>

        {/* Select STBL Amount */}
        <motion.div variants={fadeUp} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black-400">
            Select STBL Amount
          </label>
          <Input
            placeholder="0.00 STBL"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-black-300">Available: 1.2 STBL</span>
            <Button variant="pill" onClick={() => setAmount("1.2")}>
              MAX
            </Button>
          </div>
        </motion.div>

        {/* Lock Duration */}
        <motion.div variants={fadeUp} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black-400">
            Lock Duration
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Slider
                min={1}
                max={38}
                value={duration}
                onChange={setDuration}
                marks={durationMarks}
              />
            </div>
            <div className="w-20">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full border border-black-50 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div variants={fadeUp} className="flex flex-col gap-3 pt-2 border-t border-black-15">
          <DetailRow label="Total Amount" value={amount || "0.00"} showInfo infoText="Total STBL being staked" />
          <DetailRow label="Duration" value={`${duration} days`} showInfo infoText="Lock duration for your stake" />
          <DetailRow label="Multiplier" value="1.0x" showInfo infoText="Reward multiplier based on duration" />
          <DetailRow label="Unlock Time" value="--" showInfo infoText="When your stake will be unlocked" />
        </motion.div>

        {/* BscScan link */}
        <a href="#" className="inline-flex items-center gap-1 text-xs text-purple-500 group/bsc">
          <span className="underline">View on BscScan</span>
          <span className="inline-block transition-transform duration-150 group-hover/bsc:translate-x-0.5">&rarr;</span>
        </a>

        {/* Stake button */}
        <Button variant="primary" fullWidth size="lg">
          Stake
        </Button>

        {/* Footer note */}
        <p className="text-xs text-black-300 text-center">
          Rewards are distributed based on lock duration and amount staked.
        </p>
      </motion.div>
    </BracketBox>
  );
}
