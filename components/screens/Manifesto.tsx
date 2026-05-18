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
import { SectionTag } from "../SectionTag";

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

  // Scroll-linked transforms for the words/slashes are now driven by GSAP
  // ScrollTrigger (see HeroSlashScroll). Framer only owns the entrance
  // animation + the fade of the supporting copy.
  const restOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHeroPassed(v > 0.5);
  });

  const slashBase: React.CSSProperties = {
    display: "inline-block",
    color: "#c41e0e",
    transformOrigin: "center center",
  };

  return (
    <section ref={ref} className="hero-section relative h-[135vh] w-full">
      <SectionTag n="01" />
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center px-6 text-center">
          <motion.div
            style={{ opacity: restOpacity }}
            className="text-text-muted"
          >
            <Typewriter text={SYS} start={typed} />
          </motion.div>

          {/* GSAP-owned (HeroSlashScroll): entrance + scroll transform */}
          <h1
            className="hero-logo mt-8 flex select-none items-center font-display leading-none"
            style={{ fontSize: "clamp(64px,10vw,120px)" }}
          >
            <span className="mizar-word will-anim text-text-primary">
              MIZAR
            </span>

            <span className="relative mx-3 flex" aria-hidden>
              <span
                className="slash-element will-anim font-light"
                style={slashBase}
              >
                /
              </span>
              <span
                className="slash-element will-anim font-light"
                style={slashBase}
              >
                /
              </span>
            </span>

            <span className="core-word will-anim text-text-primary">
              CORE
            </span>
          </h1>

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
                maxWidth: 520,
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1.5,
              }}
            >
              Your product is ready.
              <br />
              Your site isn&apos;t.
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
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              className="label-mono"
              style={{ opacity: 0.4 }}
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              SCROLL ↓
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
