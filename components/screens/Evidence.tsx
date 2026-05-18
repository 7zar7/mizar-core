"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useSite } from "../SiteProvider";
import { GlassCard } from "../GlassCard";

type CaseStudy = {
  n: string;
  industry: string;
  company: string;
  metric: string;
  metricLabel: string;
  desc: string;
  tags: string[];
  footer: string;
  link?: string;
};

const CASES: CaseStudy[] = [
  {
    n: "01",
    industry: "COMPETITIVE INTELLIGENCE",
    company: "MATCH GROUP",
    metric: "$12.85M",
    metricLabel: "expansion opportunity identified",
    desc: "Full 10-K analysis across 9-brand portfolio. 4 actionable growth vectors. Presented to internal stakeholders. Scope anonymized per NDA.",
    tags: ["DATING TECH", "COMPETITIVE INTEL", "C-SUITE DELIVERY"],
    footer: "Strategic deliverable · Scope anonymized per NDA",
  },
  {
    n: "02",
    industry: "AD MONETIZATION",
    company: "SPARK",
    metric: "$3.48M",
    metricLabel: "annual revenue model",
    desc: "Zero to full ad infrastructure strategy. CPM modelling, 3-phase rollout, GDPR compliance. Approved by C-suite panel.",
    tags: ["LGBTQ+ TECH", "AD REVENUE", "GDPR COMPLIANT"],
    footer: "Strategic deliverable · Scope anonymized per NDA",
  },
  {
    n: "03",
    industry: "MARKET RESEARCH",
    company: "PERSONAL STYLING CO.",
    metric: "$1.46B",
    metricLabel: "market sized bottom-up",
    desc: "Verified revenue analysis of Stitch Fix and competitors. Diagnosed 14–35× conversion gap. CEO + 2 directors approved.",
    tags: ["CONSUMER FASHION", "MARKET SIZING", "EXEC APPROVED"],
    footer: "Strategic deliverable · Scope anonymized per NDA",
  },
  {
    n: "04",
    industry: "LOCAL BUSINESS",
    company: "MENSLAB BCN",
    metric: "3 days",
    metricLabel: "from brief to live site",
    desc: "End-to-end: design, copy, booking system, SEO. Barcelona premium barbershop. Named client.",
    tags: ["LIVE SITE", "BARCELONA", "NAMED CLIENT"],
    footer: "Live engagement · Named client",
    link: "menslab-barbershop-wedq.vercel.app",
  },
];

function Panel({
  c,
  i,
  total,
  progress,
}: {
  c: CaseStudy;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const focus = total > 1 ? i / (total - 1) : 0;
  const span = 1 / (total - 1);
  const pts = [focus - span, focus, focus + span];

  const blurN = useTransform(progress, pts, [3, 0, 3], { clamp: true });
  const filter = useTransform(blurN, (b) => `blur(${b.toFixed(2)}px)`);
  const opacity = useTransform(progress, pts, [0.7, 1, 0.7], { clamp: true });
  const scale = useTransform(progress, pts, [1, 1.02, 1], { clamp: true });

  return (
    <div className="flex h-screen w-screen flex-shrink-0 items-center justify-center px-[6vw]">
      <motion.div
        className="will-anim w-full"
        style={{ filter, opacity, scale }}
      >
        <GlassCard
          className="rounded-[6px]"
          style={{ padding: "clamp(32px,5vw,72px)" }}
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[34%_1fr] md:gap-16">
            <div className="relative">
              <div
                className="mono leading-none"
                style={{
                  fontSize: "clamp(80px,9vw,128px)",
                  fontWeight: 900,
                  color: "rgba(0,0,0,0.06)",
                }}
              >
                {c.n}
              </div>
              <div className="mt-6 space-y-2">
                <p className="label-mono">{c.industry}</p>
                <p
                  className="mono"
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {c.company}
                </p>
              </div>
            </div>

            <div>
              <div
                className="mono"
                style={{
                  fontSize: "clamp(48px,6vw,84px)",
                  fontWeight: 700,
                  color: "var(--accent)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {c.metric}
              </div>
              <p
                className="mt-2"
                style={{ color: "var(--text-secondary)", fontSize: 15 }}
              >
                {c.metricLabel}
              </p>

              <p
                className="mt-7 max-w-[46ch]"
                style={{
                  color: "var(--text-primary)",
                  fontSize: 17,
                  lineHeight: 1.6,
                }}
              >
                {c.desc}
              </p>

              {c.link && (
                <a
                  href={`https://${c.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono mt-5 inline-block"
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    borderBottom: "1px solid var(--accent)",
                    paddingBottom: 2,
                  }}
                >
                  {c.link} ↗
                </a>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                {c.tags.map((t) => (
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
                ))}
              </div>

              <p
                className="mono mt-8"
                style={{ fontSize: 11, color: "var(--text-muted)" }}
              >
                {c.footer}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export function Evidence() {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useSite();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = CASES.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(total - 1) * 100}vw`],
  );

  const Header = (
    <div className="px-[6vw] md:pl-[28vw]">
      <p className="label-mono">EVIDENCE // ANTIDOTES</p>
      <h2
        className="h-display mt-5"
        style={{ fontSize: "clamp(36px,5vw,64px)", maxWidth: 700 }}
      >
        The interfaces that stopped capital from leaving.
      </h2>
      <p
        className="mt-4"
        style={{ color: "var(--text-secondary)", fontSize: 18 }}
      >
        Three engagements. Measured outcomes. No decoration.
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <section id="evidence" className="w-full py-24">
        {Header}
        <div className="mt-12 flex flex-col gap-8 px-5">
          {CASES.map((c) => (
            <GlassCard
              key={c.n}
              className="rounded-[6px]"
              style={{ padding: 28 }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: "rgba(0,0,0,0.06)",
                  lineHeight: 1,
                }}
              >
                {c.n}
              </div>
              <p className="label-mono mt-3">{c.industry}</p>
              <p
                className="mono"
                style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}
              >
                {c.company}
              </p>
              <div
                className="mono mt-5"
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                {c.metric}
              </div>
              <p
                style={{ color: "var(--text-secondary)", fontSize: 14 }}
              >
                {c.metricLabel}
              </p>
              <p
                className="mt-4"
                style={{ fontSize: 15, lineHeight: 1.6 }}
              >
                {c.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      borderRadius: 999,
                      padding: "4px 10px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="evidence"
      ref={ref}
      style={{ height: `${total * 100}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="pt-[12vh]">{Header}</div>
        <motion.div className="flex flex-1 items-center" style={{ x }}>
          {CASES.map((c, i) => (
            <Panel
              key={c.n}
              c={c}
              i={i}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
