import Image from "next/image";
import { InfoTooltip } from "./atoms/InfoTooltip";

function CollateralCard({
  token,
  category,
  minted,
  collateralValue,
}: {
  token: string;
  category: string;
  minted: string;
  collateralValue: string;
}) {
  return (
    <div className="flex-1 bg-white border border-black-15 rounded p-[18px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <Image src="/assets/ondo.png" alt={token} width={18} height={18} />
          <span className="font-[var(--font-body)] font-medium text-base leading-[1.2] tracking-tight" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
            {token}
          </span>
        </div>
        <span className="bg-purple-100 text-purple-500 font-[var(--font-body)] font-medium text-[10px] leading-[1.2] tracking-tight px-1.5 py-1 rounded-full" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
          {category}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-black-15 my-4" />

      {/* Values */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="font-[var(--font-heading)] font-medium text-2xl leading-[1.2] tracking-tight" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
            {minted}
          </p>
          <div className="flex items-center gap-1">
            <span className="font-[var(--font-heading)] font-light text-xs leading-[1.2] tracking-tight uppercase opacity-70" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
              USST Minted
            </span>
            <InfoTooltip size="sm" tooltip="More info" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-[var(--font-heading)] font-medium text-2xl leading-[1.2] tracking-tight" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
            {collateralValue}
          </p>
          <div className="flex items-center gap-1">
            <span className="font-[var(--font-heading)] font-light text-xs leading-[1.2] tracking-tight uppercase opacity-70" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
              COLLATERAL VALUE
            </span>
            <InfoTooltip size="sm" tooltip="More info" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollateralBreakdown() {
  return (
    <div className="flex flex-col gap-[18px] w-full">
      {/* Title */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <h2 className="font-[var(--font-heading)] font-medium text-2xl leading-[1.2] tracking-tight" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
            Collateral Breakdown
          </h2>
          <InfoTooltip size="md" tooltip="Real-world assets backing USST" />
        </div>
        <p className="text-xs tracking-tight opacity-70" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
          Real-world assets backing USST and corresponding mint amounts
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-3">
        <CollateralCard
          token="USDY"
          category="Tokenize Money Market"
          minted="$1.695M"
          collateralValue="$1.673M"
        />
        <CollateralCard
          token="OUSG"
          category="Tokenize Money Market"
          minted="$1.695M"
          collateralValue="$1.673M"
        />
      </div>
    </div>
  );
}
