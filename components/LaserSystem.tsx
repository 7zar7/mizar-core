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

function Thumb({
  href,
  src,
  drift,
  top,
}: {
  href: string;
  src: string;
  drift: "drift-a" | "drift-b";
  top: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="pointer-events-auto absolute left-1/2 block -translate-x-1/2"
      style={{
        top,
        animation: `${drift} 14s ease-in-out infinite`,
      }}
    >
      <span
        className="block overflow-hidden"
        style={{
          width: hover ? 140 : 120,
          height: hover ? 93 : 80,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.9)",
          filter: hover ? "blur(0px)" : "blur(2px)",
          boxShadow: hover
            ? "0 12px 40px rgba(0,0,0,0.22)"
            : "0 4px 16px rgba(0,0,0,0.08)",
          transition:
            "width 200ms ease-out, height 200ms ease-out, filter 200ms ease-out, box-shadow 200ms ease-out",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </span>
    </a>
  );
}

/**
 * Structural DNA: two SOLID vertical laser lines at 28vw / 72vw.
 * The outer zones carry the anamorphic blur — hovering a zone pulls it
 * into focus (rewards curiosity). Floating live-site thumbnails drift
 * inside the zones as functional teasers.
 */
export function LaserSystem() {
  const { pulseKey, isMobile } = useSite();
  const left = useAnimationControls();
  const right = useAnimationControls();
  const [hoverL, setHoverL] = useState(false);
  const [hoverR, setHoverR] = useState(false);

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
              backdropFilter: `blur(${hoverL ? 0 : 3}px)`,
              WebkitBackdropFilter: `blur(${hoverL ? 0 : 3}px)`,
              maskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            }}
          />
          <div
            onMouseEnter={() => setHoverL(true)}
            onMouseLeave={() => setHoverL(false)}
            className="pointer-events-auto absolute inset-y-0 left-0"
            style={{ width: "16vw" }}
          >
            <Thumb
              href="https://menslab-barbershop-wedq.vercel.app/"
              src={SHOTS.menslab}
              drift="drift-a"
              top="38%"
            />
          </div>
          <div
            className="absolute inset-y-0 right-0"
            style={{
              ...zoneBase,
              width: "calc(100vw - var(--laser-right))",
              backdropFilter: `blur(${hoverR ? 0 : 3}px)`,
              WebkitBackdropFilter: `blur(${hoverR ? 0 : 3}px)`,
              maskImage:
                "linear-gradient(to left, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 0%, black 70%, transparent 100%)",
            }}
          />
          <div
            onMouseEnter={() => setHoverR(true)}
            onMouseLeave={() => setHoverR(false)}
            className="pointer-events-auto absolute inset-y-0 right-0"
            style={{ width: "16vw" }}
          >
            <Thumb
              href="https://milan-decoded.vercel.app/"
              src={SHOTS.milan}
              drift="drift-b"
              top="52%"
            />
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
