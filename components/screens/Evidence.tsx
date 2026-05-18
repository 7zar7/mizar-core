"use client";

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


const GRADIENTS: Record<string, string> = {
  "01": "linear-gradient(135deg,#8B4513 0%,#D2691E 50%,#FF8C00 100%)",
  "02": "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
  "03": "linear-gradient(135deg,#2d1b69 0%,#8B5CF6 50%,#C4B5FD 100%)",
  "04": "linear-gradient(135deg,#7C3AED 0%,#4F46E5 50%,#3B82F6 100%)",
  "05": "linear-gradient(135deg,#C41E0E 0%,#DC2626 50%,#F97316 100%)",
  "06": "linear-gradient(135deg,#0F766E 0%,#0EA5E9 50%,#38BDF8 100%)",
};

/** Digital-folder card: gradient header tab + dark info panel. */
function FolderCard({ c }: { c: CaseStudy }) {
  const live = c.kind === "live" && !!c.link;
  return (
    <div
      className="folder-card relative overflow-hidden"
      data-cursor
      style={{
        height: 380,
        background: "#121214",
        clipPath:
          "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
      }}
    >
      {/* gradient header (55%) */}
      <div
        className="folder-grad"
        aria-hidden
        style={{
          height: "55%",
          background: GRADIENTS[c.n] ?? GRADIENTS["01"],
          transition: "filter 120ms ease",
          clipPath:
            "polygon(0 0, 100% 0, 100% 78%, 62% 78%, 56% 100%, 50% 78%, 0 78%)",
        }}
      />

      {/* info panel (45%) */}
      <div
        className="flex flex-col"
        style={{ height: "45%", padding: "16px 22px 20px" }}
      >
        <p
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "#666",
          }}
        >
          {`0${c.n.replace(/^0/, "")}`.slice(-3)} · {c.industry}
        </p>
        <p
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "#fff",
            marginTop: 8,
          }}
        >
          {c.company}
        </p>
        <p
          className="mono"
          style={{ fontSize: 11, color: "#C41E0E", marginTop: 6 }}
        >
          {c.metric} · {c.metricLabel}
        </p>
        <p
          className="mono"
          style={{ fontSize: 10, color: "#666", marginTop: 6 }}
        >
          {c.tags.join(" · ")}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <span
            className="mono"
            style={{ fontSize: 11, color: "#888" }}
          >
            {c.flag} {c.city}
          </span>
          {live ? (
            <a
              href={`https://${c.link}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="mono"
              style={{ fontSize: 13, color: "#C41E0E" }}
            >
              ↗
            </a>
          ) : (
            <span
              className="mono"
              style={{ fontSize: 10, color: "#666" }}
            >
              NDA
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Evidence() {
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
          className="evi-grid"
          style={{ display: "grid", gap: 20, paddingBottom: 48 }}
        >
          {CASES.map((c) => (
            <FolderCard key={c.n} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
