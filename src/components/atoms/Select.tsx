"use client";

import { type ReactNode, useState, useRef, useEffect, useCallback } from "react";

interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SelectProps {
  label?: string;
  value?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  helperText?: string;
  className?: string;
  disabled?: boolean;
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Select({
  label,
  value,
  options,
  onChange,
  helperText,
  className = "",
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Click outside to close
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  // Reset highlighted index when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const idx = options.findIndex((opt) => opt.value === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, options, value]);

  const toggleOpen = useCallback(() => {
    if (!disabled) setIsOpen((prev) => !prev);
  }, [disabled]);

  const selectOption = useCallback(
    (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            selectOption(options[highlightedIndex].value);
          } else {
            setIsOpen(true);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : options.length - 1,
            );
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
      }
    },
    [disabled, isOpen, highlightedIndex, options, selectOption],
  );

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-black-400">{label}</label>
      )}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          className={`
            w-full flex items-center border rounded-lg px-4 py-3 text-base text-left outline-none
            transition-colors
            ${isOpen ? "border-purple-500" : "border-black-50"}
            ${disabled ? "opacity-50 cursor-not-allowed bg-black-15" : "bg-white cursor-pointer focus:border-purple-500"}
          `}
        >
          {selectedOption?.icon && (
            <span className="mr-3 flex items-center shrink-0">
              {selectedOption.icon}
            </span>
          )}
          <span className="flex-1 truncate">
            {selectedOption?.label ?? "\u00A0"}
          </span>
          <span className="ml-2 text-black-300 shrink-0">
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        <div
          role="listbox"
          style={{
            transformOrigin: "top",
            transition: "transform 100ms ease-out, opacity 100ms ease-out",
            transform: isOpen ? "scale(1)" : "scale(0.95)",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-4px)",
                  transition: `opacity 100ms ease-out ${index * 20}ms, transform 100ms ease-out ${index * 20}ms`,
                }}
                className={`
                  flex items-center px-4 py-3 text-base cursor-pointer transition-colors
                  ${isSelected ? "bg-purple-100 text-purple-500" : ""}
                  ${isHighlighted && !isSelected ? "bg-black-15" : ""}
                `}
              >
                {option.icon && (
                  <span className="mr-3 flex items-center shrink-0">
                    {option.icon}
                  </span>
                )}
                <span className="truncate">{option.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      {helperText && (
        <span className="text-xs text-black-300">{helperText}</span>
      )}
    </div>
  );
}

export default Select;
