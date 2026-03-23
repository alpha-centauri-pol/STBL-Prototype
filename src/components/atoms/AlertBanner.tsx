"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type AlertVariant = "default" | "error" | "warning" | "success" | "info";

interface AlertBannerProps {
  variant?: AlertVariant;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  visible?: boolean;
  className?: string;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string }> =
  {
    default: {
      container: "bg-black-15 text-black-400",
      icon: "text-black-400",
    },
    error: {
      container: "bg-red-50 text-red-500",
      icon: "text-red-500",
    },
    warning: {
      container: "bg-orange-50 text-orange-500",
      icon: "text-orange-500",
    },
    success: {
      container: "bg-green-50 text-green-500",
      icon: "text-green-500",
    },
    info: {
      container: "bg-blue-50 text-blue-500",
      icon: "text-blue-500",
    },
  };

function DefaultIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const variantIcons: Record<
  AlertVariant,
  ({ className }: { className?: string }) => ReactNode
> = {
  default: DefaultIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  info: InfoIcon,
};

export function AlertBanner({
  variant = "default",
  children,
  dismissible = false,
  onDismiss,
  visible = true,
  className = "",
}: AlertBannerProps) {
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
          transition={{
            height: { duration: 0.35, ease: [0.25, 0, 0.2, 1] },
            opacity: { duration: 0.2, ease: "easeOut" },
            marginTop: { duration: 0.35, ease: [0.25, 0, 0.2, 1] },
            marginBottom: { duration: 0.35, ease: [0.25, 0, 0.2, 1] },
          }}
          style={{ overflow: "hidden" }}
        >
          <motion.div
            role="alert"
            className={`
              flex items-center gap-3 rounded-lg px-4 py-3
              ${styles.container}
              ${className}
            `}
            initial={prefersReducedMotion ? false : { y: 8, filter: "blur(4px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={prefersReducedMotion ? {} : { y: -8, filter: "blur(4px)", opacity: 0 }}
            transition={{
              y: { duration: 0.25, ease: [0.25, 0, 0.2, 1] },
              filter: { duration: 0.25, ease: "easeOut" },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <span className={`shrink-0 ${styles.icon}`}>
              <Icon />
            </span>
            <div className="flex-1 text-sm">{children}</div>
            {dismissible && (
              <button
                type="button"
                onClick={onDismiss}
                className={`shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100 ${styles.icon}`}
                aria-label="Dismiss"
              >
                <CloseIcon />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AlertBanner;
