"use client";

import { type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";

interface TabItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

type TabOrientation = "horizontal" | "vertical";

interface TabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  orientation?: TabOrientation;
  id?: string;
  className?: string;
}

const springTransition = { type: "spring" as const, duration: 0.3, bounce: 0.15 };

export function Tab({
  tabs,
  activeTab,
  onTabChange,
  orientation = "horizontal",
  id = "default",
  className = "",
}: TabProps) {
  const prefersReducedMotion = useReducedMotion();

  if (orientation === "vertical") {
    return (
      <LayoutGroup id={`tab-group-${id}`}>
        <div className={`flex flex-col gap-1 ${className}`}>
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onTabChange(tab.value)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer text-left
                  transition-colors duration-150
                  ${
                    isActive
                      ? "text-purple-500"
                      : "text-black-400 hover:bg-black-15"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId={`tab-bg-${id}`}
                    className="absolute inset-0 bg-purple-100 rounded-lg"
                    transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId={`tab-bar-${id}`}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-500 rounded-r"
                    transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
    );
  }

  return (
    <LayoutGroup id={`tab-group-${id}`}>
      <div
        className={`inline-flex self-start items-center gap-1 bg-black-15 rounded-full p-1 ${className}`}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={`
                relative inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer
                transition-colors duration-150
                ${
                  isActive
                    ? "text-black-500"
                    : "text-black-300 hover:text-black-400"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId={`tab-pill-${id}`}
                  className="absolute inset-0 bg-white rounded-full"
                  transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1.5">
                {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export function TabContent({
  value,
  activeTab,
  children,
}: {
  value: string;
  activeTab: string;
  children: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="popLayout">
      {value === activeTab && (
        <motion.div
          key={value}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 6, filter: "blur(3px)" }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -6, filter: "blur(3px)" }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }
          }
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Tab;
