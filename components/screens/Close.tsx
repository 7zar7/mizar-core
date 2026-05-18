"use client";

import { motion } from "framer-motion";
import { SectionTag } from "../SectionTag";

export function Close() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{ background: "#1a1a1e" }}
    >
      <SectionTag n="05" dark />
      {/* ambient radial pulses */}
      {[0, 2.5].map((delay) => (
        <motion.div
          key={delay}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: 1200,
            height: 1200,
            marginLeft: -600,
            marginTop: -600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
          }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0, 1, 0] }}
          transition={{
            duration: 5,
            delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* faint laser lines for the dark section */}
      <span
        aria-hidden
        className="absolute inset-y-0"
        style={{
          left: "28vw",
          width: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-y-0"
        style={{
          left: "72vw",
          width: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      />

      <div className="relative z-[1] flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          AVAILABILITY
        </motion.p>

        <motion.span
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          style={{
            display: "block",
            width: 40,
            height: 2,
            background: "#c41e0e",
            marginTop: 24,
            transformOrigin: "left",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="h-display mt-6"
          style={{ fontSize: "clamp(40px,6vw,80px)", color: "#fff" }}
        >
          We take 2–3 projects
          <br />
          per month.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6"
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          Not to manufacture scarcity. To protect the quality of what we
          build.
        </motion.p>

        <motion.a
          href="#configurator"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="btn-light mt-10 px-9 py-5"
        >
          [ START A PROJECT ]
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mono mt-6"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}
        >
          Avg. response: 4 hours · First call: 30 min · No obligation
        </motion.p>
      </div>
    </section>
  );
}
