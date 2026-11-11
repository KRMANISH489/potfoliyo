"use client";

import { motion } from "framer-motion";
import { CheckCircle2, User } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { SITE_CONFIG } from "@/lib/constants";

const highlights = [
  "3 years of hands-on full stack development experience",
  "Landing pages, business websites & portfolio builds",
  "Multiple live projects delivered end-to-end",
  "SEO for live sites — on-page, technical, and rank tracking",
  "React.js, Node.js, Express.js & MongoDB stack",
];

const buildTypes = [
  "Landing pages & portfolio websites",
  "Business & corporate websites",
  "Full-stack web applications",
  "Website speed optimization",
  "On-page, technical, and local SEO",
];

const whyWorkWithMe = [
  "Clean, maintainable, and scalable code",
  "Mobile-first and user-friendly designs",
  "Fast-loading, performance-focused builds",
  "Clear communication throughout the project",
  "Reliable delivery on live projects",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="About Me"
          title="Crafting Digital Experiences That Convert"
          description="I build websites and web apps, and I handle the SEO that helps them show up in search."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-violet-600/20 p-1">
              <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-xl bg-white pt-10 px-3">
                <div className="relative h-[88%] w-full">
                  <Image
                    src="/profile.png"
                    alt={SITE_CONFIG.name}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-[#0a0a0f]/90 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-cyan-400">{SITE_CONFIG.yearsOfExperience}+</p>
              <p className="text-sm text-slate-400">Years Experience</p>
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-slate-300">
              I&apos;m <strong className="text-white">{SITE_CONFIG.name}</strong>, a{" "}
              {SITE_CONFIG.role.toLowerCase()} based in {SITE_CONFIG.location}.
            </p>
            <p className="text-slate-400">{SITE_CONFIG.intro}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
                <User className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">What I Build</h3>
            </div>
            <ul className="space-y-2">
              {buildTypes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20">
                <CheckCircle2 className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Why Work With Me</h3>
            </div>
            <ul className="space-y-2">
              {whyWorkWithMe.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
