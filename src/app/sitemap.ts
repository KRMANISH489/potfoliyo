import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date(project.updatedAt || project.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
