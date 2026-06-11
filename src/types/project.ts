/** Project category filter options for the portfolio grid */
export type ProjectCategory =
  | "Landing Pages"
  | "Business Websites"
  | "E-commerce"
  | "Healthcare"
  | "Real Estate"
  | "Education"
  | "Custom Web Apps";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Landing Pages",
  "Business Websites",
  "E-commerce",
  "Healthcare",
  "Real Estate",
  "Education",
  "Custom Web Apps",
];

/** Full project schema used across the site and admin dashboard */
export interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  techStack: string[];
  liveUrl: string;
  featured: boolean;
  clientNiche: string;
  role: string;
  features: string[];
  challenges: string;
  solutions: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};
