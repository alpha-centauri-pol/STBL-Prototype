import Image from "next/image";
import { WalletIcon, ChevronDown, ChevronRight } from "../icons";
import { Button } from "../atoms/Button";

interface TopNavProps {
  connected?: boolean;
  walletAddress?: string;
  isCollapsed?: boolean;
}

export default function TopNav({ connected = false, walletAddress, isCollapsed = false }: TopNavProps) {
  const sidebarWidth = isCollapsed ? 88 : 272;

  // Format wallet address like in design: 0xSrr…rsA4
  const formattedAddress = walletAddress 
    ? `${walletAddress.slice(0, 5)}…${walletAddress.slice(-4)}`
    : "0xSrr…rsA4";

  return (
    <header 
      className="fixed top-0 right-0 h-[80px] bg-white border-b border-purple-200 flex items-center justify-end px-[52px] z-10 transition-all duration-300 ease-in-out"
      style={{ left: `${sidebarWidth}px` }}
    >
      {connected && walletAddress ? (
        <div className="flex items-center gap-[18.76px]">
          <div className="bg-white border border-[#e8e0f4] flex items-center gap-[7px] h-[48px] pl-[4.69px] pr-[9.38px] py-[4.69px] rounded-[50px]">
            <div className="relative w-[35px] h-[35px]">
              <Image src="/assets/bnb.png" alt="BNB" fill className="rounded-full object-cover" />
            </div>
            <ChevronDown className="w-6 h-6 text-black" />
          </div>
          <div className="border border-[#4100a4] flex items-center gap-2 px-6 py-3 rounded-[41px] cursor-pointer hover:bg-gray-50 transition-colors">
            <span
              className="text-base text-black font-medium"
              style={{ fontFeatureSettings: "'calt' 0, 'liga' 0" }}
            >
              {formattedAddress}
            </span>
            <ChevronRight className="w-6 h-6 text-black" />
          </div>
        </div>
      ) : (
        <Button
          variant="primary"
          size="lg"
          icon={<WalletIcon className="w-5 h-5" />}
        >
          Connect Wallet
        </Button>
      )}
    </header>
  );
}
