"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionTag } from "../SectionTag";

const CARD_H = 420;

const shot = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    `https://${url}`,
  )}?w=1000`;

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


const CARD_RADIUS = "4px 0px 24px 0px";

/** PREVIEW (front) — readable state before hover. */
function Preview({ c }: { c: CaseStudy }) {
  const live = c.kind === "live";
  return (
    <div
      className="relative flex h-full w-full flex-col justify-end overflow-hidden"
      style={{
        borderRadius: CARD_RADIUS,
        background: "#1A1A1E",
        border: live
          ? "1px solid rgba(228,228,231,0.5)"
          : "1px solid rgba(196,30,14,0.3)",
      }}
    >
      {live && c.link ? (
        <>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${shot(c.link)}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            aria-hidden
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }}
          />
        </>
      ) : null}

      <div
        className="relative flex items-start justify-between"
        style={{ padding: "20px 24px 0" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 22, lineHeight: 1 }}>{c.flag}</span>
          <span
            className="mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {c.city}
          </span>
        </div>
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          {c.n}
        </span>
      </div>

      <div className="relative mt-auto" style={{ padding: "0 24px 24px" }}>
        <div
          className="mono"
          style={{
            fontSize: live ? 40 : 52,
            fontWeight: 700,
            color: "#C41E0E",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {c.metric}
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 13,
            marginTop: 6,
          }}
        >
          {c.metricLabel}
        </p>
        <p
          className="mono"
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.02em",
            marginTop: 10,
          }}
        >
          {c.company}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {c.tags.map((t) => (
            <span
              key={t}
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 999,
                padding: "4px 11px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** BACK — revealed after the flip. */
function Back({ c }: { c: CaseStudy }) {
  const lines = (c.backLines ?? [c.desc]).slice(0, 2);
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{
        borderRadius: CARD_RADIUS,
        background: "#1A1A1E",
        border: "1px solid rgba(196,30,14,0.3)",
        padding: 24,
      }}
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
      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 13,
          lineHeight: 1.5,
          marginTop: 10,
        }}
      >
        {c.desc}
      </p>
      <div className="mt-4 flex flex-col gap-1.5">
        {lines.map((l) => (
          <p
            key={l}
            className="mono"
            style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}
          >
            ▸ {l}
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

/**
 * Railway split-flap card. The card is 4 horizontal strips; each
 * strip has a front (preview slice) and back (detail slice) and
 * flips independently, staggered top→bottom on enter and
 * bottom→top on leave, with a brief panel "click" flash.
 */
function RailwayCard({ c }: { c: CaseStudy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inners = useRef<(HTMLDivElement | null)[]>([]);
  const flashes = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const isDesktop = () =>
      window.matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      ).matches;

    const run = (to: number) => {
      const order = to === -180 ? [0, 1, 2, 3] : [3, 2, 1, 0];
      order.forEach((idx, pos) => {
        const inner = inners.current[idx];
        const flash = flashes.current[idx];
        if (!inner) return;
        gsap.to(inner, {
          rotationX: to,
          duration: 0.2,
          ease: "power2.inOut",
          delay: pos * 0.06,
          overwrite: true,
        });
        if (flash)
          gsap
            .timeline({ delay: pos * 0.06 + 0.085 })
            .set(flash, { opacity: 0.75 })
            .to(flash, { opacity: 0, duration: 0.03, ease: "none" });
      });
    };

    const onEnter = () => {
      if (isDesktop()) run(-180);
    };
    const onLeave = () => {
      if (isDesktop()) run(0);
    };
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="flip-card relative"
      data-cursor
      style={{
        height: CARD_H,
        minHeight: CARD_H,
        minWidth: 0,
        willChange: "filter",
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute inset-x-0 overflow-hidden"
          style={{ top: `${i * 25}%`, height: "25%", perspective: 900 }}
        >
          <div
            ref={(el) => {
              inners.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "400%",
                  top: `${-i * 100}%`,
                }}
              >
                <Preview c={c} />
              </div>
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "400%",
                  top: `${-i * 100}%`,
                }}
              >
                <Back c={c} />
              </div>
            </div>
          </div>
          <div
            ref={(el) => {
              flashes.current[i] = el;
            }}
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "#E4E4E7", opacity: 0 }}
          />
        </div>
      ))}
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
            gridAutoRows: "auto",
            paddingBottom: 48,
          }}
        >
          {CASES.map((c) => (
            <RailwayCard key={c.n} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
