"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-center">
        <motion.div
          className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-[2px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0a0a0f]">
            <span className="font-mono text-lg font-bold text-cyan-400">&lt;/&gt;</span>
          </div>
        </motion.div>
        <motion.p
          className="mt-6 font-mono text-sm text-slate-400"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading portfolio...
        </motion.p>
      </div>
    </div>
  );
}
