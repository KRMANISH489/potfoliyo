"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/project";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";
import Button from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  }, []);

  useEffect(() => {
    async function init() {
      const authRes = await fetch("/api/auth/me");
      if (!authRes.ok) {
        router.push("/admin/login");
        return;
      }
      await fetchProjects();
      setLoading(false);
    }
    init();
  }, [router, fetchProjects]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditing(null);
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Manage portfolio projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm text-slate-400 hover:text-cyan-400 sm:block"
            >
              View Site
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Projects ({projects.length})
            </h2>
            <p className="text-sm text-slate-400">
              Add, edit, or remove portfolio projects
            </p>
          </div>
          {!showForm && (
            <Button
              variant="primary"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">
              {editing ? "Edit Project" : "New Project"}
            </h3>
            <ProjectForm
              initial={editing}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          </div>
        )}

        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onRefresh={fetchProjects}
        />
      </main>
    </div>
  );
}
