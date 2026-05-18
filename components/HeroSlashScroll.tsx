"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hero logo animation — full rebuild.
 *  P1  initial reveal (on load)
 *  P2  idle mouse parallax (pre-scroll, inertial lerp)
 *  P3  scroll detonation (pinned, scrubbed) → laser-line handoff
 * Mobile / reduced-motion: static final state, laser lines visible.
 * gsap.matchMedia re-applies the correct branch on viewport changes.
 */
export function HeroSlashScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // ── Desktop + motion-OK ───────────────────────────────────────
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        if (window.matchMedia("(pointer: coarse)").matches) {
          ScrollTrigger.normalizeScroll(true);
        }
        gsap.set(".laser-line", { autoAlpha: 0 });

        let onMove: ((e: PointerEvent) => void) | null = null;
        let tick: (() => void) | null = null;
        let slashes: Element | null = null;
        let onEnter: (() => void) | null = null;
        let onLeave: (() => void) | null = null;

        // PHASE 2 + 3 — built only AFTER the reveal completes, so the
        // scrubbed tweens capture the resolved (visible) state as their
        // start values instead of the reveal's hidden from-state.
        const initInteractions = () => {
          // PHASE 2 — idle mouse parallax (inertial lerp 0.06, ±15px)
          const mizarX = gsap.quickSetter(".mizar-word", "x", "px");
          const coreX = gsap.quickSetter(".core-word", "x", "px");
          let tM = 0,
            tC = 0,
            cM = 0,
            cC = 0;

          onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            tM = nx * 15;
            tC = -nx * 15;
          };
          window.addEventListener("pointermove", onMove, { passive: true });

          tick = () => {
            // once detonating, hand X over to the scrubbed timeline
            if (window.scrollY > 8) return;
            cM += (tM - cM) * 0.06;
            cC += (tC - cC) * 0.06;
            mizarX(cM);
            coreX(cC);
          };
          gsap.ticker.add(tick);

          slashes = document.querySelector(".logo-slashes");
          const lines = gsap.utils.toArray<SVGLineElement>(".slash-line");
          onEnter = () => {
            if (window.scrollY > 8) return;
            gsap.to(lines[0], { x: -4, duration: 0.2, ease: "power2.out" });
            gsap.to(lines[1], { x: 4, duration: 0.2, ease: "power2.out" });
          };
          onLeave = () =>
            gsap.to(lines, { x: 0, duration: 0.2, ease: "power2.out" });
          slashes?.addEventListener("pointerenter", onEnter);
          slashes?.addEventListener("pointerleave", onLeave);

          // PHASE 3 — scroll detonation (pinned, scrubbed)
          gsap.timeline({
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: 3,
            },
          })
            .to(
              ".mizar-word",
              {
                x: -600,
                scale: 3.5,
                opacity: 0,
                filter: "blur(15px)",
                duration: 1,
                ease: "none",
              },
              0,
            )
            .to(
              ".core-word",
              {
                x: 600,
                scale: 3.5,
                opacity: 0,
                filter: "blur(15px)",
                duration: 1,
                ease: "none",
              },
              0,
            )
            .to(
              ".logo-slashes",
              { rotation: 0, scaleY: 30, duration: 1, ease: "none" },
              0,
            )
            .to(
              ".slash-line",
              { stroke: "#E4E4E7", duration: 1, ease: "none" },
              0,
            )
            .to(
              ".laser-line",
              { autoAlpha: 1, duration: 0.25, ease: "none" },
              0.75,
            );

          ScrollTrigger.refresh();
        };

        // PHASE 1 — initial reveal
        const tl1 = gsap.timeline({
          delay: 0.15,
          onComplete: initInteractions,
        });
        tl1
          .fromTo(
            ".logo-slashes",
            { opacity: 0, filter: "blur(10px)", rotation: 0 },
            {
              opacity: 1,
              filter: "blur(0px)",
              rotation: 15,
              duration: 0.4,
              ease: "power2.out",
            },
            0,
          )
          .fromTo(
            ".mizar-word",
            { x: -300, opacity: 0, filter: "blur(8px)" },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power3.out",
            },
            0.4,
          )
          .fromTo(
            ".core-word",
            { x: 300, opacity: 0, filter: "blur(8px)" },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power3.out",
            },
            0.4,
          );

        return () => {
          if (onMove) window.removeEventListener("pointermove", onMove);
          if (tick) gsap.ticker.remove(tick);
          if (onEnter) slashes?.removeEventListener("pointerenter", onEnter);
          if (onLeave) slashes?.removeEventListener("pointerleave", onLeave);
        };
      },
    );

    // ── Mobile or reduced-motion — static final state ─────────────
    mm.add(
      "(max-width: 767px), (prefers-reduced-motion: reduce)",
      () => {
        gsap.set(".laser-line", { autoAlpha: 1 });
        gsap.set(".mizar-word, .core-word, .logo-slashes", { opacity: 1 });
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
