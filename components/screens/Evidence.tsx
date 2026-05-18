"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SectionTag } from "../SectionTag";

type CaseStudy = {
  n: string;
  flag: string;
  city: string;
  kind: "live" | "nda";
  industry: string;
  company: string;
  metric: string;
  metricLabel: string;
  desc: string;
  tags: [string, string];
  link?: string;
  backType: "shot" | "text";
  backLines?: string[];
};

const CASES: CaseStudy[] = [
  {
    n: "01",
    flag: "🇪🇸",
    city: "BARCELONA",
    kind: "live",
    industry: "LOCAL BUSINESS",
    company: "MENSLAB BCN",
    metric: "3 days",
    metricLabel: "from brief to live site",
    desc: "End-to-end build: design, copy, booking, SEO. Barcelona barbershop, live in 3 days.",
    tags: ["LIVE SITE", "BARCELONA"],
    link: "menslab-barbershop-wedq.vercel.app",
    backType: "shot",
  },
  {
    n: "02",
    flag: "🇨🇦",
    city: "TORONTO",
    kind: "live",
    industry: "LEGAL SAAS",
    company: "CLEARSIGN",
    metric: "2,400+",
    metricLabel: "waitlist signups at launch",
    desc: "Full conversion landing for AI legal SaaS. Waitlist funnel, pricing tiers, social proof.",
    tags: ["LEGALTECH", "SAAS"],
    link: "clearsign-six.vercel.app",
    backType: "text",
    backLines: [
      "AI contract review platform",
      "Waitlist funnel · Pricing tiers · Social proof",
      "Full conversion landing page",
    ],
  },
  {
    n: "03",
    flag: "🇮🇹",
    city: "MILAN",
    kind: "live",
    industry: "LIFESTYLE EDITORIAL",
    company: "MILAN DECODED",
    metric: "200 copies",
    metricLabel: "sold at launch · PDF guide",
    desc: "Brand, editorial copy and conversion site. Launched at €29, PDF delivered instantly.",
    tags: ["LIVE SITE", "EDITORIAL"],
    link: "milan-decoded.vercel.app",
    backType: "text",
    backLines: [
      "Brand identity + editorial copy",
      "Conversion site for insider travel guide",
      "Launched at €29 · PDF delivered instantly",
    ],
  },
  {
    n: "04",
    flag: "🇺🇸",
    city: "NEW YORK",
    kind: "nda",
    industry: "COMPETITIVE INTELLIGENCE",
    company: "MATCH GROUP",
    metric: "$12.85M",
    metricLabel: "expansion opportunity identified",
    desc: "10-K analysis across a 9-brand portfolio. 4 growth vectors, presented to stakeholders.",
    tags: ["COMPETITIVE INTEL", "C-SUITE"],
    backType: "text",
    backLines: [
      "Full 10-K analysis · 9-brand portfolio",
      "4 growth vectors · C-suite delivery",
    ],
  },
  {
    n: "05",
    flag: "🇺🇸",
    city: "NEW YORK",
    kind: "nda",
    industry: "AD MONETIZATION",
    company: "SPARK",
    metric: "$3.48M",
    metricLabel: "annual revenue model",
    desc: "Ad infrastructure strategy from zero. CPM model, 3-phase rollout, C-suite approved.",
    tags: ["AD REVENUE", "GDPR"],
    backType: "text",
    backLines: [
      "Ad infrastructure from zero",
      "CPM model · 3-phase rollout",
      "Approved by C-suite panel",
    ],
  },
  {
    n: "06",
    flag: "🇺🇸",
    city: "NEW YORK",
    kind: "nda",
    industry: "MARKET RESEARCH",
    company: "PERSONAL STYLING CO.",
    metric: "$1.46B",
    metricLabel: "market sized bottom-up",
    desc: "Bottom-up sizing vs Stitch Fix. Diagnosed a 14–35× conversion gap, exec-approved.",
    tags: ["MARKET SIZING", "EXEC APPROVED"],
    backType: "text",
    backLines: [
      "Stitch Fix competitive analysis",
      "14–35× conversion gap diagnosed",
      "CEO + 2 directors approved",
    ],
  },
];

