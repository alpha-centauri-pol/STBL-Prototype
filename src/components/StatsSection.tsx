import Image from "next/image";
import { BracketBox } from "./CornerBracket";
import StatCard from "./molecules/StatCard";

export default function StatsSection() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top two stat boxes */}
      <div className="flex gap-4">
        <StatCard
          value="$0.99"
          label="USST Price"
          showInfo
          infoText="Current USST token price"
          className="flex-1"
        />
        <StatCard
          value="$2.709M"
          label="Collateral Available"
          showInfo
          infoText="Total collateral available in the protocol"
          className="flex-1"
        />
      </div>

      {/* USST Minted across chains */}
      <BracketBox className="h-[150px]">
        <div className="flex items-start px-4 pt-[34px]">
          {/* Left side */}
          <div className="flex-1 flex flex-col gap-4">
            <p className="font-[var(--font-heading)] font-light text-lg leading-[1.2] tracking-tight uppercase opacity-70" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
              USST Minted across chains
            </p>
            <p className="font-[var(--font-heading)] font-medium text-[32px] leading-[1.2] tracking-tight text-purple-500">
              $2.674M
            </p>
          </div>

          {/* Right side - Chain Details */}
          <div className="flex-1 flex flex-col gap-1.5">
            <p className="font-[var(--font-heading)] font-light text-lg leading-[1.2] tracking-tight uppercase opacity-70" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
              Chain Details
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image src="/assets/ethereum.png" alt="Ethereum" width={18} height={18} />
                  <span className="text-base tracking-tight" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
                    Ethereum
                  </span>
                </div>
                <span className="font-[var(--font-body)] font-medium text-base leading-[1.2] tracking-tight text-purple-500" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
                  $1.063M
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image src="/assets/bnb.png" alt="BNB" width={18} height={18} />
                  <span className="text-base tracking-tight" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
                    BNB
                  </span>
                </div>
                <span className="font-[var(--font-body)] font-medium text-base leading-[1.2] tracking-tight text-purple-500" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
                  $1.611M
                </span>
              </div>
            </div>
          </div>
        </div>
      </BracketBox>
    </div>
  );
}
