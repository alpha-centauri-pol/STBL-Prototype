"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { motion as tokens } from "@/lib/motion";

// ─── Types ──────────────────────────────────────────────────────────

interface SliderMark {
  value: number;
  label: string;
}

interface SliderProps {
  label?: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  marks?: SliderMark[];
  suffix?: string;
  className?: string;
  step?: number;
  disabled?: boolean;
}

// ─── Helpers ────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function pctToValue(pct: number, min: number, max: number, step: number): number {
  const raw = min + pct * (max - min);
  const stepped = Math.round(raw / step) * step;
  return clamp(stepped, min, max);
}

function valueToPct(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

function snapToNearestMark(
  pct: number,
  marks: SliderMark[],
  min: number,
  max: number,
): number {
  let closest = pct;
  let minDist = Infinity;
  for (const mark of marks) {
    const markPct = valueToPct(mark.value, min, max);
    const dist = Math.abs(pct - markPct);
    if (dist < minDist) {
      minDist = dist;
      closest = markPct;
    }
  }
  return closest;
}

// ─── Component ──────────────────────────────────────────────────────

export function Slider({
  label,
  min,
  max,
  value,
  onChange,
  marks,
  suffix,
  className = "",
  step = 1,
  disabled = false,
}: SliderProps) {
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const isClick = useRef(true);

  // Motion values for spring-animated fill
  const pct = valueToPct(value, min, max);
  const fillMotion = useMotionValue(pct * 100);
  const fillSpring = useSpring(fillMotion, {
    stiffness: 180,
    damping: 24,
  });

  // Keep fillMotion synced with external value changes when not dragging
  useEffect(() => {
    if (!isDragging.current) {
      if (prefersReduced) {
        fillMotion.set(pct * 100);
      } else {
        animate(fillMotion, pct * 100, tokens.spring.physical);
      }
    }
  }, [pct, fillMotion, prefersReduced]);

  // Fill width as a percentage string
  const fillWidth = useTransform(fillSpring, (v) => `${clamp(v, 0, 100)}%`);

  // ── Position from track ──
  const getPctFromPointer = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      return clamp((clientX - rect.left) / rect.width, 0, 1);
    },
    [],
  );

  // ── Apply value ──
  const applyValue = useCallback(
    (newPct: number, animateSpring: boolean = false) => {
      const clamped = clamp(newPct, 0, 1);
      const newValue = pctToValue(clamped, min, max, step);
      onChange(newValue);
      if (animateSpring && !prefersReduced) {
        animate(fillMotion, clamped * 100, tokens.spring.physical);
      } else {
        fillMotion.set(clamped * 100);
      }
    },
    [min, max, step, onChange, fillMotion, prefersReduced],
  );

  // ── Pointer handlers ──
  const handlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      isDragging.current = true;
      isClick.current = true;
      dragStartX.current = e.clientX;

      // Immediately set fill to pointer position
      const rawPct = getPctFromPointer(e.clientX);
      applyValue(rawPct);
    },
    [disabled, getPctFromPointer, applyValue],
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || disabled) return;

      // If moved more than 4px, it's a drag not a click
      if (Math.abs(e.clientX - dragStartX.current) > 4) {
        isClick.current = false;
      }

      const rawPct = getPctFromPointer(e.clientX);
      applyValue(rawPct);
    },
    [disabled, getPctFromPointer, applyValue],
  );

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging.current || disabled) return;

      isDragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    [disabled],
  );

  // ── Keyboard support ──
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const range = max - min;
      let newValue = value;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = clamp(value + step, min, max);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = clamp(value - step, min, max);
          break;
        case "Home":
          e.preventDefault();
          newValue = min;
          break;
        case "End":
          e.preventDefault();
          newValue = max;
          break;
        case "PageUp":
          e.preventDefault();
          newValue = clamp(value + range * 0.1, min, max);
          break;
        case "PageDown":
          e.preventDefault();
          newValue = clamp(value - range * 0.1, min, max);
          break;
        default:
          return;
      }

      onChange(pctToValue(valueToPct(newValue, min, max), min, max, step));
    },
    [disabled, min, max, step, value, onChange],
  );

  // ── Display value ──
  const displayValue = `${value}${suffix ? ` ${suffix}` : ""}`;

  return (
    <div
      className={`flex flex-col gap-2 ${disabled ? "opacity-40 pointer-events-none" : ""} ${className}`}
    >
      {/* ── Top row: label + value ── */}
      {(label || true) && (
        <div className="flex items-center justify-between">
          {label ? (
            <span className="text-sm font-medium text-black-400">
              {label}
            </span>
          ) : (
            <span />
          )}
          <span
            className="text-sm font-medium text-black-500"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {displayValue}
          </span>
        </div>
      )}

      {/* ── Track ── */}
      <div
        ref={trackRef}
        role="slider"
        aria-label={label ?? "Slider"}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`
          relative h-2 w-full select-none rounded-full bg-black-50
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 focus-visible:ring-offset-2
        `}
      >
        {/* ── Fill ── */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-purple-500"
          style={{ width: fillWidth }}
        />

        {/* ── Thumb ── */}
        <motion.div
          className={`
            absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            w-5 h-5 rounded-full bg-white border-2 border-purple-500
            shadow-sm transition-[transform,box-shadow] duration-150
            pointer-events-none
            hover:scale-110 hover:shadow-md
          `}
          style={{ left: fillWidth }}
        />
      </div>

      {/* ── Marks (below track) ── */}
      {marks && marks.length > 0 && (
        <div className="relative h-5">
          {marks.map((mark) => {
            const markPct = valueToPct(mark.value, min, max) * 100;
            const isActive = mark.value === value;
            return (
              <button
                key={mark.value}
                type="button"
                onClick={() => {
                  if (disabled) return;
                  onChange(mark.value);
                  if (!prefersReduced) {
                    animate(fillMotion, markPct, tokens.spring.physical);
                  }
                }}
                disabled={disabled}
                className={`absolute -translate-x-1/2 text-xs transition-colors duration-150 ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                } ${
                  isActive
                    ? "text-purple-500 font-medium"
                    : "text-black-300 hover:text-black-400"
                }`}
                style={{ left: `${markPct}%` }}
              >
                {mark.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Slider;
