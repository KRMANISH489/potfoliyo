"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl",
        hover && "transition-shadow duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
