// Motion tokens — centralized animation values for the STBL design system
export const motion = {
  // ─── Springs ───────────────────────────────────────────────
  spring: {
    /** Default for UI elements entering/exiting. Smooth, no bounce. */
    default: { type: "spring" as const, duration: 0.45, bounce: 0 },

    /** Interactive feedback: buttons, cards, toggles. Slight bounce. */
    interactive: { type: "spring" as const, duration: 0.3, bounce: 0.15 },

    /** High-frequency actions: tabs, toggles, command palette. */
    snappy: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const },

    /** Low-frequency, celebratory: onboarding, achievements. */
    gentle: { type: "spring" as const, duration: 0.6, bounce: 0.05 },

    /** Drag/gesture release: maintains momentum feel. */
    physical: { type: "spring" as const, stiffness: 300, damping: 30 },
  },

  // ─── Enter/Exit Presets ────────────────────────────────────
  enter: {
    /** Standard fade-up-blur entry */
    default: { opacity: 0, y: 8, filter: "blur(4px)" },
    /** Subtle entry for secondary elements */
    subtle: { opacity: 0, y: 4, filter: "blur(2px)" },
    /** Scale entry for elements emerging from a trigger */
    scale: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    /** No vertical movement, just fade + blur */
    fade: { opacity: 0, filter: "blur(4px)" },
  },

  exit: {
    /** Standard exit — subtler than enter (smaller y, same blur) */
    default: { opacity: 0, y: 4, filter: "blur(4px)" },
    /** Scale exit for elements returning to a trigger */
    scale: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    /** Fade only */
    fade: { opacity: 0, filter: "blur(4px)" },
  },

  // ─── Duration Lookup (by frequency) ───────────────────────
  duration: {
    /** 100+/day: instant or near-instant */
    high: 0.15,
    /** 10–100/day: purposeful but brisk */
    medium: 0.3,
    /** <10/day: can breathe */
    low: 0.45,
    /** One-time: can be dramatic */
    rare: 0.6,
  },

  // ─── Easing Curves ────────────────────────────────────────
  ease: {
    /** Default out curve — smooth deceleration */
    out: [0.25, 0.1, 0.25, 1] as const,
    /** Snappy in-out for toggles and switches */
    inOut: [0.4, 0, 0.2, 1] as const,
    /** Aggressive out for dismissals */
    fastOut: [0, 0, 0.2, 1] as const,
    /** Gentle out for celebrations */
    gentleOut: [0.16, 1, 0.3, 1] as const,
  },

  // ─── Stagger Delays ───────────────────────────────────────
  stagger: {
    /** Between items in a list */
    list: 0.05,
    /** Between major sections */
    section: 0.1,
    /** Between cards in a grid */
    grid: 0.03,
  },
} as const;
