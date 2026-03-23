"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/organisms/Sidebar";
import TopNav from "@/components/organisms/TopNav";
import { PageTransition } from "@/components/atoms/PageTransition";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved === "true") setIsCollapsed(true);
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem("sidebarCollapsed", String(newValue));
  };

  const showV2 = pathname.startsWith("/mfs");
  const connected = pathname.startsWith("/portfolio") || pathname.startsWith("/mfs");
  const walletAddress = connected ? "0xSrr...rsA4" : undefined;

  const sidebarWidth = isCollapsed ? 88 : 272;

  return (
    <div
      className="relative min-h-screen bg-white"
      style={{ visibility: isMounted ? "visible" : "hidden" }}
    >
      {/* Background gradient */}
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
        showV2={showV2}
        isCollapsed={isCollapsed}
        onToggle={handleToggle}
      />
      <TopNav
        connected={connected}
        walletAddress={walletAddress}
        isCollapsed={isCollapsed}
      />

      {/* Main content */}
      <main
        className="relative pt-[80px] min-h-screen z-[1] transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <PageTransition key={pathname}>{children}</PageTransition>
      </main>
    </div>
  );
}
