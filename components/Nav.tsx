"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 md:px-8"
      style={{
        height: 56,
        background: "rgba(245,245,247,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid #E4E4E7"
          : "1px solid transparent",
        transition: "border-color 250ms ease",
      }}
    >
      <a
        href="#top"
        className="font-display"
        style={{ fontSize: 20, color: "var(--text-primary)" }}
      >
        MIZAR <span className="font-light">{"//"}</span> CORE
      </a>

      <a
        href="#configurator"
        className="btn-urgent"
        style={{ padding: "9px 18px" }}
      >
        GET YOUR SITE IN 5 DAYS
      </a>
    </header>
  );
}
