"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 0 }
          : { opacity: 0, filter: "blur(2px)" }
      }
      animate={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 1, filter: "blur(0px)" }
      }
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
