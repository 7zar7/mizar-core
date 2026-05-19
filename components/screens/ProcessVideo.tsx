"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTag } from "../SectionTag";
import { Reveal } from "../Reveal";

const PANEL: React.CSSProperties = {
  position: "absolute",
  top: "20%",
  background: "rgba(10,14,18,0.85)",
  border: "1px solid #C41E0E",
  padding: "12px 16px",
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
  transition: "opacity 300ms ease",
  pointerEvents: "none",
  maxWidth: 220,
};
const L = (active: boolean): React.CSSProperties => ({
  ...PANEL,
  opacity: active ? 1 : 0,
});
const HEAD: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.2em",
  color: "#C41E0E",
};
const WHITE: React.CSSProperties = { fontSize: 10, color: "#fff", marginTop: 6 };
const MUTE: React.CSSProperties = { fontSize: 10, color: "#666", marginTop: 6 };

export function ProcessVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handle = () => {
      const t = video.currentTime;
      setActive(t < 2.5 ? 1 : t < 5.5 ? 2 : t < 8.5 ? 3 : 4);
    };
    video.addEventListener("timeupdate", handle);
    return () => video.removeEventListener("timeupdate", handle);
  }, []);

  return (
    <section
      className="process-section relative w-full"
      style={{ background: "#0A0E12", padding: "80px 0" }}
    >
      <SectionTag n="VID" dark />
      <div className="mx-auto max-w-content px-[6vw]">
        <Reveal>
          <p
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.2em", color: "#C41E0E" }}
          >
            {"// HOW WE WORK"}
          </p>
          <h2
            className="h-display mt-4"
            style={{
              fontSize: "clamp(32px,4vw,56px)",
              color: "#fff",
              maxWidth: 640,
            }}
          >
            Brief to live site.
            <br />
            No 6-week timelines.
          </h2>
        </Reveal>

        <div
          className="video-wrapper mx-auto mt-12"
          style={{
            maxWidth: 900,
            border: "1px solid rgba(196,30,14,0.3)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src="/process.mp4"
            style={{
              width: "100%",
              display: "block",
              background: "#0A0E12",
              aspectRatio: "16 / 9",
              objectFit: "cover",
              objectPosition: "center 20%",
            }}
          />

          {/* Node 1 */}
          <div className="proc-overlay" style={{ ...L(active === 1), left: "8%" }}>
            <div style={HEAD}>INCOMING BRIEF</div>
            <div style={WHITE}>SCOPE ············ ✓</div>
            <div style={{ ...WHITE, marginTop: 3 }}>TIMELINE ········· ✓</div>
            <div style={{ ...WHITE, marginTop: 3 }}>BUDGET ··········· ✓</div>
          </div>

          {/* Node 2 */}
          <div className="proc-overlay" style={{ ...L(active === 2), left: "32%" }}>
            <div style={HEAD}>STRATEGY FIRST</div>
            <div style={{ ...WHITE, fontSize: 12, fontWeight: 700 }}>
              ICP → MESSAGE → CTA
            </div>
            <div style={MUTE}>Process before pixels</div>
          </div>

          {/* Node 3 */}
          <div className="proc-overlay" style={{ ...L(active === 3), left: "56%" }}>
            <div style={HEAD}>BUILD + DEPLOY</div>
            <div
              aria-hidden
              style={{
                height: 2,
                background: "#C41E0E",
                marginTop: 8,
                width: active === 3 ? "100%" : "0%",
                transition: "width 2.5s linear",
              }}
            />
            <div style={WHITE}>DAY 1 → DAY 3 → LIVE ✓</div>
            <div style={MUTE}>2–5 days · Vercel</div>
          </div>

          {/* Node 4 */}
          <div className="proc-overlay" style={{ ...L(active === 4), right: "6%" }}>
            <div style={HEAD}>SITE THAT CLOSES</div>
            <div style={WHITE}>From brief to revenue</div>
            <div style={{ color: "#C41E0E", fontSize: 20, marginTop: 6 }}>
              ↑
            </div>
          </div>
        </div>

        <p
          className="proc-mobile-chain mono"
          style={{
            fontSize: 10,
            color: "#C41E0E",
            textAlign: "center",
            letterSpacing: "0.1em",
            marginTop: 18,
          }}
        >
          INCOMING BRIEF → STRATEGY FIRST → BUILD + DEPLOY → SITE THAT CLOSES
        </p>

        <p
          className="mono"
          style={{
            fontSize: 11,
            color: "#666",
            textAlign: "center",
            marginTop: 28,
          }}
        >
          Brief received <span style={{ color: "#C41E0E" }}>→</span>{" "}
          Architecture mapped <span style={{ color: "#C41E0E" }}>→</span> Built
          + deployed <span style={{ color: "#C41E0E" }}>→</span> Deals closed
        </p>
      </div>
    </section>
  );
}
