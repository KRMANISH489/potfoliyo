"use client";

import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PRICING_PLANS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

function planLink(name: string) {
  const text = `Hi, I want the ${name} package. Please share the next steps.`;
  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Pricing"
          title="Packages That Stay Simple"
          description="Clear starting prices for an informative page, a business website, or an online store. Domain and hosting are not included."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-xl sm:p-8",
                plan.popular
                  ? "border-cyan-400/40 bg-gradient-to-b from-cyan-500/10 to-violet-600/10 shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-white/5"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-400">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  Delivery: {plan.delivery}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-base text-slate-500 line-through">₹{plan.oldPrice}</p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-white">₹{plan.price}</p>
                <p className="mt-1 h-5 text-sm text-slate-500">{plan.unit}</p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={planLink(plan.name)}
                  external
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
                <p className="mt-4 text-center text-xs text-slate-500">
                  Domain & hosting not included
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
