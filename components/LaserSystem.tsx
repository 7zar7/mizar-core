"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useSite } from "./SiteProvider";

const SHOTS = {
  menslab:
    "https://s.wordpress.com/mshots/v1/" +
    encodeURIComponent("https://menslab-barbershop-wedq.vercel.app/") +
    "?w=600",
  milan:
    "https://s.wordpress.com/mshots/v1/" +
    encodeURIComponent("https://milan-decoded.vercel.app/") +
    "?w=600",
};

function Tooltip({ show, label }: { show: boolean; label: string }) {
  return (
    <span
      className="mono"
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: "50%",
        whiteSpace: "nowrap",
        fontSize: 9,
        letterSpacing: "0.12em",
        color: "#fff",
        background: "#1a1a1e",
        padding: "4px 8px",
        borderRadius: 2,
        opacity: show ? 1 : 0,
        transform: show
          ? "translate(-50%, 0)"
          : "translate(-50%, 4px)",
        transition:
          "opacity 150ms ease-out, transform 150ms ease-out",
        pointerEvents: "none",
      }}
    >
      {label}
    </span>
  );
}

/** Clickable live-site teaser. Per-element blur so hover can clear it. */
function Thumb({
  href,
  src,
  name,
  domain,
  drift,
  top,
  side,
}: {
  href: string;
  src: string;
  name: string;
  domain: string;
  drift: "drift-a" | "drift-b";
  top: string;
  side: "left" | "right";
}) {
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [src]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="blur-fragment absolute block"
      style={{
        top,
        [side]: "2.5vw",
        pointerEvents: "auto",
        cursor: "pointer",
        opacity: hover ? 1 : 0.7,
        filter: hover ? "blur(0px)" : "blur(3px)",
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition:
          "filter 200ms ease-out, opacity 200ms ease-out, transform 200ms ease-out",
        animation: `${drift} 16s ease-in-out infinite`,
      }}
    >
      <Tooltip show={hover} label="View live site ↗" />
      <span
        className="block overflow-hidden"
        style={{
          width: hover ? 150 : 124,
          height: hover ? 99 : 82,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.9)",
          background: "#1a1a1e",
          boxShadow: hover
            ? "0 12px 40px rgba(0,0,0,0.22)"
            : "0 4px 16px rgba(0,0,0,0.08)",
          transition:
            "width 200ms ease-out, height 200ms ease-out, box-shadow 200ms ease-out",
          position: "relative",
        }}
      >
        {loaded ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span className="flex h-full w-full flex-col justify-center px-3">
            <span
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.06em",
              }}
            >
              {name}
            </span>
            <span
              className="mono"
              style={{ fontSize: 8, color: "#c41e0e", marginTop: 3 }}
            >
              {domain}
            </span>
          </span>
        )}
      </span>
    </a>
  );
}

type Frag = {
  kind: "metric" | "tag" | "date";
  text: string;
  tip: string;
  href: string;
  top: string;
  off: string;
  drift: "drift-a" | "drift-b";
};

function Fragment({ f, side }: { f: Frag; side: "left" | "right" }) {
  const [hover, setHover] = useState(false);

  const inner =
    f.kind === "metric" ? (
      <span
        className="mono"
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: "#c41e0e",
          letterSpacing: "-0.02em",
        }}
      >
        {f.text}
      </span>
    ) : f.kind === "tag" ? (
      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "var(--text-secondary)",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "5px 12px",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        {f.text}
      </span>
    ) : (
      <span
        className="mono"
        style={{ fontSize: 10, color: "var(--text-muted)" }}
      >
        {f.text}
      </span>
    );

  return (
    <a
      href={f.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="blur-fragment block"
      style={{
        position: "absolute",
        top: f.top,
        [side]: f.off,
        pointerEvents: "auto",
        cursor: "pointer",
        opacity: hover ? 1 : 0.7,
        filter: hover ? "blur(0px)" : "blur(3px)",
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition:
          "filter 200ms ease-out, opacity 200ms ease-out, transform 200ms ease-out",
        animation: `${f.drift} 18s ease-in-out infinite`,
      }}
    >
      <Tooltip show={hover} label={f.tip} />
      {inner}
    </a>
  );
}

