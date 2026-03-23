import Link from "next/link";
import StatsSection from "@/components/StatsSection";
import CollateralBreakdown from "@/components/CollateralBreakdown";
import AboutSTBL from "@/components/AboutSTBL";
import FadeInSection from "@/components/atoms/FadeInSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 py-[120px] px-8 max-w-[822px] mx-auto">
      {/* Hero */}
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex flex-col items-center gap-2">
          <h1
            className="font-[var(--font-heading)] font-medium text-4xl leading-[1.2] tracking-tight text-center max-w-[740px]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Spend Your Stablecoin. Keep Your Yield.
          </h1>
          <p
            className="text-base leading-[1.4] tracking-tight text-center opacity-70 max-w-[636px]"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Connect your wallet, deposit RWA collateral, mint USST, and
            start earning yield
          </p>
        </div>
        <Link
          href="/mint"
          className="inline-flex items-center justify-center bg-purple-500 text-white px-6 py-3 rounded-full h-11 text-base tracking-tight hover:bg-purple-500/90"
          style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
        >
          Mint USST
        </Link>
      </div>

      {/* Stats & Info */}
      <div className="flex flex-col items-center gap-12 w-[695px]">
        <FadeInSection className="w-full">
          <StatsSection />
        </FadeInSection>
        <FadeInSection className="w-full" delay={0.1}>
          <CollateralBreakdown />
        </FadeInSection>
        <FadeInSection className="w-full" delay={0.2}>
          <AboutSTBL />
        </FadeInSection>
      </div>
    </div>
  );
}
