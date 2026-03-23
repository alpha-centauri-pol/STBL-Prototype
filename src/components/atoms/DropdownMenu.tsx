"use client";

import { type ReactNode } from "react";

interface DropdownItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export function DropdownMenu({
  items,
  selectedValue,
  onSelect,
  className = "",
}: DropdownMenuProps) {
  return (
    <div
      className={`
        bg-white border border-black-50 rounded-xl shadow-lg overflow-hidden
        ${className}
      `}
    >
      {items.map((item) => {
        const isSelected = item.value === selectedValue;
        const isDisabled = item.disabled === true;

        return (
          <button
            key={item.value}
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                onSelect?.(item.value);
              }
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 text-left text-base
              ${isSelected ? "bg-purple-100" : ""}
              ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-black-15"}
            `}
          >
            {item.icon && (
              <span className="flex-shrink-0">{item.icon}</span>
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default DropdownMenu;
