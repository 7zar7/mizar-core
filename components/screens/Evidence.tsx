"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { useSite } from "../SiteProvider";
import { GlassCard } from "../GlassCard";
import { SectionTag } from "../SectionTag";

type CaseStudy = {
  n: string;
  kind: "live" | "nda";
  industry: string;
  company: string;
  metric: string;
  metricLabel: string;
  desc: string;
  tags: [string, string];
  link?: string;
};

const CASES: CaseStudy[] = [
  {
    n: "01",
    kind: "live",
    industry: "LOCAL BUSINESS",
    company: "MENSLAB BCN",
    metric: "3 days",
    metricLabel: "from brief to live site",
    desc: "End-to-end build: design, copy, booking, SEO. Barcelona barbershop, live in 3 days.",
    tags: ["LIVE SITE", "BARCELONA"],
    link: "menslab-barbershop-wedq.vercel.app",
  },
  {
    n: "02",
    kind: "live",
    industry: "LIFESTYLE EDITORIAL",
    company: "MILAN DECODED",
    metric: "200 copies",
    metricLabel: "sold at launch · PDF guide",
    desc: "Brand, editorial copy and conversion site. Launched at €29, PDF delivered instantly.",
    tags: ["LIVE SITE", "EDITORIAL"],
    link: "milan-decoded.vercel.app",
  },
  {
    n: "03",
    kind: "nda",
    industry: "COMPETITIVE INTELLIGENCE",
    company: "MATCH GROUP",
    metric: "$12.85M",
    metricLabel: "expansion opportunity identified",
    desc: "10-K analysis across a 9-brand portfolio. 4 growth vectors, presented to stakeholders.",
    tags: ["COMPETITIVE INTEL", "C-SUITE"],
  },
  {
    n: "04",
    kind: "nda",
    industry: "AD MONETIZATION",
    company: "SPARK",
    metric: "$3.48M",
    metricLabel: "annual revenue model",
    desc: "Ad infrastructure strategy from zero. CPM model, 3-phase rollout, C-suite approved.",
    tags: ["AD REVENUE", "GDPR"],
  },
  {
    n: "05",
    kind: "nda",
    industry: "MARKET RESEARCH",
    company: "PERSONAL STYLING CO.",
    metric: "$1.46B",
    metricLabel: "market sized bottom-up",
    desc: "Bottom-up sizing vs Stitch Fix. Diagnosed a 14–35× conversion gap, exec-approved.",
    tags: ["MARKET SIZING", "EXEC APPROVED"],
  },
];

const shot = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    `https://${url}`,
  )}?w=1000`;

function DarkMetric({ metric }: { metric: string }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center"
      style={{ background: "#1a1a1e" }}
    >
      <p
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.35)",
          fontStyle: "italic",
          padding: "0 24px",
          textAlign: "center",
          marginBottom: 14,
        }}
      >
        Strategy delivered as standalone engagements. Same thinking goes
        into every site we build.
      </p>
      <div
        className="mono"
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: "#c41e0e",
          letterSpacing: "-0.02em",
        }}
      >
        {metric}
      </div>
    </div>
  );
}

function LiveShot({ url, metric }: { url: string; metric: string }) {
  const [err, setErr] = useState(false);
  if (err) return <DarkMetric metric={metric} />;
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

function CardBody({ c }: { c: CaseStudy }) {
  return (
    <div style={{ padding: 28 }}>
      <div className="flex flex-wrap gap-2">
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
        className="mono"
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.02em",
          color: "var(--text-primary)",
          marginTop: 16,
        }}
      >
        {c.company}
      </p>
      <div
        className="mono"
        style={{
          fontSize: "clamp(40px,5vw,68px)",
          fontWeight: 700,
          color: "var(--accent)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginTop: 10,
        }}
      >
        {c.metric}
      </div>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: 14,
          marginTop: 6,
        }}
      >
        {c.metricLabel}
      </p>
      <p
        style={{
          color: "var(--text-primary)",
          fontSize: 15,
          lineHeight: 1.55,
          marginTop: 14,
          maxWidth: "46ch",
        }}
      >
        {c.desc}
      </p>
      {c.link && (
        <span
          className="mono"
          style={{
            display: "inline-block",
            fontSize: 12,
            color: "var(--accent)",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: 2,
            marginTop: 16,
          }}
        >
          {c.link} ↗
        </span>
      )}
    </div>
  );
}

function CardInner({ c }: { c: CaseStudy }) {
  return (
    <GlassCard
      className="max-h-full w-full overflow-hidden"
      style={{ padding: 0, borderRadius: "4px 0px 24px 0px" }}
    >
      {/* folded-corner mark — classified-document feel */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 16,
          height: 16,
          background: "#c41e0e",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          zIndex: 3,
        }}
      />
      <div style={{ height: 220, width: "100%" }}>
        {c.kind === "live" && c.link ? (
          <LiveShot url={c.link} metric={c.metric} />
        ) : (
          <DarkMetric metric={c.metric} />
        )}
      </div>
      <CardBody c={c} />
    </GlassCard>
  );
}

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
    <div className="flex h-full w-screen flex-shrink-0 items-center justify-center px-[6vw]">
      <motion.div
        className="will-anim flex max-h-full"
        style={{ filter, opacity, scale, width: "min(640px, 80vw)" }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        {c.kind === "live" && c.link ? (
          <a
            href={`https://${c.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
            data-cursor
          >
            <CardInner c={c} />
          </a>
        ) : (
          <CardInner c={c} />
        )}
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
        Two live sites. Three strategic engagements.
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <section id="evidence" className="relative w-full py-24">
        <SectionTag n="03" />
        {Header}
        <div className="mt-12 flex flex-col gap-8 px-5">
          {CASES.map((c) =>
            c.kind === "live" && c.link ? (
              <a
                key={c.n}
                href={`https://${c.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardInner c={c} />
              </a>
            ) : (
              <CardInner key={c.n} c={c} />
            ),
          )}
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
      <div className="sticky top-0 flex h-screen max-h-screen flex-col overflow-hidden">
        <SectionTag n="03" />
        <div className="shrink-0 pt-[8vh] pb-[3vh]">{Header}</div>
        <motion.div
          className="flex min-h-0 flex-1 items-center"
          style={{ x }}
        >
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
