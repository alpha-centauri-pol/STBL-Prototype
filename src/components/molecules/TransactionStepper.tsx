"use client";

import { motion } from "framer-motion";

interface Step {
  label: string;
  description?: string;
  status: "pending" | "active" | "completed" | "error";
}

interface TransactionStepperProps {
  steps: Step[];
  className?: string;
}

function CheckIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

function XIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3L9 9M9 3L3 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepIndicator({ status }: { status: Step["status"] }) {
  switch (status) {
    case "completed":
      return (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.3 }}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white"
        >
          <CheckIcon />
        </motion.div>
      );
    case "active":
      return (
        <div className="relative flex items-center justify-center w-6 h-6">
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="w-6 h-6 rounded-full bg-purple-500" />
        </div>
      );
    case "error":
      return (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [0, -3, 3, -2, 2, 0] }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white"
        >
          <XIcon />
        </motion.div>
      );
    case "pending":
    default:
      return (
        <div className="w-6 h-6 rounded-full border-2 border-black-200 bg-transparent" />
      );
  }
}

export function TransactionStepper({
  steps,
  className = "",
}: TransactionStepperProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.2,
              delay: index * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex gap-3"
          >
            {/* Indicator column */}
            <div className="flex flex-col items-center">
              <StepIndicator status={step.status} />
              {!isLast && (
                <motion.div
                  className="w-0.5 flex-1 min-h-[24px]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.08 + 0.15,
                    ease: "easeOut",
                  }}
                  style={{
                    transformOrigin: "top",
                    backgroundColor:
                      step.status === "completed" ? "var(--color-green-500, #22c55e)" : "var(--color-black-200, #d1d5db)",
                  }}
                />
              )}
            </div>

            {/* Label column */}
            <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
              <span
                className={`text-sm font-medium ${
                  step.status === "active"
                    ? "text-purple-500 font-semibold"
                    : step.status === "error"
                      ? "text-red-500"
                      : "text-black-300"
                }`}
              >
                {step.label}
              </span>
              {step.description && (
                <p
                  className={`text-xs mt-0.5 ${
                    step.status === "error"
                      ? "text-red-400"
                      : "text-black-300"
                  }`}
                >
                  {step.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default TransactionStepper;
