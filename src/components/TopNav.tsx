import { WalletIcon } from "./icons";

export default function TopNav() {
  return (
    <header className="fixed top-0 left-[272px] right-0 h-[94px] bg-white border-b border-purple-200 flex items-center justify-end px-[52px] z-10">
      <button className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-full h-12 hover:bg-purple-500/90 transition-colors">
        <WalletIcon className="w-6 h-6" />
        <span className="text-base tracking-tight" style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}>
          Connect Wallet
        </span>
      </button>
    </header>
  );
}
