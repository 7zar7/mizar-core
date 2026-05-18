"use client";

import { motion } from "framer-motion";
import { SectionTag } from "../SectionTag";

const EASE = [0.4, 0, 0.2, 1] as const;

function Statement({
  text,
  tone,
  redFrom,
  tag,
  minH,
}: {
  text: string;
  tone: "primary" | "secondary";
  redFrom?: number;
  tag?: string;
  minH: string;
}) {
  const words = text.split(" ");
  return (
    <section
      className="relative flex w-full items-center justify-center px-6"
      style={{ minHeight: minH }}
    >
      {tag && <SectionTag n={tag} />}
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.55 }}
        transition={{ staggerChildren: 0.06 }}
        className="flex max-w-[1100px] flex-wrap justify-center text-center"
        style={{
          fontWeight: 900,
          letterSpacing: "-0.03em",
          fontSize: "clamp(48px,7vw,96px)",
          lineHeight: 1.05,
          color:
            tone === "primary"
              ? "var(--text-primary)"
              : "var(--text-secondary)",
        }}
      >
        {words.map((w, i) => (
          <span key={i} className="mr-[0.26em] overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: 16, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: EASE }}
              style={
                redFrom !== undefined && i >= redFrom
                  ? { color: "#c41e0e" }
                  : undefined
              }
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </section>
  );
}

export function Signal() {
  return (
    <>
      <Statement
        tag="02"
        text="Your site is losing you deals."
        tone="primary"
        minH="78vh"
      />
      <Statement
        text="The agency said 6 weeks."
        tone="primary"
        minH="100vh"
      />
      <Statement
        text="We said 5 days."
        tone="secondary"
        redFrom={2}
        minH="100vh"
      />
    </>
  );
}
