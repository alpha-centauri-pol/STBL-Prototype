import DashboardLayout from "@/components/templates/DashboardLayout";
import MintForm from "@/components/organisms/MintForm";

export default function MintPage() {
  return (
    <DashboardLayout activePage="mint" connected={false}>
      <div className="flex flex-col items-center py-[120px] px-8 max-w-[720px] w-full mx-auto">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1
            className="font-[var(--font-heading)] font-medium text-4xl leading-[1.2] tracking-tight text-center"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Mint
          </h1>
          <p
            className="text-base leading-[1.4] tracking-tight text-center opacity-70"
            style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
          >
            Deposit supported real-world assets to mint USST
          </p>
        </div>
        <MintForm connected={false} />
      </div>
    </DashboardLayout>
  );
}
