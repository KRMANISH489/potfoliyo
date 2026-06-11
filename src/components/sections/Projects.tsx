"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilter from "@/components/projects/ProjectFilter";
import type { Project, ProjectCategory } from "@/types/project";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Portfolio"
          title="Featured Projects & Case Studies"
          description="A selection of websites, landing pages, and web applications I've built for clients across industries."
        />

        <div className="mt-10">
          <ProjectFilter active={filter} onChange={setFilter} />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-slate-400">
            No projects found in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
