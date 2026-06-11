"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import Button from "@/components/ui/Button";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
        {project.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-1 text-xs font-semibold text-white">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-400">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={project.liveUrl} variant="outline" size="sm" external>
            <ExternalLink className="h-4 w-4" />
            Live Site
          </Button>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Case Study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
