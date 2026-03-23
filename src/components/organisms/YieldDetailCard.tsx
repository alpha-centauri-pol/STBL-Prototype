import { Button } from "../atoms/Button";
import { DetailRow } from "../molecules/DetailRow";
import { TokenDisplay } from "../molecules/TokenDisplay";
import { MetricValue } from "../molecules/MetricValue";
import { BracketBox } from "../CornerBracket";

interface YieldDetails {
  collateralLocked: string;
  usstMinted: string;
  startDate: string;
  maturityDate: string;
}

interface YieldDetailCardProps {
  token: "USDY" | "OUSG" | "USST" | "STBL" | "ETH" | "BNB";
  yieldAmount: string;
  nextDistribution: string;
  details: YieldDetails;
  connected?: boolean;
  className?: string;
}

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 6v4l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function YieldDetailCard({
  token,
  yieldAmount,
  nextDistribution,
  details,
  connected = false,
  className = "",
}: YieldDetailCardProps) {
  return (
    <BracketBox className={`p-6 transition-shadow duration-200 hover:shadow-md ${className}`}>
      <div className="flex flex-col gap-6">
        {/* Token icon + name */}
        <TokenDisplay token={token} />

        {/* Large yield value */}
        <MetricValue
          value={yieldAmount}
          label="Yield Available to Claim"
          size="lg"
          color="purple"
        />

        {/* Next distribution */}
        <div className="flex items-center gap-1.5 text-sm text-black-300">
          <ClockIcon className="w-4 h-4" />
          <span>Next distribution: {nextDistribution}</span>
        </div>

        {/* Yield Details section */}
        <div className="flex flex-col gap-3 pt-2 border-t border-black-15">
          <span className="text-sm font-medium text-black-500">
            Yield Details
          </span>
          <DetailRow label="Collateral Locked" value={details.collateralLocked} />
          <DetailRow label="USST Minted" value={details.usstMinted} />
          <DetailRow label="Start Date" value={details.startDate} />
          <DetailRow label="Maturity Date" value={details.maturityDate} />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" className="flex-1">
            Withdraw Collateral &gt;
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            disabled={!connected}
          >
            Claim Yield
          </Button>
        </div>
      </div>
    </BracketBox>
  );
}
