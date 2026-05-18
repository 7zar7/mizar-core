"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSite } from "./SiteProvider";

export function Nav() {
  const { heroPassed } = useSite();
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
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "border-color 250ms ease",
      }}
    >
      <a
        href="#top"
        className="font-display"
        style={{ fontSize: 20, color: "var(--text-primary)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {heroPassed ? (
            <motion.span
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              MIZAR <span className="font-light">{"//"}</span> CORE
            </motion.span>
          ) : (
            <motion.span
              key="ghost"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
            >
              MIZAR
            </motion.span>
          )}
        </AnimatePresence>
      </a>

      <a
        href="#configurator"
        className="btn-dark"
        style={{ padding: "8px 16px", fontSize: 12 }}
      >
        [ LOCK A SLOT ]
      </a>
    </header>
  );
}
