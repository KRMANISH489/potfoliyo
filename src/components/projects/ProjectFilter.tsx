"use client";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/project";

const FILTERS: Array<{ label: string; value: ProjectCategory | "All" }> = [
  { label: "All Projects", value: "All" },
  { label: "Landing Pages", value: "Landing Pages" },
  { label: "Business Websites", value: "Business Websites" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Education", value: "Education" },
  { label: "Custom Web Apps", value: "Custom Web Apps" },
];

interface ProjectFilterProps {
  active: ProjectCategory | "All";
  onChange: (value: ProjectCategory | "All") => void;
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
            active === filter.value
              ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25"
              : "border border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/30 hover:text-white"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
