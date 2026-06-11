"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Globe,
  Code2,
  FileCode,
  ShoppingBag,
  Search,
  Zap,
  Shield,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  layout: Layout,
  globe: Globe,
  code: Code2,
  wordpress: FileCode,
  shopping: ShoppingBag,
  search: Search,
  zap: Zap,
  shield: Shield,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          description="End-to-end web development services tailored for businesses, agencies, and growing brands."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{service.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
