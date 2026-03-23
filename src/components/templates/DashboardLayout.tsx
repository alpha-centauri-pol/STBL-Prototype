"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import TopNav from "@/components/organisms/TopNav";
import { PageTransition } from "@/components/atoms/PageTransition";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: string;
  connected?: boolean;
  walletAddress?: string;
  showV2?: boolean;
}

export default function DashboardLayout({
  children,
  activePage,
  connected = false,
  walletAddress,
  showV2 = false,
}: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved === 'true') {
      setIsCollapsed(true);
    }
  }, []);

  const handleToggle = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem('sidebarCollapsed', String(newValue));
  };

  // Use default width during SSR to avoid hydration mismatch, then apply actual width
  const sidebarWidth = !isMounted ? 272 : (isCollapsed ? 88 : 272);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Background gradient — fixed behind main content area */}
      <div
        className="fixed top-0 right-0 bottom-0 pointer-events-none z-0 transition-all duration-300 ease-in-out"
        style={{
          left: `${sidebarWidth}px`,
          backgroundImage: "url(/assets/bg-gradient.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Sidebar 
        activePage={activePage} 
        showV2={showV2} 
        isCollapsed={!isMounted ? false : isCollapsed}
        onToggle={handleToggle}
      />
      <TopNav 
        connected={connected} 
        walletAddress={walletAddress} 
        isCollapsed={!isMounted ? false : isCollapsed}
      />

      {/* Main content */}
      <main 
        className="relative pt-[80px] min-h-screen z-[1] transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