const LEFT_FRAGS: Frag[] = [
  {
    kind: "metric",
    text: "$12.85M",
    tip: "Match Group · Competitive Intel",
    href: "#evidence",
    top: "20%",
    off: "3vw",
    drift: "drift-b",
  },
  {
    kind: "tag",
    text: "[LEGALTECH]",
    tip: "Strategic engagement vertical",
    href: "#evidence",
    top: "62%",
    off: "5vw",
    drift: "drift-a",
  },
  {
    kind: "date",
    text: "2026.02",
    tip: "Match Group — delivery window",
    href: "#evidence",
    top: "78%",
    off: "2.5vw",
    drift: "drift-b",
  },
];

const RIGHT_FRAGS: Frag[] = [
  {
    kind: "metric",
    text: "$1.46B",
    tip: "Personal Styling · Market Research",
    href: "#evidence",
    top: "22%",
    off: "3vw",
    drift: "drift-a",
  },
  {
    kind: "tag",
    text: "[FINTECH]",
    tip: "Strategic engagement vertical",
    href: "#evidence",
    top: "68%",
    off: "5vw",
    drift: "drift-b",
  },
  {
    kind: "date",
    text: "2026.04",
    tip: "SPARK — delivery window",
    href: "#evidence",
    top: "84%",
    off: "2.5vw",
    drift: "drift-a",
  },
];

/**
 * Structural DNA: two SOLID vertical laser lines at 28vw / 72vw, kept
 * BEHIND content (z-0). The floating thumbnails + discovery fragments
 * live in a separate layer ABOVE content so they stay hoverable and
 * clickable; each carries its own blur (cleared on hover).
 */
export function LaserSystem() {
  const { pulseKey, isMobile } = useSite();
  const left = useAnimationControls();
  const right = useAnimationControls();

  useEffect(() => {
    if (pulseKey === 0) return;
    const ripple = { opacity: [1, 0.3, 1] };
    const t = { duration: 0.4, ease: "easeInOut" as const };
    left.start({ ...ripple, transition: t });
    right.start({ ...ripple, transition: t });
  }, [pulseKey, left, right]);

  return (
    <>
      {/* structural lines — behind content */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ contain: "strict" }}
      >
        <motion.span
          animate={left}
          className="laser-line absolute inset-y-0"
          style={{
            left: "var(--laser-left)",
            width: 1,
            background: "var(--border)",
          }}
        />
        <motion.span
          animate={right}
          className="laser-line absolute inset-y-0"
          style={{
            left: "var(--laser-right)",
            width: 1,
            background: "var(--border)",
          }}
        />
        {/* the Z, made structural — center red line (ghost of the Z) */}
        <span
          className="z-laser absolute inset-y-0"
          style={{
            left: "50%",
            width: 1,
            background: "#C41E0E",
            opacity: 0,
          }}
        />
      </div>

      {/* interactive teasers — above content, edge-constrained */}
      {!isMobile && (
        <div
          className="pointer-events-none fixed inset-0 z-[40]"
          aria-hidden
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: "22vw" }}
          >
            <Thumb
              href="https://menslab-barbershop-wedq.vercel.app/"
              src={SHOTS.menslab}
              name="MENSLAB BCN"
              domain="menslab-barbershop-wedq.vercel.app"
              drift="drift-a"
              top="40%"
              side="left"
            />
            {LEFT_FRAGS.map((f) => (
              <Fragment key={f.text} f={f} side="left" />
            ))}
          </div>

          <div
            className="absolute inset-y-0 right-0"
            style={{ width: "22vw" }}
          >
            <Thumb
              href="https://milan-decoded.vercel.app/"
              src={SHOTS.milan}
              name="MILAN DECODED"
              domain="milan-decoded.vercel.app"
              drift="drift-b"
              top="54%"
              side="right"
            />
            {RIGHT_FRAGS.map((f) => (
              <Fragment key={f.text} f={f} side="right" />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
