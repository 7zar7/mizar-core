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
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "#fff",
        background: "#1a1a1e",
        padding: "5px 9px",
        borderRadius: 2,
        opacity: show ? 1 : 0,
        transition: "opacity 150ms ease",
        pointerEvents: "none",
      }}
    >
      {label}
    </span>
  );
}

/** A clickable live-site teaser. Placeholder-first, swaps to a real
 *  screenshot only once it actually loads (never looks broken). */
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
      className="pointer-events-auto absolute block"
      style={{
        top,
        [side]: "2.5vw",
        animation: `${drift} 16s ease-in-out infinite`,
      }}
    >
      <Tooltip show={hover} label={`${name} — live`} />
      <span
        className="block overflow-hidden"
        style={{
          width: hover ? 150 : 124,
          height: hover ? 99 : 82,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.9)",
          background: "#1a1a1e",
          filter: hover ? "blur(0px)" : "blur(2px)",
          boxShadow: hover
            ? "0 12px 40px rgba(0,0,0,0.22)"
            : "0 4px 16px rgba(0,0,0,0.08)",
          transition:
            "width 200ms ease-out, height 200ms ease-out, filter 200ms ease-out, box-shadow 200ms ease-out",
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
  top: string;
  off: string;
  drift: "drift-a" | "drift-b";
};

function Fragment({
  f,
  side,
  href,
}: {
  f: Frag;
  side: "left" | "right";
  href: string;
}) {
  const [hover, setHover] = useState(false);
  const base: React.CSSProperties = {
    position: "absolute",
    top: f.top,
    [side]: f.off,
    filter: hover ? "blur(0px)" : "blur(3px)",
    transform: hover ? "scale(1.05)" : "scale(1)",
    transition: "filter 200ms ease-out, transform 200ms ease-out",
    animation: `${f.drift} 18s ease-in-out infinite`,
  };

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
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="pointer-events-auto block"
      style={base}
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
    tip: "MATCH GROUP — expansion identified",
    top: "20%",
    off: "3vw",
    drift: "drift-b",
  },
  {
    kind: "tag",
    text: "[LEGALTECH]",
    tip: "Strategic engagement vertical",
    top: "62%",
    off: "5vw",
    drift: "drift-a",
  },
  {
    kind: "date",
    text: "2026.02",
    tip: "MATCH GROUP — delivery window",
    top: "78%",
    off: "2.5vw",
    drift: "drift-b",
  },
];

const RIGHT_FRAGS: Frag[] = [
  {
    kind: "metric",
    text: "$1.46B",
    tip: "PERSONAL STYLING CO. — market sized",
    top: "22%",
    off: "3vw",
    drift: "drift-a",
  },
  {
    kind: "tag",
    text: "[FINTECH]",
    tip: "Strategic engagement vertical",
    top: "68%",
    off: "5vw",
    drift: "drift-b",
  },
  {
    kind: "date",
    text: "2026.04",
    tip: "SPARK — delivery window",
    top: "84%",
    off: "2.5vw",
    drift: "drift-a",
  },
];

/**
 * Structural DNA: two SOLID vertical laser lines at 28vw / 72vw.
 * Outer zones carry the anamorphic blur; an edge sensor pulls the zone
 * into focus on hover. Live-site thumbnails + discovery fragments float
 * inside the zones — never overlapping the centre content.
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

  const zoneBase: React.CSSProperties = {
    background: "rgba(245,245,247,0.12)",
    transition:
      "backdrop-filter 200ms ease-out, -webkit-backdrop-filter 200ms ease-out",
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ contain: "strict" }}
    >
      {!isMobile && (
        <>
          <div
            className="absolute inset-y-0 left-0"
            style={{
              ...zoneBase,
              width: "var(--laser-left)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              maskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0"
            style={{
              ...zoneBase,
              width: "calc(100vw - var(--laser-right))",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              maskImage:
                "linear-gradient(to left, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 0%, black 70%, transparent 100%)",
            }}
          />

          {/* LEFT zone — interactive items only, edge-constrained (<22vw) */}
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: "22vw", pointerEvents: "none" }}
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
              <Fragment
                key={f.text}
                f={f}
                side="left"
                href="#evidence"
              />
            ))}
          </div>

          {/* RIGHT zone — interactive items only, edge-constrained */}
          <div
            className="absolute inset-y-0 right-0"
            style={{ width: "22vw", pointerEvents: "none" }}
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
              <Fragment
                key={f.text}
                f={f}
                side="right"
                href="#evidence"
              />
            ))}
          </div>
        </>
      )}

      <motion.span
        animate={left}
        className="absolute inset-y-0"
        style={{ left: "var(--laser-left)", width: 1, background: "var(--border)" }}
      />
      <motion.span
        animate={right}
        className="absolute inset-y-0"
        style={{ left: "var(--laser-right)", width: 1, background: "var(--border)" }}
      />
    </div>
  );
}
