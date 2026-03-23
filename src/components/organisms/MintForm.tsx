"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { DetailRow } from "../molecules/DetailRow";
import { BracketBox } from "../CornerBracket";
import { WalletIcon } from "../icons";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface MintFormProps {
  connected?: boolean;
}

const tokenOptions = [
  { value: "USDY", label: "USDY" },
  { value: "OUSG", label: "OUSG" },
];

export function MintForm({ connected = false }: MintFormProps) {
  const [selectedToken, setSelectedToken] = useState("USDY");
  const [amount, setAmount] = useState("");

  const availableBalance = 1.2;

  const handleHalf = () => {
    setAmount((availableBalance / 2).toString());
  };

  const handleMax = () => {
    setAmount(availableBalance.toString());
  };

  const numericAmount = parseFloat(amount) || 0;
  const dollarValue = numericAmount.toFixed(2);

  return (
    <BracketBox className="w-full p-8">
      <motion.div
        className="flex flex-col gap-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Select Token */}
        <motion.div variants={fadeUp} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black-400">
            Select Token
          </label>
          <p className="text-xs text-black-300">
            Choose the token you want to use for minting USST.
          </p>
          <Select
            value={selectedToken}
            options={tokenOptions}
            onChange={(val) => setSelectedToken(val)}
          />
          <p className="text-xs text-black-300">
            Backed by Money Market Instruments
          </p>
        </motion.div>

        {/* Select Amount */}
        <motion.div variants={fadeUp} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black-400">
            Select Amount
          </label>
          <Input
            placeholder={`0.00 ${selectedToken}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-black-300">~${dollarValue}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-black-300">
                Available: {availableBalance} {selectedToken}
              </span>
              <Button variant="pill" onClick={handleHalf}>
                HALF
              </Button>
              <Button variant="pill" onClick={handleMax}>
                MAX
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Mint Details */}
        <motion.div variants={fadeUp} className="flex flex-col gap-3 pt-2 border-t border-black-15">
          <span className="text-sm font-medium text-black-500">
            Mint Details
          </span>
          <DetailRow label="Duration" value="30 days" showInfo infoText="Lock period for minted USST" />
          <DetailRow label="Haircut" value="0.15%" showInfo infoText="Fee deducted from collateral value" />
          <DetailRow label="Fees" value="$0.00" showInfo infoText="Transaction fees" />
          <DetailRow label="Yield Frequency" value="Monthly" showInfo infoText="How often yield is distributed" />
          <DetailRow label="USST Minted" value="0.00" showInfo infoText="Amount of USST you will receive" />
        </motion.div>

        {/* Action button */}
        {connected ? (
          <Button variant="primary" fullWidth size="lg">
            Mint USST
          </Button>
        ) : (
          <Button
            variant="primary"
            fullWidth
            size="lg"
            icon={<WalletIcon className="w-5 h-5" />}
          >
            Connect Wallet
          </Button>
        )}
      </motion.div>
    </BracketBox>
  );
}

export default MintForm;
