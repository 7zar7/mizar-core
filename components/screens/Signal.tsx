"use client";

import { motion } from "framer-motion";
import { SectionTag } from "../SectionTag";

const EASE = [0.4, 0, 0.2, 1] as const;
const SLAM = [0.2, 0, 0, 1] as const;

/* Screen 1 — "losing deals." burns in from blur first; context arrives. */
function LosingDeals() {
  return (
    <section
      className="relative flex w-full flex-col items-center justify-center px-6 text-center"
      style={{ minHeight: "78vh" }}
    >
      <SectionTag n="02" />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
        style={{
          fontWeight: 700,
          fontSize: "clamp(22px,2.6vw,34px)",
          color: "var(--text-secondary)",
          letterSpacing: "-0.02em",
          marginBottom: 4,
        }}
      >
        Your site is
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          fontWeight: 900,
          fontSize: "clamp(48px,7.5vw,104px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "#c41e0e",
        }}
      >
        losing deals.
      </motion.h2>
    </section>
  );
}

/* Screens 2 + 3 — one punch: agency line, laser crack, then the slam. */
function ThePunch() {
  return (
    <section
      className="relative flex w-full flex-col items-center justify-center gap-[10vh] px-6 text-center"
      style={{ minHeight: "150vh" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          fontWeight: 900,
          fontSize: "clamp(40px,6vw,84px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
        }}
      >
        The agency said 6 weeks.
      </motion.h2>

      {/* the laser crack */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 0.3, ease: "linear" }}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100vw",
          height: 1,
          background: "#c41e0e",
          transformOrigin: "left",
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 40, scale: 1.1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.4, ease: SLAM, delay: 0.35 }}
        style={{
          fontWeight: 900,
          fontSize: "clamp(40px,6vw,84px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "var(--text-secondary)",
        }}
      >
        We said <span style={{ color: "#c41e0e" }}>5 days.</span>
      </motion.h2>
    </section>
  );
}

export function Signal() {
  return (
    <>
      <LosingDeals />
      <ThePunch />
    </>
  );
}
