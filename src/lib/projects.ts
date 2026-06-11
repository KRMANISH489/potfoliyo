import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { Project, ProjectInput } from "@/types/project";
import { slugify } from "@/lib/utils";
import { connectDB, ProjectModel, useMongoDB } from "@/lib/db";

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

/** Read projects from JSON file (default storage) */
async function readJsonProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data) as Project[];
  } catch {
    return [];
  }
}

/** Persist projects to JSON file */
async function writeJsonProjects(projects: Project[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

/** Fetch all projects, sorted by date (newest first) */
export async function getAllProjects(): Promise<Project[]> {
  if (useMongoDB()) {
    await connectDB();
    const projects = await ProjectModel.find({}).lean();
    return (projects as Project[]).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const projects = await readJsonProjects();
  return projects.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** Get a single project by slug */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (useMongoDB()) {
    await connectDB();
    return ProjectModel.findOne({ slug }).lean() as Promise<Project | null>;
  }

  const projects = await readJsonProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

/** Get a single project by ID */
export async function getProjectById(id: string): Promise<Project | null> {
  if (useMongoDB()) {
    await connectDB();
    return ProjectModel.findOne({ id }).lean() as Promise<Project | null>;
  }

  const projects = await readJsonProjects();
  return projects.find((p) => p.id === id) ?? null;
}

/** Create a new project */
export async function createProject(input: ProjectInput): Promise<Project> {
  const now = new Date().toISOString();
  const project: Project = {
    ...input,
    id: input.id || uuidv4(),
    slug: input.slug || slugify(input.name),
    createdAt: now,
    updatedAt: now,
  };

  if (useMongoDB()) {
    await connectDB();
    await ProjectModel.create(project);
    return project;
  }

  const projects = await readJsonProjects();
  projects.unshift(project);
  await writeJsonProjects(projects);
  return project;
}

/** Update an existing project */
export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<Project | null> {
  const now = new Date().toISOString();

  if (useMongoDB()) {
    await connectDB();
    const updated = await ProjectModel.findOneAndUpdate(
      { id },
      { ...input, updatedAt: now },
      { new: true }
    ).lean();
    return updated as Project | null;
  }

  const projects = await readJsonProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  projects[index] = {
    ...projects[index],
    ...input,
    slug: input.slug || (input.name ? slugify(input.name) : projects[index].slug),
    updatedAt: now,
  };
  await writeJsonProjects(projects);
  return projects[index];
}

/** Delete a project by ID */
export async function deleteProject(id: string): Promise<boolean> {
  if (useMongoDB()) {
    await connectDB();
    const result = await ProjectModel.deleteOne({ id });
    return result.deletedCount > 0;
  }

  const projects = await readJsonProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  await writeJsonProjects(filtered);
  return true;
}

/** Get adjacent projects for next/previous navigation */
export async function getAdjacentProjects(slug: string): Promise<{
  prev: Project | null;
  next: Project | null;
}> {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
