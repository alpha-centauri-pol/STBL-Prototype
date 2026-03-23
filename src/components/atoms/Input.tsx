"use client";

import { type ChangeEvent } from "react";

interface InputAction {
  label: string;
  onClick: () => void;
}

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  suffix?: string;
  actions?: InputAction[];
  disabled?: boolean;
  className?: string;
  type?: string;
  name?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  suffix,
  actions,
  disabled = false,
  className = "",
  type = "text",
  name,
}: InputProps) {
  const hasRightContent = suffix || (actions && actions.length > 0);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-black-400">{label}</label>
      )}
      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full border rounded-lg px-4 py-3 text-base outline-none transition-all duration-150
            ${error ? "border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-black-50 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"}
            ${disabled ? "opacity-50 cursor-not-allowed bg-black-15" : "bg-white"}
            ${hasRightContent ? "pr-32" : ""}
          `}
        />
        {hasRightContent && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {actions &&
              actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  disabled={disabled}
                  className="h-7 px-3 text-xs border border-black-50 rounded-full text-black-400 bg-white hover:border-black-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {action.label}
                </button>
              ))}
            {suffix && (
              <span className="text-sm font-medium text-black-300">
                {suffix}
              </span>
            )}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
      {!error && helperText && (
        <span className="text-xs text-black-300">{helperText}</span>
      )}
    </div>
  );
}

export default Input;
