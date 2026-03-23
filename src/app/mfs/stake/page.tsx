import DashboardLayout from "@/components/templates/DashboardLayout";
import BackButton from "@/components/molecules/BackButton";
import StakeForm from "@/components/organisms/StakeForm";

export default function StakePage() {
  return (
    <DashboardLayout
      activePage="mfs"
      connected={true}
      walletAddress="0xSrr...rsA4"
      showV2={true}
    >
      <div className="py-10 px-10">
        <BackButton href="/mfs" label="Back" className="mb-8" />
        <div className="flex flex-col items-center max-w-[480px] mx-auto">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1
              className="font-[var(--font-heading)] font-medium text-4xl leading-[1.2] tracking-tight text-center"
              style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
            >
              Stake
            </h1>
            <p
              className="text-base leading-[1.4] tracking-tight text-center opacity-70"
              style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
            >
              Stake STBL or USST to earn rewards
            </p>
          </div>
          <StakeForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
