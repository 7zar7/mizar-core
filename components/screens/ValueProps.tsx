"use client";

import { motion } from "framer-motion";
import { SectionTag } from "../SectionTag";

const EASE = [0.4, 0, 0.2, 1] as const;

const STATEMENTS: { label: string; lines: string[] }[] = [
  {
    label: "// ROI",
    lines: [
      "One closed client pays for the site.",
      "Everything after that is pure profit.",
    ],
  },
  {
    label: "// SIGNAL",
    lines: ["Large checks don't tolerate", "amateur design."],
  },
  {
    label: "// METHOD",
    lines: ["We write the process logic first.", "Pixels come second."],
  },
];

function Statement({
  label,
  lines,
  tag,
}: {
  label: string;
  lines: string[];
  tag?: string;
}) {
  const words = lines.join(" \n ").split(" ");
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-center"
    >
      {tag && <SectionTag n={tag} />}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#C41E0E",
          marginBottom: 24,
        }}
      >
        {label}
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.05 }}
        className="flex max-w-[920px] flex-wrap justify-center"
        style={{
          fontWeight: 800,
          fontSize: "clamp(32px,4.5vw,64px)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}
      >
        {words.map((w, i) =>
          w === "\n" ? (
            <span key={i} style={{ flexBasis: "100%", height: 0 }} />
          ) : (
            <span key={i} className="mr-[0.28em] overflow-hidden">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: 14, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {w}
              </motion.span>
            </span>
          ),
        )}
      </motion.h2>
    </section>
  );
}

export function ValueProps() {
  return (
    <>
      {STATEMENTS.map((s, i) => (
        <Statement
          key={s.label}
          label={s.label}
          lines={s.lines}
          tag={i === 0 ? "VP" : undefined}
        />
      ))}

      <section className="relative flex min-h-[60vh] w-full items-center justify-center px-6">
        <div style={{ width: "min(680px, 86vw)" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              height: 0,
              borderTop: "1px solid #c41e0e",
              transformOrigin: "left",
            }}
          />
          <motion.a
            href="#evidence"
            data-cursor
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mono mt-4 inline-block"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--text-muted)",
            }}
          >
            Three engagements that prove it. →
          </motion.a>
        </div>
      </section>
    </>
  );
}
