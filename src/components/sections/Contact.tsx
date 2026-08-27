"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send, Loader2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { SITE_CONFIG, PROJECT_TYPES } from "@/lib/constants";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

/** Build WhatsApp chat URL with prefilled form details */
function buildWhatsAppUrl(form: FormState) {
  const lines = [
    `Hi ${SITE_CONFIG.name.split(" ")[0]}, I found your portfolio (${SITE_CONFIG.brand}).`,
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : null,
    form.projectType ? `Project Type: ${form.projectType}` : null,
    "",
    `Message: ${form.message}`,
  ].filter(Boolean);

  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/** Build mailto URL so the message opens in user's email app to your inbox */
function buildMailtoUrl(form: FormState) {
  const subject = `Portfolio Inquiry${form.projectType ? ` — ${form.projectType}` : ""} | ${form.name}`;
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone / WhatsApp: ${form.phone}` : null,
    form.projectType ? `Project Type: ${form.projectType}` : null,
    "",
    "Message:",
    form.message,
    "",
    "— Sent from CodAbhi portfolio contact form",
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const waUrl = buildWhatsAppUrl(form);
    const emailUrl = buildMailtoUrl(form);
    setWhatsappUrl(waUrl);
    setMailtoUrl(emailUrl);

    try {
      // Best-effort local log (may fail on Vercel — that's OK)
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => null);

      // Open WhatsApp + Email with form content (without leaving the page)
      window.open(waUrl, "_blank", "noopener,noreferrer");
      const mailLink = document.createElement("a");
      mailLink.href = emailUrl;
      mailLink.style.display = "none";
      document.body.appendChild(mailLink);
      mailLink.click();
      document.body.removeChild(mailLink);

      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  const contactLinks = [
    {
      label: "WhatsApp",
      href: SITE_CONFIG.whatsappLink,
      icon: MessageCircle,
      color: "hover:text-green-400",
    },
    {
      label: "Email",
      href: `mailto:${SITE_CONFIG.email}`,
      icon: Mail,
      color: "hover:text-cyan-400",
    },
    {
      label: "LinkedIn",
      href: SITE_CONFIG.linkedin,
      icon: LinkedInIcon,
      color: "hover:text-blue-400",
    },
    {
      label: "GitHub",
      href: SITE_CONFIG.github,
      icon: GitHubIcon,
      color: "hover:text-white",
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Great"
          description="Have a project in mind? Send me a message and I'll get back to you within 24 hours."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <GlassCard hover={false}>
              <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
              <p className="mt-2 text-sm text-slate-400">{SITE_CONFIG.location}</p>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-cyan-400"
                >
                  <Mail className="h-5 w-5 text-cyan-400" />
                  {SITE_CONFIG.email}
                </a>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-cyan-400"
                >
                  <Phone className="h-5 w-5 text-cyan-400" />
                  {SITE_CONFIG.phone}
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400 transition-all hover:border-cyan-500/30 ${link.color}`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-500/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-500/50"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-500/50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Project Type
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-cyan-500/50"
                    >
                      <option value="" className="bg-[#0a0a0f]">
                        Select a type
                      </option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#0a0a0f]">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-500/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === "success" && (
                  <div className="space-y-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                    <p className="text-sm text-green-400">
                      Opening WhatsApp and Email with your message…
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-green-500/20 px-3 py-2 text-xs font-medium text-green-400 hover:bg-green-500/30"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Open WhatsApp
                        </a>
                      )}
                      {mailtoUrl && (
                        <a
                          href={mailtoUrl}
                          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-3 py-2 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Open Email
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please use WhatsApp or email me directly.
                  </p>
                )}

                <Button type="submit" variant="primary" size="lg" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Opening…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send via WhatsApp & Email
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
