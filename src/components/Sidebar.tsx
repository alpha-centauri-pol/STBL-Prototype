import Image from "next/image";
import {
  DashboardIcon,
  TokenIcon,
  ChartIcon,
  DonationIcon,
  EarningsIcon,
  ChevronRight,
  ChevronDoubleLeft,
  FileBarGraph,
  BentoGrid,
  FileIcon,
  ExternalLink,
} from "./icons";

const mainNavItems = [
  { label: "Dashboard", icon: DashboardIcon, active: true },
  { label: "Mint", icon: TokenIcon, active: false },
  { label: "Portfolio", icon: ChartIcon, active: false },
  { label: "MFS", icon: DonationIcon, active: false },
  { label: "Earnings", icon: EarningsIcon, active: false },
];

const bottomNavItems = [
  { label: "Audit Reports", icon: FileBarGraph, external: true },
  { label: "Dune Dashboard", icon: BentoGrid, external: true },
  { label: "Docs", icon: FileIcon, external: true },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[272px] bg-white border-r border-[#ebebeb] flex flex-col z-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-purple-200">
        <div className="py-3">
          <Image
            src="/assets/stbl-logo.svg"
            alt="STBL"
            width={88}
            height={32}
            priority
          />
        </div>
        <button className="border border-purple-200 rounded-lg p-0.5 shadow-sm hover:bg-gray-50 transition-colors">
          <ChevronDoubleLeft className="w-6 h-6 text-black-300" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col justify-between px-5 pt-5 pb-4 overflow-y-auto">
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm tracking-tight transition-colors ${
                item.active
                  ? "bg-purple-100 text-purple-500 font-normal"
                  : "text-black hover:bg-gray-50 font-normal"
              }`}
            >
              {item.active && (
                <div className="absolute left-[-20px] top-2 w-1 h-5 bg-purple-500 rounded-r" />
              )}
              <item.icon
                className={`w-5 h-5 ${
                  item.active ? "text-purple-500" : "opacity-[0.27] text-black"
                }`}
              />
              <span className="flex-1 font-[var(--font-body)]">{item.label}</span>
              <ChevronRight
                className={`w-5 h-5 ${
                  item.active ? "text-purple-500" : "opacity-[0.27] text-black"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="flex flex-col gap-1.5">
          {bottomNavItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm tracking-tight text-black hover:bg-gray-50 transition-colors"
            >
              <item.icon className="w-5 h-5 opacity-[0.27]" />
              <span className="flex-1">{item.label}</span>
              {item.external && (
                <ExternalLink className="w-5 h-5 opacity-[0.27]" />
              )}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
