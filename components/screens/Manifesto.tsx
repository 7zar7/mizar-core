"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    // system label types in after the scramble intro completes
    const t = setTimeout(() => setTyped(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const willAnim: React.CSSProperties = {
    willChange: "transform, opacity, filter",
  };

  return (
    <section className="hero-section relative flex h-screen w-full items-center justify-center overflow-hidden">
      <SectionTag n="01" />

      {/* Scramble intro overlay (driven by HeroSlashScroll) */}
      <span
        className="scramble-line mono"
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 14,
          letterSpacing: "0.18em",
          color: "#C41E0E",
          whiteSpace: "pre",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      <div className="flex flex-col items-center px-6 text-center">
        <div className="text-text-muted">
          <Typewriter text={SYS} start={typed} />
        </div>

        {/* Hero logo — rebuilt, GSAP-owned (HeroSlashScroll) */}
        <div
          className="logo-container mt-8 select-none font-display"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.1em",
            fontSize: "clamp(64px,10vw,120px)",
            lineHeight: 1,
          }}
        >
          <span className="logo-text-left mizar-word text-text-primary" style={willAnim}>
            <span className="mizar-mi">MI</span>
            <span className="z-char">Z</span>
            <span className="mizar-ar">AR</span>
          </span>

          <span
            className="logo-slashes slash-element"
            aria-hidden
            style={{
              ...willAnim,
              display: "inline-flex",
              transformOrigin: "center center",
            }}
          >
            <svg
              width="60"
              height="80"
              viewBox="0 0 60 80"
              style={{ display: "block" }}
            >
              <line
                className="slash-line"
                x1="35"
                y1="0"
                x2="15"
                y2="80"
                stroke="#C41E0E"
                strokeWidth="1.5"
              />
              <line
                className="slash-line"
                x1="50"
                y1="0"
                x2="30"
                y2="80"
                stroke="#C41E0E"
                strokeWidth="1.5"
              />
            </svg>
          </span>

          <span
            className="logo-text-right core-word text-text-primary"
            style={willAnim}
          >
            CORE
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6, ease: EASE }}
          className="mt-8 text-text-secondary"
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

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            className="label-mono"
            style={{ opacity: 0.4 }}
            animate={reduce ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            SCROLL ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
