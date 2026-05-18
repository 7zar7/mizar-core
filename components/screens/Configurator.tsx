"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type Stage = "PRE-SEED" | "SEED ROUND" | "SERIES A+";
type Vertical = "LEGALTECH" | "FINTECH" | "B2B SAAS" | "LOCAL";

const STAGES: Stage[] = ["PRE-SEED", "SEED ROUND", "SERIES A+"];
const VERTICALS: Vertical[] = ["LEGALTECH", "FINTECH", "B2B SAAS", "LOCAL"];
const EASE = [0.4, 0, 0.2, 1] as const;

type Result = {
  engagement: string;
  value: string;
  window: string;
  deliverable: string;
};

function compute(stage: Stage, vert: Vertical, slider: number): Result {
  if (vert === "LOCAL") {
    return {
      engagement: "Launch Site",
      value: "€500 ──────────────── €900",
      window: "3 ──────────────── 7 days",
      deliverable: "Live Site + Booking",
    };
  }
  if (stage === "PRE-SEED" && slider < 50) {
    return {
      engagement: "Launch Package",
      value: "$2,500 ──────────── $4,500",
      window: "5 ───────────────── 10 days",
      deliverable: "Positioning Document",
    };
  }
  return {
    engagement: "Strategy + Build",
    value: "$5,000 ──────────── $8,000",
    window: "10 ──────────────── 18 days",
    deliverable: "Architecture Brief",
  };
}

