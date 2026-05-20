"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type OrbSpec = {
  size: number;
  grad: string;
  glow: string;
  hx: number; // home X (fraction of viewport width, cluster center)
  hy: number; // home Y (fraction of viewport height)
  vx: number; // velocity X (px/sec)
  vy: number; // velocity Y (px/sec)
  blur: number;
};

const COLORS = [
  { core: "#1a1a1e", glow: "rgba(26,26,30,0.35)" },
  { core: "#2563eb", glow: "rgba(37,99,235,0.35)" },
  { core: "#C41E0E", glow: "rgba(196,30,14,0.35)" },
];

function makeOrbs(count: number): OrbSpec[] {
  const out: OrbSpec[] = [];
  for (let i = 0; i < count; i++) {
    // size distribution: ~25% large, ~45% medium, ~30% small
    const r = Math.random();
    const size = r < 0.25 ? 70 + Math.random() * 30 : r < 0.7 ? 32 + Math.random() * 18 : 14 + Math.random() * 10;

    const c = COLORS[i % COLORS.length];
    const grad = `radial-gradient(circle at 35% 30%, #ffffff 0%, ${c.core} 78%)`;

    // home cluster — tight near hero `//` (slightly right of center)
    const cluster = 0.04; // ±4% of viewport
    const hx = 0.5 + (Math.random() * 2 - 1) * cluster;
    const hy = 0.5 + (Math.random() * 2 - 1) * cluster;

    // initial velocity — random direction, varied magnitude
    const angle = Math.random() * Math.PI * 2;
    const speed = 60 + Math.random() * 90; // px/sec
    out.push({
      size,
      grad,
      glow: c.glow,
      hx,
      hy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      blur: size > 60 ? 1.5 : size > 30 ? 0.8 : 0.4,
    });
  }
  return out;
}

export function Orbs() {
  const layerRef = useRef<HTMLDivElement>(null);
  const scatterRef = useRef(0); // 0 = collapsed to cluster, 1 = free physics
  const orbsRef = useRef<OrbSpec[]>([]);
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  // generated only after mount to avoid SSR/CSR hydration mismatch
  const [initialSpec, setInitialSpec] = useState<OrbSpec[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 6 : 14;
    setInitialSpec(makeOrbs(count));
  }, []);

  useEffect(() => {
    if (initialSpec.length === 0) return;
    orbsRef.current = initialSpec;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layer = layerRef.current;
    if (!layer) return;

    gsap.registerPlugin(ScrollTrigger);

    const nodes = Array.from(layer.querySelectorAll<HTMLElement>(".orb"));

    // init state — positions at home cluster
    let W = window.innerWidth;
    let H = window.innerHeight;
    stateRef.current = orbsRef.current.map((o) => ({
      x: o.hx * W,
      y: o.hy * H,
      vx: o.vx,
      vy: o.vy,
    }));

    const setX = nodes.map((n) => gsap.quickSetter(n, "x", "px") as (v: number) => void);
    const setY = nodes.map((n) => gsap.quickSetter(n, "y", "px") as (v: number) => void);

    // immediate paint at home positions so orbs aren't at (0,0) before first frame
    stateRef.current.forEach((s, i) => {
      const r = orbsRef.current[i].size / 2;
      setX[i](s.x - r);
      setY[i](s.y - r);
    });

    if (reduce) {
      // static — render at home, no physics
      stateRef.current.forEach((s, i) => {
        gsap.set(nodes[i], { x: s.x - orbsRef.current[i].size / 2, y: s.y - orbsRef.current[i].size / 2 });
      });
      return;
    }

    // scroll-driven scatter parameter 0 → 1 over the first viewport of scroll
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        // ramp from 0 → 1 over the first 25% of the page, then hold at 1
        scatterRef.current = Math.min(1, self.progress / 0.25);
      },
    });

    // physics tick — driven by requestAnimationFrame
    let last = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const scatter = scatterRef.current;
      const orbs = orbsRef.current;
      const states = stateRef.current;

      for (let i = 0; i < states.length; i++) {
        const s = states[i];
        const o = orbs[i];
        const radius = o.size / 2;

        // physics: advance position by velocity, reflect at edges
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // edge bounce — tennis ball style (preserve energy)
        if (s.x - radius < 0) {
          s.x = radius;
          s.vx = Math.abs(s.vx);
        } else if (s.x + radius > W) {
          s.x = W - radius;
          s.vx = -Math.abs(s.vx);
        }
        if (s.y - radius < 0) {
          s.y = radius;
          s.vy = Math.abs(s.vy);
        } else if (s.y + radius > H) {
          s.y = H - radius;
          s.vy = -Math.abs(s.vy);
        }

        // blend toward home when scatter is low
        const homeX = o.hx * W;
        const homeY = o.hy * H;
        const drawX = homeX + (s.x - homeX) * scatter;
        const drawY = homeY + (s.y - homeY) * scatter;

        setX[i](drawX - radius);
        setY[i](drawY - radius);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      // clamp into viewport
      stateRef.current.forEach((s, i) => {
        const r = orbsRef.current[i].size / 2;
        s.x = Math.max(r, Math.min(W - r, s.x));
        s.y = Math.max(r, Math.min(H - r, s.y));
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [initialSpec]);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    >
      {initialSpec.map((o, i) => (
        <span
          key={i}
          className="orb"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: o.grad,
            boxShadow: `0 ${Math.round(o.size * 0.18)}px ${Math.round(o.size * 0.5)}px ${o.glow}`,
            filter: `blur(${o.blur}px)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
