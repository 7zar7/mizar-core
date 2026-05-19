"use client";

import { SectionTag } from "../SectionTag";
import { Reveal } from "../Reveal";

const ITEMS: { label: string; text: string }[] = [
  { label: "// ROI", text: "One client pays for the site. The rest is profit." },
  {
    label: "// SIGNAL",
    text: "Large checks don't tolerate amateur design.",
  },
  { label: "// METHOD", text: "Process logic first. Pixels second." },
];

export function ValueProps() {
  return (
    <section
      className="vp-compact relative w-full"
      style={{ background: "#0A0E12", padding: "60px 24px" }}
    >
      <SectionTag n="VP" dark />
      <Reveal className="mx-auto" >
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          {ITEMS.map((it, i) => (
            <div key={it.label}>
              {i > 0 && (
                <div
                  aria-hidden
                  style={{
                    borderTop: "1px dashed #333",
                    margin: "20px 0",
                  }}
                />
              )}
              <p
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "#C41E0E",
                  marginBottom: 8,
                }}
              >
                {it.label}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: 1.4,
                  color: "#fff",
                }}
              >
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
