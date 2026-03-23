import BackButton from "@/components/molecules/BackButton";
import YieldDetailCard from "@/components/organisms/YieldDetailCard";

export default function PortfolioDetailPage() {
  return (
    <div className="py-10 px-10">
      <BackButton href="/portfolio" label="Back" className="mb-8" />
      <div className="max-w-[480px] mx-auto">
        <YieldDetailCard
          token="USDY"
          yieldAmount="$399"
          nextDistribution="11/03/25"
          details={{
            collateralLocked: "$500.12",
            usstMinted: "$290.77",
            startDate: "23/04/25",
            maturityDate: "23/04/25",
          }}
          connected={true}
        />
      </div>
    </div>
  );
}
