"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import type { Project, ProjectCategory } from "@/types/project";
import { PROJECT_CATEGORIES } from "@/types/project";
import Button from "@/components/ui/Button";

interface ProjectFormProps {
  initial?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const emptyForm = {
  name: "",
  slug: "",
  category: "Landing Pages" as ProjectCategory,
  shortDescription: "",
  description: "",
  image: "",
  gallery: "",
  techStack: "",
  liveUrl: "",
  featured: false,
  clientNiche: "",
  role: "",
  features: "",
  challenges: "",
  solutions: "",
};

export default function ProjectForm({ initial, onSuccess, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          name: initial.name,
          slug: initial.slug,
          category: initial.category,
          shortDescription: initial.shortDescription,
          description: initial.description,
          image: initial.image,
          gallery: initial.gallery.join("\n"),
          techStack: initial.techStack.join(", "),
          liveUrl: initial.liveUrl,
          featured: initial.featured,
          clientNiche: initial.clientNiche,
          role: initial.role,
          features: initial.features.join("\n"),
          challenges: initial.challenges,
          solutions: initial.solutions,
        }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      shortDescription: form.shortDescription,
      description: form.description,
      image: form.image,
      gallery: form.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      liveUrl: form.liveUrl,
      featured: form.featured,
      clientNiche: form.clientNiche,
      role: form.role,
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      challenges: form.challenges,
      solutions: form.solutions,
    };

    try {
      const url = initial ? `/api/projects/${initial.id}` : "/api/projects";
      const method = initial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save project");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-slate-400">Project Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-400">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="auto-generated if empty"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-slate-400">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
            className={inputClass}
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0a0a0f]">
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-400">Live URL *</label>
          <input
            required
            type="url"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Short Description *</label>
        <input
          required
          value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Full Description *</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Project Image URL *</label>
        <div className="flex gap-2">
          <input
            required
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className={inputClass}
            placeholder="https://... or upload below"
          />
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 hover:border-cyan-500/30">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Gallery URLs (one per line)</label>
        <textarea
          rows={3}
          value={form.gallery}
          onChange={(e) => setForm({ ...form, gallery: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Tech Stack (comma-separated)</label>
        <input
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          className={inputClass}
          placeholder="React, Next.js, MongoDB"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-slate-400">Client / Niche *</label>
          <input
            required
            value={form.clientNiche}
            onChange={(e) => setForm({ ...form, clientNiche: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-400">Your Role *</label>
          <input
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Features (one per line)</label>
        <textarea
          rows={4}
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Challenges *</label>
        <textarea
          required
          rows={3}
          value={form.challenges}
          onChange={(e) => setForm({ ...form, challenges: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-400">Solutions *</label>
        <textarea
          required
          rows={3}
          value={form.solutions}
          onChange={(e) => setForm({ ...form, solutions: e.target.value })}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="rounded border-white/20"
        />
        Mark as featured project
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {initial ? "Update Project" : "Add Project"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