function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p
        className="mono mb-3"
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </p>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))`,
        }}
      >
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.04em",
                padding: "12px 6px",
                borderRadius: 2,
                transition: "background 150ms linear, color 150ms linear",
                background: active ? "#1a1a1e" : "transparent",
                color: active ? "#fff" : "var(--text-secondary)",
                border: active
                  ? "1px solid #1a1a1e"
                  : "1px solid var(--border)",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Configurator() {
  const [stage, setStage] = useState<Stage>("PRE-SEED");
  const [vert, setVert] = useState<Vertical>("LEGALTECH");
  const [slider, setSlider] = useState(20);
  const [vibrate, setVibrate] = useState(false);
  const [opened, setOpened] = useState(false);
  const [recompose, setRecompose] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const result = useMemo(
    () => compute(stage, vert, slider),
    [stage, vert, slider],
  );

  function onSlide(v: number) {
    setSlider(v);
    setVibrate(true);
    window.setTimeout(() => setVibrate(false), 260);
  }

  function deploy() {
    setOpened(true);
    window.setTimeout(() => setRecompose(true), 500);
  }

  return (
    <section
      id="configurator"
      className="relative flex min-h-screen w-full items-center justify-center py-28"
      style={{ background: "#f0f0f2" }}
    >
      <div className="w-full px-6">
        <div className="mx-auto mb-12 max-w-[740px]">
          <p className="label-mono">MIZAR // CORE CONFIGURATOR [V2.6]</p>
          <h2
            className="h-display mt-5"
            style={{ fontSize: "clamp(34px,4.5vw,56px)" }}
          >
            Configure your architecture.
          </h2>
          <p
            className="mt-3"
            style={{ color: "var(--text-secondary)", fontSize: 17 }}
          >
            Adjust the balance between launch velocity and infrastructure
            depth. The system calculates scope.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-[740px] overflow-hidden"
          style={{
            borderRadius: 4,
            border: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          {/* vibrating background grid */}
          <motion.div
            aria-hidden
            animate={
              vibrate
                ? { x: [0, -2, 2, -2, 2, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.4,
              maskImage:
                "radial-gradient(circle at 50% 50%, black, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, black, transparent 75%)",
            }}
          />

          {/* SPLIT DOORS */}
          <motion.div
            className="absolute inset-y-0 left-0 z-20"
            style={{ width: "50%", background: "var(--surface)" }}
            initial={false}
            animate={{ x: opened ? "-100%" : "0%" }}
            transition={{ duration: 0.4, ease: EASE }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 z-20"
            style={{
              width: "50%",
              background: "var(--surface)",
              borderLeft: "1px solid var(--border)",
            }}
            initial={false}
            animate={{ x: opened ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: EASE }}
          />

          {/* BEHIND THE DOORS */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-10 text-center"
            style={{ background: "#1a1a1e", color: "#fff" }}
          >
            <RecomposeLogo show={recompose} />
            <p
              className="mono"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}
            >
              Thank you — we&apos;ll be in touch within 4 hours.
            </p>
            <p
              className="mono"
              style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}
            >
              [ Cal.com embed — placeholder · email placeholder ]
            </p>
          </div>

          {/* CONTROL SURFACE */}
          <div
            className="relative z-[15] flex flex-col gap-9"
            style={{ padding: 48 }}
          >
            <Toggle
              label="STARTUP STAGE"
              options={STAGES}
              value={stage}
              onChange={setStage}
            />
            <Toggle
              label="PRODUCT VERTICAL"
              options={VERTICALS}
              value={vert}
              onChange={setVert}
            />

            <div>
              <p
                className="mono mb-4"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "var(--text-secondary)",
                }}
              >
                ARCHITECTURE FOCUS
              </p>
              <div ref={trackRef} className="relative py-3">
                <div
                  style={{
                    height: 2,
                    background: "var(--border)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 2,
                      width: `${slider}%`,
                      background: "var(--accent)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: `calc(${slider}% - 8px)`,
                      top: -7,
                      width: 16,
                      height: 16,
                      background: "#1a1a1e",
                      borderRadius: 0,
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={slider}
                  onChange={(e) => onSlide(Number(e.target.value))}
                  aria-label="Architecture focus"
                  className="absolute inset-0 w-full cursor-pointer opacity-0"
                  style={{ height: 36, top: -4 }}
                />
              </div>
              <div className="mt-3 flex justify-between">
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "var(--text-secondary)" }}
                >
                  Fast MVP
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "var(--text-secondary)" }}
                >
                  Compliance Ready
                </span>
              </div>
            </div>

            <OutputPanel result={result} />

            <button
              onClick={deploy}
              className="btn-dark w-full"
              style={{ padding: 20 }}
            >
              [ DEPLOY ARCHITECTURE &amp; LOCK SLOT ]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutputPanel({ result }: { result: Result }) {
  const rows: [string, string][] = [
    ["RECOMMENDED ENGAGEMENT", `${result.engagement} ········· active`],
    ["ESTIMATED BASE VALUE", result.value],
    ["DELIVERY WINDOW", result.window],
    ["FIRST DELIVERABLE", `${result.deliverable} ········· queued`],
  ];
  return (
    <div
      style={{ borderTop: "1px solid var(--border)", paddingTop: 28 }}
      className="flex flex-col gap-5"
    >
      {rows.map(([k, v]) => (
        <div key={k}>
          <p
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
            }}
          >
            {k}
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={v}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mono mt-1"
              style={{ fontSize: 14, color: "var(--text-primary)" }}
            >
              {v}
            </motion.p>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function RecomposeLogo({ show }: { show: boolean }) {
  return (
    <div
      className="flex items-center font-display"
      style={{ fontSize: "clamp(32px,5vw,56px)", color: "#fff" }}
    >
      <motion.span
        initial={{ x: "-60px", opacity: 0, filter: "blur(8px)" }}
        animate={
          show
            ? { x: 0, opacity: 1, filter: "blur(0px)" }
            : { x: "-60px", opacity: 0, filter: "blur(8px)" }
        }
        transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
      >
        MIZAR
      </motion.span>
      <motion.span
        className="mx-2 font-light"
        initial={{ scaleY: 40, opacity: 0 }}
        animate={
          show ? { scaleY: 1, opacity: 1 } : { scaleY: 40, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: EASE }}
      >
        {"//"}
      </motion.span>
      <motion.span
        initial={{ x: "60px", opacity: 0, filter: "blur(8px)" }}
        animate={
          show
            ? { x: 0, opacity: 1, filter: "blur(0px)" }
            : { x: "60px", opacity: 0, filter: "blur(8px)" }
        }
        transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
      >
        CORE
      </motion.span>
    </div>
  );
}
