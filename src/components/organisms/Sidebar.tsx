"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGroup } from "framer-motion";
import {
  DashboardIcon,
  TokenIcon,
  ChartIcon,
  DonationIcon,
  EarningsIcon,
  ChevronDoubleLeft,
  FileBarGraph,
  BentoGrid,
  FileIcon,
} from "../icons";
import { NavItem } from "@/components/molecules/NavItem";

interface SidebarProps {
  activePage?: string;
  showV2?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const mainNavItems = [
  { label: "Dashboard", icon: DashboardIcon, href: "/", key: "dashboard" },
  { label: "Mint", icon: TokenIcon, href: "/mint", key: "mint" },
  { label: "Portfolio", icon: ChartIcon, href: "/portfolio", key: "portfolio" },
  { label: "MFS", icon: DonationIcon, href: "/mfs", key: "mfs" },
  { label: "Earnings", icon: EarningsIcon, href: "/earnings", key: "earnings" },
];

const bottomNavItems = [
  { label: "Audit Reports", icon: FileBarGraph, external: true, href: "#" },
  { label: "Dune Dashboard", icon: BentoGrid, external: true, href: "#" },
  { label: "Docs", icon: FileIcon, external: true, href: "#" },
];

export default function Sidebar({ showV2 = false, isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const sidebarWidth = isCollapsed ? 88 : 272;

  return (
    <aside 
      className="fixed left-0 top-0 h-screen bg-white border-r border-[#ebebeb] flex flex-col z-20 transition-all duration-300 ease-in-out"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Header */}
      <div className={`h-[80px] flex items-center justify-between border-b border-purple-200 transition-all duration-300 ease-in-out ${isCollapsed ? 'px-[29px]' : 'px-6'}`}>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${isCollapsed ? 'w-0 opacity-0' : 'w-[88px] opacity-100'}`}>
          <Image
            src="/assets/stbl-logo.svg"
            alt="STBL"
            width={88}
            height={32}
            priority
            className="min-w-[88px]"
          />
        </div>
        <button 
          onClick={onToggle}
          className="border border-purple-200 rounded-lg p-0.5 shadow-sm hover:bg-gray-50 flex-shrink-0"
        >
          <ChevronDoubleLeft className={`w-6 h-6 text-black-300 transition-transform duration-300 ease-in-out ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Navigation */}
      <div className={`flex-1 flex flex-col justify-between pt-5 pb-4 overflow-y-auto overflow-x-hidden transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-2'}`}>
        <LayoutGroup id="sidebar-nav">
          <nav className="flex flex-col gap-1">
            {mainNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const displayLabel = item.key === "mfs" && showV2 ? "MFS 2.0" : item.label;
              return (
                <NavItem
                  key={item.key}
                  label={displayLabel}
                  icon={
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-purple-500" : "opacity-[0.27] text-black"
                      }`}
                    />
                  }
                  href={item.href}
                  active={isActive}
                  layoutGroup="sidebar"
                  isCollapsed={isCollapsed}
                />
              );
            })}
          </nav>
        </LayoutGroup>

        {/* Bottom section */}
        <div className="flex flex-col gap-1.5">
          {showV2 && (
            <a
              href="#"
              className="relative flex items-center justify-center bg-accent rounded-lg h-[40px] mb-3 text-white text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            >
              <span className={`absolute transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}>
                View V2
              </span>
              <span className={`absolute transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
                V2
              </span>
            </a>
          )}
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              icon={<item.icon className="w-5 h-5 opacity-[0.27]" />}
              href={item.href}
              external
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
