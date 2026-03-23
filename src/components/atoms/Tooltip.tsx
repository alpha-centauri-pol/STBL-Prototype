"use client";

import { type ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom";
  align?: "left" | "center" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  align = "center",
  className = "",
}: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const show = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const rect = trigger.getBoundingClientRect();
    const tipHeight = tooltip.offsetHeight;
    const gap = 8;

    let top = 0;
    let left = 0;

    if (position === "top") {
      top = rect.top - tipHeight - gap;
    } else {
      top = rect.bottom + gap;
    }

    if (align === "left") {
      left = rect.left;
    } else if (align === "right") {
      left = rect.right;
    } else {
      left = rect.left + rect.width / 2;
    }

    setCoords({ top, left });
    setVisible(true);
  }, [position, align]);

  const hide = useCallback(() => setVisible(false), []);

  // CSS transform handles horizontal alignment
  const translateX =
    align === "left" ? "0%" : align === "right" ? "-100%" : "-50%";

  // Transform origin = arrow tip position so tooltip grows from the tip
  const originX =
    align === "left" ? "12px" : align === "right" ? "calc(100% - 12px)" : "50%";
  const originY = position === "top" ? "100%" : "0%";

  const arrowDirection =
    position === "top"
      ? "border-l-transparent border-r-transparent border-b-transparent"
      : "border-l-transparent border-r-transparent border-t-transparent";

  const arrowPositionClass =
    position === "top" ? "top-full border-t-black-500" : "bottom-full border-b-black-500";

  let arrowAlignClass = "left-1/2 -translate-x-1/2";
  if (align === "left") arrowAlignClass = "left-3";
  if (align === "right") arrowAlignClass = "right-3";

  return (
    <>
      <span
        ref={triggerRef}
        className={`inline-flex ${className}`}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {children}
      </span>
      {mounted &&
        createPortal(
          <div
            ref={tooltipRef}
            className="pointer-events-none"
            style={{
              position: "fixed",
              zIndex: 9999,
              top: coords.top,
              left: coords.left,
              opacity: visible ? 1 : 0,
              transform: visible
                ? `translateX(${translateX}) scaleY(1) scaleX(1)`
                : `translateX(${translateX}) scaleY(0.3) scaleX(0.7)`,
              transformOrigin: `${originX} ${originY}`,
              transition: visible
                ? "opacity 60ms ease-out, transform 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                : "opacity 50ms ease-in, transform 50ms ease-in",
            }}
          >
            <div className="relative bg-black-500 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
              {content}
              <div
                className={`
                  absolute w-0 h-0
                  border-[5px] border-solid
                  ${arrowDirection}
                  ${arrowPositionClass}
                  ${arrowAlignClass}
                `}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default Tooltip;
