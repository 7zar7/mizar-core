"use client";

import { useEffect, useRef } from "react";
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

/* Cards are now fully static (no flip / no back face). */

/** Fully static card — front face only, no hover animation. */
function StaticCard({ c }: { c: CaseStudy }) {
  const big = c.kind === "live";
  return (
    <div
      className="flip-card relative"
      data-cursor
      style={{
        gridRow: big ? "span 2" : "span 1",
        height: "100%",
        minHeight: big ? 472 : 228,
        minWidth: 0,
        willChange: "filter",
      }}
    >
      <FrontFace c={c} />
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
            <StaticCard key={c.n} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