const shot = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    `https://${url}`,
  )}?w=1000`;

const TAG = (t: string) => (
  <span
    key={t}
    className="mono"
    style={{
      fontSize: 10,
      letterSpacing: "0.12em",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)",
      borderRadius: 999,
      padding: "5px 12px",
    }}
  >
    {t}
  </span>
);

/** FRONT — dark metric header (40%) + light identity body (60%). */
function FrontFace({ c }: { c: CaseStudy }) {
  const dark = c.kind === "nda";
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{
        borderRadius: "4px 0px 24px 0px",
        border: dark
          ? "1px solid rgba(196,30,14,0.3)"
          : "1px solid rgba(228,228,231,0.8)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      }}
    >
      {/* dark header — metric visible immediately */}
      <div
        className="relative flex shrink-0 items-center"
        style={{ height: "40%", background: "#1A1A1E", padding: "0 24px" }}
      >
        <span
          className="mono"
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#C41E0E",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {c.metric}
        </span>
        <span
          className="mono"
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            fontSize: 11,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
          }}
        >
          {c.n}
        </span>
      </div>

      {/* light identity body */}
      <div
        className="flex min-h-0 flex-1 flex-col"
        style={{
          padding: 24,
          background: dark
            ? "rgba(26,26,30,0.92)"
            : "rgba(255,255,255,0.72)",
          WebkitBackdropFilter: "blur(30px) saturate(120%)",
          backdropFilter: "blur(30px) saturate(120%)",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 22, lineHeight: 1 }}>{c.flag}</span>
          <span
            className="mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: dark ? "rgba(255,255,255,0.4)" : "var(--text-muted)",
            }}
          >
            {c.city}
          </span>
        </div>
        <p
          style={{
            color: dark ? "rgba(255,255,255,0.6)" : "var(--text-secondary)",
            fontSize: 13,
            marginTop: 10,
          }}
        >
          {c.metricLabel}
        </p>
        <p
          className="mono"
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.02em",
            marginTop: 8,
            color: dark ? "#fff" : "var(--text-primary)",
          }}
        >
          {c.company}
        </p>
        <div className="mt-auto flex flex-wrap gap-2" style={{ paddingTop: 12 }}>
          {c.tags.map(TAG)}
        </div>
      </div>
    </div>
  );
}

function LiveShot({ url }: { url: string }) {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div
        className="h-full w-full"
        style={{ background: "#1a1a1e" }}
        aria-hidden
      />
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={shot(url)}
      alt=""
      loading="lazy"
      onError={() => setErr(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

const BACK_SHELL: React.CSSProperties = {
  borderRadius: "4px 0px 24px 0px",
  background: "#1A1A1E",
  border: "1px solid rgba(196,30,14,0.3)",
};

/** BACK — screenshot (MensLab) or explicit dark text panel. */
function BackFace({ c }: { c: CaseStudy }) {
  // MensLab keeps the live screenshot
  if (c.backType === "shot" && c.link) {
    return (
      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={BACK_SHELL}
      >
        <div className="absolute inset-0">
          <LiveShot url={c.link} />
        </div>
        <div
          className="relative mt-auto flex flex-col"
          style={{
            padding: 20,
            background:
              "linear-gradient(to top, rgba(26,26,30,0.97), rgba(26,26,30,0))",
          }}
        >
          <p
            className="mono"
            style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}
          >
            {c.company}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 13,
              lineHeight: 1.5,
              marginTop: 6,
            }}
          >
            {c.desc}
          </p>
          <a
            href={`https://${c.link}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="mono"
            style={{
              fontSize: 12,
              color: "#c41e0e",
              borderBottom: "1px solid #c41e0e",
              paddingBottom: 2,
              marginTop: 10,
              alignSelf: "flex-start",
              wordBreak: "break-all",
            }}
          >
            {c.link} ↗
          </a>
        </div>
      </div>
    );
  }

  // explicit dark text panel (ClearSign, Milan, NDA cases)
  const lines = c.backLines ?? [c.desc];
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{ ...BACK_SHELL, padding: 24 }}
    >
      <p
        className="mono"
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.04em",
        }}
      >
        {c.company}
      </p>
      <div className="mt-3 flex flex-col gap-1.5">
        {lines.map((l) => (
          <p
            key={l}
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 13,
              lineHeight: 1.45,
            }}
          >
            {l}
          </p>
        ))}
      </div>
      <div className="mt-auto" style={{ paddingTop: 14 }}>
        {c.kind === "nda" ? (
          <p
            className="mono"
            style={{
              fontSize: 10,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Scope anonymized per NDA
          </p>
        ) : (
          <a
            href={`https://${c.link}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="mono"
            style={{
              fontSize: 12,
              color: "#c41e0e",
              borderBottom: "1px solid #c41e0e",
              paddingBottom: 2,
              wordBreak: "break-all",
            }}
          >
            {c.link} ↗
          </a>
        )}
      </div>
    </div>
  );
}

function Face({ c, side }: { c: CaseStudy; side: "front" | "back" }) {
  return side === "front" ? <FrontFace c={c} /> : <BackFace c={c} />;
}

/**
 * Split-flap flip card (railway-board effect). Card splits at the
 * midpoint; top leaf flips down, content swaps while hidden, bottom
 * leaf flips up. Crack line + shadow flash sell the mechanical click.
 */
function FlipCard({ c }: { c: CaseStudy }) {
  const big = c.kind === "live";
  const rootRef = useRef<HTMLDivElement>(null);
  const topInner = useRef<HTMLDivElement>(null);
  const botInner = useRef<HTMLDivElement>(null);
  const crackRef = useRef<HTMLSpanElement>(null);
  const [side, setSide] = useState<"front" | "back">("front");
  const target = useRef<"front" | "back">("front");
  const animating = useRef(false);

  const flipTo = (next: "front" | "back") => {
    if (target.current === next || animating.current) {
      target.current = next;
      return;
    }
    target.current = next;
    animating.current = true;
    const root = rootRef.current;
    const crack = crackRef.current;

    // Structured top-to-bottom panel reveal. Enter folds top→bottom;
    // leave is the exact reverse (bottom→top). Same easing curve,
    // no random timing or stagger.
    const lead = next === "back" ? topInner.current : botInner.current;
    const follow = next === "back" ? botInner.current : topInner.current;

    gsap
      .timeline({
        onComplete: () => {
          animating.current = false;
          if (target.current !== next) flipTo(target.current);
        },
      })
      .set(crack, { opacity: 1 }, 0)
      // fold
      .to(lead, { rotationX: -90, duration: 0.18, ease: "power2.in" }, 0)
      .to(
        follow,
        { rotationX: -90, duration: 0.18, ease: "power2.in" },
        0.08,
      )
      // both hidden → swap content + mechanical click flash
      .add(() => {
        setSide(next);
        if (root)
          gsap.fromTo(
            root,
            { boxShadow: "0 0 8px rgba(0,0,0,0.2)" },
            { boxShadow: "0 8px 40px rgba(0,0,0,0.06)", duration: 0.12 },
          );
      }, 0.26)
      // unfold
      .to(lead, { rotationX: 0, duration: 0.2, ease: "power2.out" }, 0.27)
      .to(
        follow,
        { rotationX: 0, duration: 0.2, ease: "power2.out" },
        0.33,
      )
      .set(crack, { opacity: 0 }, 0.55);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // live check (robust to viewport changes / preview reloads)
    const isDesktop = () =>
      window.matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      ).matches;

    const onEnter = () => {
      if (isDesktop()) flipTo("back");
    };
    const onLeave = () => {
      if (!isDesktop()) return;
      flipTo("front");
      gsap.to(root, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onMove = (e: MouseEvent) => {
      if (!isDesktop()) return;
      const r = root.getBoundingClientRect();
      const xv = e.clientX - r.left - r.width / 2;
      const yv = e.clientY - r.top - r.height / 2;
      gsap.to(root, {
        rotateY: xv * 0.05,
        rotateX: -yv * 0.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const onTap = () => {
      if (!isDesktop()) setSide((s) => (s === "front" ? "back" : "front"));
    };
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("mousemove", onMove);
    root.addEventListener("click", onTap);
    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("click", onTap);
    };
  }, []);

  const leaf = (which: "top" | "bottom") => (
    <div
      className="absolute inset-x-0 overflow-hidden"
      style={
        which === "top"
          ? { top: 0, height: "50%", perspective: 1000 }
          : { bottom: 0, height: "50%", perspective: 1000 }
      }
    >
      <div
        ref={which === "top" ? topInner : botInner}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "200%",
          [which === "top" ? "top" : "bottom"]: 0,
          transformOrigin: which === "top" ? "center top" : "center bottom",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        <Face c={c} side={side} />
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className="flip-card relative"
      data-cursor
      style={{
        gridRow: big ? "span 2" : "span 1",
        height: "100%",
        minHeight: big ? 472 : 228,
        minWidth: 0,
        transformStyle: "preserve-3d",
        willChange: "transform, filter",
      }}
    >
      {leaf("top")}
      {leaf("bottom")}
      {/* the crack at the split line */}
      <span
        ref={crackRef}
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 1,
          background: "#E4E4E7",
          opacity: 0,
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export function Evidence() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Anamorphic: cards away from the viewport's vertical centre soften.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!desktop) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      gridRef.current
        ?.querySelectorAll<HTMLElement>(".flip-card")
        .forEach((card) => {
          const r = card.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          const center = r.top + r.height / 2;
          const dist = Math.min(1, Math.abs(center - mid) / mid);
          card.style.filter = `blur(${(dist * 4).toFixed(2)}px)`;
          card.style.opacity = String(1 - dist * 0.35);
          card.style.transition =
            "filter 150ms ease-out, opacity 150ms ease-out";
        });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="evidence" className="evidence-section relative w-full py-24">
      <SectionTag n="03" />
      <div className="mx-auto max-w-content px-[6vw]">
        <p
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.2em", color: "#c41e0e" }}
        >
          {"// WEB STUDIO & STRATEGIC WORK"}
        </p>
        <p className="label-mono mt-2">EVIDENCE // ANTIDOTES</p>
        <h2
          className="h-display mt-3"
          style={{ fontSize: "clamp(30px,4vw,56px)", maxWidth: 680 }}
        >
          Proof, not decoration.
        </h2>
        <p
          className="mt-3"
          style={{ color: "var(--text-secondary)", fontSize: 16 }}
        >
          Three live sites. Three strategic engagements.
        </p>
        <p
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            marginTop: 12,
            marginBottom: 32,
          }}
        >
          🇪🇸 Barcelona · 🇮🇹 Milan · 🇨🇦 Canada · 🇺🇸 United States
        </p>

        <div
          ref={gridRef}
          className="evi-grid"
          style={{
            display: "grid",
            gap: 16,
            gridAutoRows: 228,
            gridAutoFlow: "dense",
          }}
        >
          {CASES.map((c) => (
            <FlipCard key={c.n} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
