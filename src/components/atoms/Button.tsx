"use client";

import { type ReactNode, useRef, useLayoutEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "pill";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-purple-500 text-white rounded-full",
    "hover:bg-purple-500 hover:shadow-[inset_0_0_0_100px_rgba(255,255,255,0.1)]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
  ].join(" "),
  secondary: [
    "border border-purple-500 text-purple-500 bg-white rounded-full",
    "hover:bg-purple-100 active:bg-purple-400/30",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white",
  ].join(" "),
  ghost: [
    "bg-black-15 text-black-300 rounded-full",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  danger: [
    "text-red-500 rounded-full",
    "hover:bg-red-500/10 active:bg-red-500/20",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  ].join(" "),
  pill: [
    "border border-black-50 text-black-400 bg-white rounded-full",
    "hover:border-black-200 active:border-black-300 active:bg-black-15",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-black-50",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-6 text-base",
};

const pillSize = "h-7 px-3 text-xs";

const TRANSITION_DURATION = 0.15;
const TRANSITION_EASE = [0.25, 0.1, 0.25, 1] as const;

export function Button({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const measuredWidth = useRef<number | undefined>(undefined);

  // Measure width whenever NOT loading so we have it ready when loading starts
  useLayoutEffect(() => {
    if (!loading && btnRef.current) {
      measuredWidth.current = btnRef.current.offsetWidth;
    }
  });

  const motionProps = prefersReducedMotion
    ? {
        initial: false,
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0 },
      }
    : undefined;

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={loading && measuredWidth.current ? { minWidth: measuredWidth.current } : undefined}
      className={`
        inline-flex items-center justify-center gap-2 font-body font-medium
        overflow-hidden transition-[colors,box-shadow] duration-150
        outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30
        ${variantStyles[variant]}
        ${variant === "pill" ? pillSize : sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="loading"
            className="inline-flex items-center justify-center"
            {...(motionProps ?? {
              initial: { y: 10, opacity: 0, filter: "blur(3px)" },
              animate: { y: 0, opacity: 1, filter: "blur(0px)" },
              exit: { y: -10, opacity: 0, filter: "blur(3px)" },
              transition: { duration: TRANSITION_DURATION, ease: TRANSITION_EASE },
            })}
          >
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.span>
        ) : (
          <motion.span
            key="content"
            className="inline-flex items-center justify-center gap-2"
            {...(motionProps ?? {
              initial: { y: 10, opacity: 0, filter: "blur(3px)" },
              animate: { y: 0, opacity: 1, filter: "blur(0px)" },
              exit: { y: -10, opacity: 0, filter: "blur(3px)" },
              transition: { duration: TRANSITION_DURATION, ease: TRANSITION_EASE },
            })}
          >
            {icon ? <span className="flex-shrink-0">{icon}</span> : null}
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default Button;
