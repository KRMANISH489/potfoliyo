"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Star, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";
import Button from "@/components/ui/Button";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onRefresh: () => void;
}

export default function ProjectList({ projects, onEdit, onRefresh }: ProjectListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      onRefresh();
    } catch {
      alert("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  if (projects.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
        No projects yet. Add your first project above.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center"
        >
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold text-white">{project.name}</h3>
              {project.featured && (
                <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
              )}
            </div>
            <p className="text-sm text-slate-500">{project.category}</p>
            <p className="mt-1 line-clamp-1 text-sm text-slate-400">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-cyan-400"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <Button variant="ghost" size="sm" onClick={() => onEdit(project)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(project.id)}
              disabled={deleting === project.id}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
