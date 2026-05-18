"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SectionTag } from "../SectionTag";

const EASE = [0.4, 0, 0.2, 1] as const;

type Stage = "PRE-SEED" | "SEED ROUND" | "SERIES A+" | "LOCAL";
type Vertical =
  | "WEB STUDIO"
  | "LEGALTECH"
  | "FINTECH"
  | "B2B SAAS"
  | "LOCAL";

const STAGES: Stage[] = ["PRE-SEED", "SEED ROUND", "SERIES A+", "LOCAL"];
const VERTICALS: Vertical[] = [
  "WEB STUDIO",
  "LEGALTECH",
  "FINTECH",
  "B2B SAAS",
  "LOCAL",
];

type Result = {
  engagement: string;
  value: string;
  delivery: string;
  deliverable: string;
};

function compute(stage: Stage, slider: number): Result {
  if (stage === "LOCAL") {
    return {
      engagement: "Launch Site",
      value: "€500 – €900",
      delivery: "3 – 7 days",
      deliverable: "Live Site + Booking",
    };
  }

  const baseTier =
    stage === "PRE-SEED" ? "launch" : "build";
  const tier = slider > 60 && baseTier === "launch" ? "build" : baseTier;

  if (tier === "launch") {
    return {
      engagement: "Launch Package",
      value: "$2,500 – $4,500",
      delivery: "5 – 10 days",
      deliverable: "Positioning Document",
    };
  }
  return {
    engagement: "Strategy + Build",
    value: "$5,000 – $8,000",
    delivery: "10 – 14 days",
    deliverable: "Architecture Brief",
  };
}

function ToggleRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          color: "var(--text-secondary)",
          marginBottom: 12,
        }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className="mono"
              style={{
                flex: "1 1 auto",
                minWidth: 92,
                fontSize: 12,
                letterSpacing: "0.04em",
                padding: "11px 10px",
                borderRadius: 2,
                cursor: "pointer",
                transition:
                  "background 150ms linear, color 150ms linear, border-color 150ms linear",
                background: active ? "#1a1a1e" : "transparent",
                color: active ? "#ffffff" : "var(--text-secondary)",
                border: active
                  ? "1px solid #c41e0e"
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

function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-end gap-3">
      <span
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden
        style={{
          flex: 1,
          borderBottom: "1px dotted #d1d1d6",
          transform: "translateY(-3px)",
        }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mono"
          style={{
            fontSize: 13,
            color: "var(--text-primary)",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function RecomposeLogo() {
  return (
    <div
      className="flex items-center font-display"
      style={{ fontSize: "clamp(30px,5vw,52px)", color: "#fff" }}
    >
      <motion.span
        initial={{ x: -60, opacity: 0, filter: "blur(8px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
      >
        MIZAR
      </motion.span>
      <motion.span
        className="mx-2 font-light"
        style={{ color: "#c41e0e" }}
        initial={{ scaleY: 36, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {"//"}
      </motion.span>
      <motion.span
        initial={{ x: 60, opacity: 0, filter: "blur(8px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
      >
        CORE
      </motion.span>
    </div>
  );
}

export function Configurator() {
  const [stage, setStage] = useState<Stage>("PRE-SEED");
  const [vertical, setVertical] = useState<Vertical>("WEB STUDIO");
  const [slider, setSlider] = useState(20);
  const [opened, setOpened] = useState(false);

  const result = useMemo(() => compute(stage, slider), [stage, slider]);

  return (
    <section
      id="configurator"
      className="flex min-h-screen w-full items-center justify-center py-28"
      style={{
        background: "#f0f0f2",
        position: "relative",
        zIndex: 10,
        isolation: "isolate",
      }}
    >
      <SectionTag n="04" />
      <div className="w-full px-6">
        <div className="mx-auto mb-12 max-w-[760px]">
          <p
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#c41e0e",
            }}
          >
            {"// WEB STUDIO + STRATEGY"}
</p>
          <h2
            className="h-display mt-4"
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
          className="relative mx-auto max-w-[760px] overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid #e4e4e7",
            borderRadius: 4,
            padding: 40,
          }}
        >
          {/* HEADER BAR */}
          <div
            className="flex items-center justify-between"
            style={{
              paddingBottom: 18,
              borderBottom: "1px dashed #d1d1d6",
            }}
          >
            <div className="flex items-center gap-2">
              {["#c41e0e", "#d1d1d6", "#d1d1d6"].map((c, i) => (
                <span
                  key={i}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: c,
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--text-secondary)",
              }}
            >
              CONFIGURATOR.EXE
            </span>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col gap-8" style={{ paddingTop: 28 }}>
            <ToggleRow
              label="STARTUP STAGE"
              options={STAGES}
              value={stage}
              onChange={setStage}
            />
            <ToggleRow
              label="PRODUCT VERTICAL"
              options={VERTICALS}
              value={vertical}
              onChange={setVertical}
            />

            <div>
              <p
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "var(--text-secondary)",
                  marginBottom: 16,
                }}
              >
                ARCHITECTURE FOCUS
              </p>
              <div
                className="relative"
                style={{ paddingTop: 8, paddingBottom: 8 }}
              >
                <div
                  style={{
                    position: "relative",
                    height: 2,
                    background: "var(--border)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 2,
                      width: `${slider}%`,
                      background: "#c41e0e",
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
                  onChange={(e) => setSlider(Number(e.target.value))}
                  aria-label="Architecture focus"
                  className="absolute left-0 w-full cursor-pointer opacity-0"
                  style={{ height: 32, top: 0 }}
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

            {/* OUTPUT PANEL */}
            <div
              className="flex flex-col gap-4"
              style={{
                borderTop: "1px dashed #d1d1d6",
                paddingTop: 24,
              }}
            >
              <OutputRow label="RECOMMENDED" value={result.engagement} />
              <OutputRow label="ESTIMATED VALUE" value={result.value} />
              <OutputRow label="DELIVERY" value={result.delivery} />
              <OutputRow
                label="FIRST DELIVERABLE"
                value={result.deliverable}
              />
            </div>

            <button
              type="button"
              onClick={() => setOpened(true)}
              className="btn-dark btn-deploy w-full"
              style={{ padding: 20 }}
            >
              [ DEPLOY ARCHITECTURE &amp; LOCK SLOT ]
            </button>
          </div>

          {/* DEPLOY REVEAL — mounted only after click */}
          <AnimatePresence>
            {opened && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 px-10 text-center"
                style={{ background: "#1a1a1e", color: "#fff" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <RecomposeLogo />
                <motion.div
                  className="mono flex flex-col items-center"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      color: "#c41e0e",
                    }}
                  >
                    {"// ARCHITECTURE LOCKED"}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: 18,
                    }}
                  >
                    YOUR BRIEF
                  </p>
                  <p style={{ fontSize: 15, marginTop: 8 }}>
                    {stage} · {vertical} · {slider}% focus
                  </p>
                  <p style={{ fontSize: 15, marginTop: 6 }}>
                    Estimated: {result.value}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.55)",
                      marginTop: 18,
                    }}
                  >
                    We&apos;ll reach out within 4 hours.
                  </p>
                  <a
                    href="mailto:hello@mizarcore.studio"
                    className="btn-dark btn-deploy"
                    style={{
                      marginTop: 18,
                      padding: "12px 22px",
                      background: "transparent",
                      border: "1px solid #c41e0e",
                      color: "#fff",
                    }}
                  >
                    [ hello@mizarcore.studio ]
                  </a>
                </motion.div>

                {/* split doors slide apart over the dark reveal */}
                <motion.div
                  className="pointer-events-none absolute inset-y-0 left-0"
                  style={{ width: "50%", background: "#ffffff" }}
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-y-0 right-0"
                  style={{
                    width: "50%",
                    background: "#ffffff",
                    borderLeft: "1px solid #e4e4e7",
                  }}
                  initial={{ x: "0%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
