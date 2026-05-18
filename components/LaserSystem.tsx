"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useSite } from "./SiteProvider";

/**
 * The permanent structural DNA: two vertical laser lines at 28vw / 72vw,
 * plus the anamorphic lens (subtle blur on the outer zones).
 * Fixed, full-viewport, pointer-events: none.
 */
export function LaserSystem() {
  const { pulseKey, isMobile } = useSite();
  const left = useAnimationControls();
  const right = useAnimationControls();

  useEffect(() => {
    if (pulseKey === 0) return;
    const ripple = { opacity: [1, 0.3, 1] };
    const t = { duration: 0.4, ease: "easeInOut" as const };
    left.start({ ...ripple, transition: t });
    right.start({ ...ripple, transition: t });
  }, [pulseKey, left, right]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ contain: "strict" }}
    >
      {/* Anamorphic lens — outer zones softly defocused (desktop only) */}
      {!isMobile && (
        <>
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: "var(--laser-left)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              background: "rgba(245,245,247,0.15)",
              maskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0"
            style={{
              width: "calc(100vw - var(--laser-right))",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              background: "rgba(245,245,247,0.15)",
              maskImage:
                "linear-gradient(to left, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 0%, black 70%, transparent 100%)",
            }}
          />
        </>
      )}

      <motion.span
        animate={left}
        className="absolute inset-y-0"
        style={{
          left: "var(--laser-left)",
          width: 1,
          background: "var(--border)",
        }}
      />
      <motion.span
        animate={right}
        className="absolute inset-y-0"
        style={{
          left: "var(--laser-right)",
          width: 1,
          background: "var(--border)",
        }}
      />
    </div>
  );
}
