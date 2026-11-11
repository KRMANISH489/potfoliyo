"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandText, LogoMark } from "@/components/ui/BrandLogo";
import { SITE_CONFIG } from "@/lib/constants";

let introPlayed = false;

function LoaderMark() {
  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #22d3ee 30%, transparent 55%, #8b5cf6 80%, transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
      <span className="absolute inset-[3px] rounded-full bg-[#0a0a0f]" />
      <motion.span
        className="absolute inset-3 rounded-full border border-cyan-400/20"
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <LogoMark size="xl" />
      </motion.div>
    </div>
  );
}

/** Shared branded loader used for route transitions */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-violet-600/15 blur-[90px]" />
      <div className="relative text-center">
        <LoaderMark />
        <div className="mt-8">
          <BrandText size="xl" />
        </div>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
          {SITE_CONFIG.brandTagline}
        </p>
      </div>
    </div>
  );
}

/** First-visit splash. Renders in the initial HTML, then lifts away. */
export function IntroLoader() {
  const [visible, setVisible] = useState(!introPlayed);

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      introPlayed = true;
      setVisible(false);
    }, reduce ? 350 : 2100);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
          role="status"
          aria-live="polite"
          aria-label="Loading CodAbhi"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-1/4 right-[18%] h-64 w-64 rounded-full bg-violet-600/20 blur-[100px]" />

          <div className="relative w-[min(92vw,280px)] text-center">
            <LoaderMark />

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              <BrandText size="xl" />
            </motion.div>

            <motion.p
              className="mt-3 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {SITE_CONFIG.brandTagline}
            </motion.p>

            <div className="mx-auto mt-8 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
