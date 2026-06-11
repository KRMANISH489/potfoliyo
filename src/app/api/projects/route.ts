import { NextRequest, NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/projects";
import { isAuthenticated } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type { ProjectInput } from "@/types/project";

/** GET /api/projects — list all projects (public) */
export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

/** POST /api/projects — create project (admin only) */
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as ProjectInput;

    if (!body.name || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await createProject({
      ...body,
      slug: body.slug || slugify(body.name),
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
