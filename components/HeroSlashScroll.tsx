"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * STEP 1 — GSAP slash transformation, layered on top of the existing
 * Framer hero. Scroll-scrubbed: MIZAR / CORE fly outward + blur out,
 * the "//" rotate + stretch into the structural lines, and the static
 * laser lines fade because the slashes ARE the lines now.
 */
export function HeroSlashScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || window.innerWidth <= 768) {
      // Skip GSAP — leave the hero in its natural (final/static) state.
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance on the WRAPPER (separate node) so it never fights the
      // scrubbed transforms on the inner word/slash spans.
      gsap.from(".hero-logo", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.9,
      });

      // Scroll-scrubbed transformation. .to (not fromTo) so the
      // entrance state is the start and nothing snaps at progress 0.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to(
        ".mizar-word",
        {
          x: "-45vw",
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.6,
          ease: "power1.in",
        },
        0,
      )
        .to(
          ".core-word",
          {
            x: "45vw",
            opacity: 0,
            filter: "blur(12px)",
            duration: 0.6,
            ease: "power1.in",
          },
          0,
        )
        .to(
          ".slash-element",
          {
            rotation: 90,
            scaleY: 100,
            color: "#E4E4E7",
            duration: 0.8,
            ease: "power2.inOut",
          },
          0,
        )
        // the slashes become the lines — fade the static laser divs
        .to(
          ".laser-line",
          { autoAlpha: 0, duration: 0.3, ease: "none" },
          0.25,
        );
    });

    const refresh = () => ScrollTrigger.refresh();
    // fonts/layout settle after mount — recalculate trigger bounds
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
