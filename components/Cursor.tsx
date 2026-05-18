"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteProvider";

/**
 * Custom precision cursor: a crosshair reticle with a red target dot.
 * Expands into a focusing ring over hoverable elements; shows a
 * "DEPLOY" tag over CTAs. Native cursor is hidden on fine pointers.
 */
export function Cursor() {
  const { isMobile } = useSite();
  const dot = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [cta, setCta] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (dot.current) {
            dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          }
        });
      }
    };

    const over = (e: Event) => {
      const t = (e.target as HTMLElement)?.closest?.(
        "a, button, input[type=range], [data-cursor]",
      );
      setHover(!!t);
      setCta(!!(e.target as HTMLElement)?.closest?.(".btn-dark, .btn-light"));
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerout", (e) => {
      if (!(e as PointerEvent).relatedTarget) setHover(false);
    });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const size = hover ? 32 : 24;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120]"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 150ms ease",
        mixBlendMode: "normal",
      }}
    >
      {/* crosshair lines */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size,
          height: 1,
          background: "#1a1a1e",
          transform: "translate(-50%, -50%)",
          transition: "width 150ms ease-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1,
          height: size,
          background: "#1a1a1e",
          transform: "translate(-50%, -50%)",
          transition: "height 150ms ease-out",
        }}
      />
      {/* red target dot */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: down ? 4 : 2,
          height: down ? 4 : 2,
          borderRadius: "50%",
          background: "#c41e0e",
          transform: "translate(-50%, -50%)",
          transition: "width 120ms ease, height 120ms ease",
        }}
      />
      {/* focusing ring */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid #c41e0e",
          transform: `translate(-50%, -50%) scale(${hover ? 1 : 0.6})`,
          opacity: hover ? 0.6 : 0,
          transition:
            "transform 150ms ease-out, opacity 150ms ease-out",
        }}
      />
      {/* CTA label */}
      <span
        className="mono"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(12px, -50%)",
          fontSize: 9,
          letterSpacing: "0.18em",
          color: "#c41e0e",
          whiteSpace: "nowrap",
          opacity: cta ? 1 : 0,
          transition: "opacity 100ms ease",
        }}
      >
        DEPLOY
      </span>
    </div>
  );
}
