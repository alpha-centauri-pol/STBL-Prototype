"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "@/components/icons";

interface NavItemProps {
  label: string;
  icon: ReactNode;
  active?: boolean;
  href: string;
  external?: boolean;
  className?: string;
  layoutGroup?: string;
  isCollapsed?: boolean;
}

export function NavItem({
  label,
  icon,
  active = false,
  href,
  external = false,
  className = "",
  layoutGroup = "nav",
  isCollapsed = false,
}: NavItemProps) {
  const transition = { duration: 0 };

  const content = (
    <div
      className={`
        relative flex items-center py-2.5 rounded-lg transition-all duration-300 ease-in-out active:scale-[0.98]
        ${active ? "text-black-500" : "text-black-500 hover:bg-black-15"}
        ${isCollapsed ? "px-[26px] gap-0" : "px-4 gap-3"}
        ${className}
      `}
    >
      {active && (
        <motion.div
          layoutId={`nav-bg-${layoutGroup}`}
          className="absolute inset-0 bg-purple-100 rounded-lg"
          transition={transition}
        />
      )}
      {active && (
        <motion.div
          layoutId={`nav-bar-${layoutGroup}`}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-500 rounded-r"
          transition={transition}
        />
      )}
      <span className="relative z-10 flex-shrink-0 transition-opacity duration-150">{icon}</span>
      <div 
        className={`relative z-10 flex items-center overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100 flex-1'}`}
      >
        <span className="flex-1 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
        <span className="flex-shrink-0 ml-2">
          {external ? (
            <ExternalLink className="w-4 h-4 opacity-50" />
          ) : (
            <ChevronRight className="w-4 h-4 opacity-30" />
          )}
        </span>
      </div>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

export default NavItem;
