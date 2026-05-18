"use client";

import { motion } from "framer-motion";

const LINES: { text: string; tone: "primary" | "secondary"; size: number }[] = [
  {
    text: "Your product is ready. Your site isn't.",
    tone: "primary",
    size: 1,
  },
  {
    text: "The agency quoted six weeks. You needed it yesterday.",
    tone: "primary",
    size: 0.86,
  },
  {
    text: "The freelancer built what you asked. Not what you needed.",
    tone: "secondary",
    size: 0.86,
  },
];

function Line({
  text,
  tone,
  size,
  lineIndex,
}: {
  text: string;
  tone: "primary" | "secondary";
  size: number;
  lineIndex: number;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.04, delayChildren: lineIndex * 0.2 }}
      className="flex flex-wrap"
      style={{
        fontWeight: 700,
        fontSize: `calc(clamp(28px,4vw,52px) * ${size})`,
        lineHeight: 1.15,
        color:
          tone === "primary"
            ? "var(--text-primary)"
            : "var(--text-secondary)",
      }}
    >
      {words.map((w, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: 10, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

export function Signal() {
  return (
    <section className="relative flex min-h-screen w-full items-center">
      <div
        className="flex w-full flex-col gap-7"
        style={{ paddingLeft: "15vw", paddingRight: "6vw", maxWidth: 1100 }}
      >
        {LINES.map((l, i) => (
          <Line key={i} {...l} lineIndex={i} />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
          style={{ maxWidth: 800 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
            style={{
              height: 1,
              background: "var(--border)",
              transformOrigin: "left",
            }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="label-mono mt-4"
          >
            If any of that landed — the configurator is two screens down.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
