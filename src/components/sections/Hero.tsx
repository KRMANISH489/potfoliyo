"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

const codeLines = [
  "const studio = {",
  `  brand: "${SITE_CONFIG.brand}",`,
  '  dev: "Abhishek Kumar Mishra",',
  '  stack: ["React.js", "Node.js", "MongoDB"],',
  '  seo: ["On-page", "Technical", "Local"],',
  '  motto: "build · ship · rank",',
  "};",
];

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <motion.div
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-32">
        {/* Text content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">
              {SITE_CONFIG.yearsOfExperience} Years Exp · {SITE_CONFIG.location} · Available for work
            </span>
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </span>
          </h1>

          <p className="mt-4 text-xl font-semibold text-slate-300 sm:text-2xl">
            {SITE_CONFIG.role}
          </p>

          <p className="mt-6 max-w-xl text-lg text-slate-400">
            {SITE_CONFIG.headline}
          </p>

          <p className="mt-4 max-w-xl text-base text-slate-500">
            {SITE_CONFIG.intro}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("projects")}
            >
              View My Work
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollTo("contact")}
            >
              Contact Me
            </Button>
          </div>
        </motion.div>

        {/* Code visual */}
        <motion.div
          className="relative w-full max-w-lg flex-1"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center gap-2 rounded-t-xl border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-500">portfolio.tsx</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-slate-300"
                >
                  <span className="mr-4 select-none text-slate-600">{i + 1}</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/"([^"]+)"/g, '<span class="text-cyan-400">"$1"</span>')
                        .replace(/const|role|skills|passion/g, '<span class="text-violet-400">$&</span>'),
                    }}
                  />
                </motion.div>
              ))}
            </pre>
          </div>

          {/* Floating badges */}
          <motion.div
            className="absolute -right-4 top-8 rounded-xl border border-white/10 bg-[#0a0a0f]/90 px-4 py-2 shadow-lg backdrop-blur-sm"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-xs font-semibold text-cyan-400">React.js</span>
          </motion.div>
          <motion.div
            className="absolute -left-4 bottom-12 rounded-xl border border-white/10 bg-[#0a0a0f]/90 px-4 py-2 shadow-lg backdrop-blur-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-xs font-semibold text-violet-400">MongoDB</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
