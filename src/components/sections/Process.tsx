"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { WORK_PROCESS } from "@/lib/constants";

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Process"
          title="How We'll Work Together"
          description="A proven workflow that keeps projects on track, on budget, and aligned with your goals."
        />

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-transparent md:left-1/2 md:block" />

          <div className="space-y-12">
            {WORK_PROCESS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div
                    className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${
                      index % 2 === 0 ? "md:ml-auto md:max-w-md" : "md:mr-auto md:max-w-md"
                    }`}
                  >
                    <span className="font-mono text-sm font-bold text-cyan-400">{step.step}</span>
                    <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                  </div>
                </div>

                <div className="absolute left-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cyan-400 bg-[#0a0a0f] md:left-1/2 md:block" />

                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
