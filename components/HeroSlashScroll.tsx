"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

/** Custom scramble — letters lock left-to-right over `duration` ms. */
function scramble(
  el: HTMLElement,
  finalText: string,
  duration: number,
  onDone?: () => void,
) {
  const steps = Math.max(1, Math.floor(duration / 40));
  let step = 0;
  const id = window.setInterval(() => {
    el.textContent = finalText
      .split("")
      .map((ch, i) =>
        i < (step / steps) * finalText.length
          ? ch
          : CHARS[Math.floor(Math.random() * CHARS.length)],
      )
      .join("");
    step++;
    if (step >= steps) {
      el.textContent = finalText;
      window.clearInterval(id);
      onDone?.();
    }
  }, 40);
  return () => window.clearInterval(id);
}

/**
 * BLOCK 1 — scramble text intro, then hand off to parallax + scroll
 * detonation. Scroll is blocked for the 1.5s cinematic intro.
 *   P0 0-400    chaos line   "// SYSTEM_INIT_X97% //"
 *   P1 400-600  collapse → slashes (rotate 15°, #C41E0E)
 *   P2 600-1200 decrypt MIZAR / CORE (#00E5FF → #18181B)
 *   P3 1200-1500 unblock scroll, enable interactions
 */
export function HeroSlashScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const q = <T extends Element>(s: string) =>
      document.querySelector<T>(s);
    const mizar = q<HTMLElement>(".mizar-word");
    const core = q<HTMLElement>(".core-word");
    const slashes = q<HTMLElement>(".logo-slashes");
    const line = q<HTMLElement>(".scramble-line");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── interactions: parallax + scroll detonation (post-intro) ───
    const setupInteractions = () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (window.matchMedia("(pointer: coarse)").matches) {
            ScrollTrigger.normalizeScroll(true);
          }
          gsap.set(".laser-line", { autoAlpha: 0 });

          // P2 — idle mouse parallax (inertial lerp 0.06, ±15px)
          const mizarX = gsap.quickSetter(".mizar-word", "x", "px");
          const coreX = gsap.quickSetter(".core-word", "x", "px");
          let tM = 0,
            tC = 0,
            cM = 0,
            cC = 0;
          const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            tM = nx * 15;
            tC = -nx * 15;
          };
          window.addEventListener("pointermove", onMove, {
            passive: true,
          });
          const tick = () => {
            if (window.scrollY > 8) return;
            cM += (tM - cM) * 0.06;
            cC += (tC - cC) * 0.06;
            mizarX(cM);
            coreX(cC);
          };
          gsap.ticker.add(tick);

          const sl = document.querySelector(".logo-slashes");
          const lines = gsap.utils.toArray<SVGLineElement>(".slash-line");
          const onEnter = () => {
            if (window.scrollY > 8) return;
            gsap.to(lines[0], { x: -4, duration: 0.2, ease: "power2.out" });
            gsap.to(lines[1], { x: 4, duration: 0.2, ease: "power2.out" });
          };
          const onLeave = () =>
            gsap.to(lines, { x: 0, duration: 0.2, ease: "power2.out" });
          sl?.addEventListener("pointerenter", onEnter);
          sl?.addEventListener("pointerleave", onLeave);

          // P3 — scroll detonation (pinned, scrubbed)
          gsap
            .timeline({
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

          return () => {
            window.removeEventListener("pointermove", onMove);
            gsap.ticker.remove(tick);
            sl?.removeEventListener("pointerenter", onEnter);
            sl?.removeEventListener("pointerleave", onLeave);
          };
        },
      );

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.set(".laser-line", { autoAlpha: 1 });
        gsap.set(".mizar-word, .core-word, .logo-slashes", { opacity: 1 });
      });

      cleanups.push(() => mm.revert());
    };

    const cleanups: Array<() => void> = [];

    // ── reduced motion → final state, no intro, no scroll lock ────
    if (reduced) {
      if (line) line.style.display = "none";
      if (mizar) {
        mizar.textContent = "MIZAR";
        gsap.set(mizar, { opacity: 1, color: "#18181B" });
      }
      if (core) {
        core.textContent = "CORE";
        gsap.set(core, { opacity: 1, color: "#18181B" });
      }
      gsap.set(slashes, { opacity: 1, scale: 1, rotation: 15 });
      setupInteractions();
      return () => cleanups.forEach((c) => c());
    }

    // ── block scroll for the intro ────────────────────────────────
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // initial hidden states
    gsap.set([mizar, core], { opacity: 0 });
    gsap.set(slashes, { opacity: 0, scale: 0.2, rotation: 15 });

    // P0 — chaos line (0-400ms)
    const LINE = "// SYSTEM_INIT_X97% //";
    const chaos = window.setInterval(() => {
      if (!line) return;
      line.textContent = LINE.split("")
        .map((c) =>
          c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)],
        )
        .join("");
    }, 40);

    const timers: number[] = [];
    let killM: (() => void) | undefined;
    let killC: (() => void) | undefined;

    // P1 — collapse to slashes (400-600ms)
    timers.push(
      window.setTimeout(() => {
        window.clearInterval(chaos);
        if (line) gsap.to(line, { opacity: 0, duration: 0.12 });
        gsap.to(slashes, {
          opacity: 1,
          scale: 1,
          rotation: 15,
          duration: 0.2,
          ease: "power3.in",
        });
      }, 400),
    );

    // P2 — brand decryption (600-1200ms)
    timers.push(
      window.setTimeout(() => {
        if (line) line.style.display = "none";
        gsap.set([mizar, core], { opacity: 1 });
        gsap.fromTo(
          [mizar, core],
          { color: "#00E5FF" },
          { color: "#18181B", duration: 0.6, ease: "none" },
        );
        if (mizar) killM = scramble(mizar, "MIZAR", 600);
        if (core) killC = scramble(core, "CORE", 600);
      }, 600),
    );

    // P3 — unblock + enable interactions (1500ms)
    timers.push(
      window.setTimeout(() => {
        html.style.overflow = prevHtml;
        document.body.style.overflow = prevBody;
        setupInteractions();
      }, 1500),
    );

    return () => {
      window.clearInterval(chaos);
      timers.forEach((t) => window.clearTimeout(t));
      killM?.();
      killC?.();
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
