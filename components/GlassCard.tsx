"use client";

import { useRef, useState } from "react";

/**
 * Frosted glass card. The inner light source physically follows the cursor
 * (realtime on move, 300ms ease-out on leave). Border brightens on the
 * side the cursor approaches.
 */
export function GlassCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={`glass relative overflow-hidden ${className}`}
      style={{
        transition: active ? "none" : "background 300ms ease-out",
        background: active
          ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 60%)`
          : "var(--bg-glass)",
        ...style,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 300ms ease-out",
          border: "1px solid transparent",
          background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, rgba(0,102,204,0.18), transparent 70%) border-box`,
          WebkitMask:
            "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
