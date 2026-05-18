"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { useSite } from "./SiteProvider";

/**
 * Full-viewport section wrapper. Section transitions use depth (Z-axis):
 * incoming scales up + de-blurs, outgoing scales past + blurs out.
 * Mobile / reduced-motion: collapses to a plain fade.
 */
export function ZSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { pulseLasers, isMobile } = useSite();
  const reduce = useReducedMotion();
  const simple = isMobile || reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.95, 1, 1, 1.06],
  );
  const blurN = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [4, 0, 0, 6],
  );
  const filter = useTransform(blurN, (b) => `blur(${b.toFixed(2)}px)`);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.4 && v < 0.6) pulseLasers();
  });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex min-h-screen w-full items-center justify-center ${className}`}
    >
      <motion.div
        className="will-anim relative w-full"
        style={
          simple
            ? { opacity }
            : { opacity, scale, filter }
        }
      >
        {children}
      </motion.div>
    </section>
  );
}
