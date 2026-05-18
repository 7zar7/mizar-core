"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type SiteCtx = {
  heroPassed: boolean;
  setHeroPassed: (v: boolean) => void;
  pulseKey: number;
  pulseLasers: () => void;
  isMobile: boolean;
};

const Ctx = createContext<SiteCtx | null>(null);

export function useSite() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSite must be used within SiteProvider");
  return c;
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [heroPassed, setHeroPassed] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastPulse = useRef(0);

  const pulseLasers = useCallback(() => {
    const now = Date.now();
    if (now - lastPulse.current < 350) return;
    lastPulse.current = now;
    setPulseKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);

    const onMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty(
        "--mx",
        String(e.clientX),
      );
      document.documentElement.style.setProperty(
        "--my",
        String(e.clientY),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Ctx.Provider
      value={{ heroPassed, setHeroPassed, pulseKey, pulseLasers, isMobile }}
    >
      {children}
    </Ctx.Provider>
  );
}
