"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

type BadgeVariant = "purple" | "green" | "gray" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  purple: "bg-purple-100 text-purple-500",
  green: "bg-green-500/10 text-green-500",
  gray: "bg-black-15 text-black-400",
  outline: "border border-black-50 text-black-400",
};

export function Badge({
  variant = "purple",
  children,
  className = "",
  animate = true,
}: BadgeProps) {
  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={`
          inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full
          ${variantStyles[variant]}
          ${className}
        `}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
