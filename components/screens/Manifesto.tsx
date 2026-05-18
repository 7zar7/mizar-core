"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSite } from "../SiteProvider";

const SYS = "[ SYSTEM INITIALIZED. VER. 2026.4 ]";
const EASE = [0.4, 0, 0.2, 1] as const;

function Typewriter({ text, start }: { text: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => {
      setN((p) => {
        if (p >= text.length) {
          clearInterval(id);
          return p;
        }
        return p + 1;
      });
    }, 20);
    return () => clearInterval(id);
  }, [start, text.length]);
  return (
    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
      {text.slice(0, n)}
      <span style={{ opacity: n < text.length ? 1 : 0 }}>_</span>
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { setHeroPassed } = useSite();
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTyped(true), 300);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Animation window: starts at 15% scroll depth, completes by ~55%.
  const r: [number, number] = [0.15, 0.5];
  const wordOpacity = useTransform(scrollYProgress, r, [1, 0]);
  const mizarX = useTransform(scrollYProgress, r, ["0vw", "-45vw"]);
  const coreX = useTransform(scrollYProgress, r, ["0vw", "45vw"]);
  const wordBlurN = useTransform(scrollYProgress, r, [0, 12]);
  const wordBlur = useTransform(wordBlurN, (b) => `blur(${b.toFixed(1)}px)`);

  // The slashes do not leave with the words — they BECOME the laser lines.
  const slashRot = useTransform(scrollYProgress, [0.15, 0.55], [0, 90]);
  const slashScaleY = useTransform(scrollYProgress, [0.15, 0.55], [1, 80]);
  const slashScaleX = useTransform(scrollYProgress, [0.15, 0.55], [1, 0.05]);
  const slashLX = useTransform(scrollYProgress, [0.15, 0.55], ["0vw", "-22vw"]);
  const slashRX = useTransform(scrollYProgress, [0.15, 0.55], ["0vw", "22vw"]);
  const slashColor = useTransform(
    scrollYProgress,
    [0.15, 0.5],
    ["#1a1a1e", "#d1d1d6"],
  );
  const restOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHeroPassed(v > 0.5);
  });

  const slashStyle = (
    rot = slashRot,
    sx = slashScaleX,
    sy = slashScaleY,
    x = slashLX,
  ) =>
    reduce
      ? { color: "#1a1a1e" as const }
      : {
          x,
          rotate: rot,
          scaleX: sx,
          scaleY: sy,
          color: slashColor,
          display: "inline-block",
        };

  return (
    <section ref={ref} className="relative h-[180vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center px-6 text-center">
          <motion.div
            style={{ opacity: restOpacity }}
            className="text-text-muted"
          >
            <Typewriter text={SYS} start={typed} />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            className="mt-8 flex select-none items-center font-display leading-none"
            style={{ fontSize: "clamp(64px,10vw,120px)" }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
              style={{ x: mizarX, opacity: wordOpacity, filter: wordBlur }}
              className="will-anim text-text-primary"
            >
              MIZAR
            </motion.span>

            <span className="relative mx-3 flex" aria-hidden>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ delay: 0.98, duration: 0.6, ease: EASE }}
                className="will-anim font-light"
                style={slashStyle(slashRot, slashScaleX, slashScaleY, slashLX)}
              >
                /
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ delay: 1.06, duration: 0.6, ease: EASE }}
                className="will-anim font-light"
                style={slashStyle(slashRot, slashScaleX, slashScaleY, slashRX)}
              >
                /
              </motion.span>
            </span>

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 1.14, duration: 0.6, ease: EASE }}
              style={{ x: coreX, opacity: wordOpacity, filter: wordBlur }}
              className="will-anim text-text-primary"
            >
              CORE
            </motion.span>
          </motion.h1>

          <motion.p
            style={{ opacity: restOpacity }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6, ease: EASE }}
            className="mt-8 text-text-secondary"
            // line-height per spec
          >
            <span
              style={{
                display: "block",
                maxWidth: 560,
                fontSize: 20,
                lineHeight: 1.6,
              }}
            >
              We think like investors. Execute like engineers. Interfaces built
              to survive million-dollar audits.
            </span>
          </motion.p>

          <motion.div
            style={{ opacity: restOpacity }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.5, ease: EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#configurator" className="btn-dark px-7 py-4">
              [ DEPLOY ARCHITECTURE ]
            </a>
            <a href="#evidence" className="btn-ghost px-6 py-4">
              See the evidence →
            </a>
          </motion.div>

          <motion.div
            style={{ opacity: restOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1 }}
            className="label-mono absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            scroll ↓
          </motion.div>
        </div>
      </div>
    </section>
  );
}
