"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
}

const sizes = {
  sm: { box: "h-8 w-8 rounded-lg text-[9px]", text: "text-base", gap: "gap-2", corner: "h-2.5 w-2.5" },
  md: { box: "h-10 w-10 rounded-xl text-[11px]", text: "text-lg", gap: "gap-2.5", corner: "h-3 w-3" },
  lg: { box: "h-12 w-12 rounded-xl text-xs", text: "text-xl", gap: "gap-3", corner: "h-3.5 w-3.5" },
  xl: { box: "h-20 w-20 rounded-2xl text-2xl", text: "text-4xl", gap: "gap-4", corner: "h-5 w-5" },
};

/** CodAbhi monogram — `CA` in a code-style box */
function LogoMark({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const s = sizes[size];

  return (
    <motion.div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden",
        "border border-white/10 bg-gradient-to-br from-[#111118] to-[#0a0a0f]",
        "font-mono font-bold shadow-lg shadow-black/40",
        s.box
      )}
      whileHover={{ scale: 1.04, borderColor: "rgba(34, 211, 238, 0.35)" }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <span className={cn("absolute left-0 top-0 rounded-tl-lg border-l-2 border-t-2 border-cyan-400/70", s.corner)} />
      <span className={cn("absolute bottom-0 right-0 rounded-br-lg border-b-2 border-r-2 border-violet-500/70", s.corner)} />

      <span className="relative z-10 tracking-tight">
        <span className="text-cyan-400">C</span>
        <span className="text-violet-400">A</span>
      </span>

      <motion.span
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function BrandText({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const s = sizes[size];

  return (
    <span className={cn("font-mono font-semibold tracking-tight", s.text)}>
      <span className="text-cyan-400">{SITE_CONFIG.brandPart1}</span>
      <span className="text-white">{SITE_CONFIG.brandPart2}</span>
    </span>
  );
}

export default function BrandLogo({
  showText = true,
  size = "md",
  className,
  href = "/",
}: BrandLogoProps) {
  const s = sizes[size];

  const content = (
    <div className={cn("group flex items-center", s.gap, className)}>
      <LogoMark size={size} />
      {showText && (
        <div className="flex flex-col leading-tight">
          <BrandText size={size} />
          {size !== "sm" && (
            <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600 sm:block">
              {SITE_CONFIG.brandTagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export { LogoMark, BrandText };
