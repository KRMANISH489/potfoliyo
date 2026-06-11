import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Wrench,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { getProjectBySlug, getAdjacentProjects, getAllProjects } from "@/lib/projects";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.name,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} | ${SITE_CONFIG.name}`,
      description: project.shortDescription,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Banner */}
        <section className="relative">
          <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden sm:h-[50vh]">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-24 sm:-mt-32">
              <Link
                href="/#projects"
                className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>

              <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold text-cyan-400">
                {project.category}
              </span>

              <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-400">
                {project.shortDescription}
              </p>

              <div className="mt-6">
                <Button href={project.liveUrl} variant="primary" external>
                  <ExternalLink className="h-5 w-5" />
                  Visit Live Website
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white">Project Overview</h2>
              <p className="mt-4 text-slate-400 leading-relaxed">{project.description}</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Client / Niche
                </p>
                <p className="mt-1 text-white">{project.clientNiche}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  My Role
                </p>
                <p className="mt-1 text-white">{project.role}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Technologies
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-white/5 px-3 py-1 text-sm text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/10 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <CheckCircle2 className="h-6 w-6 text-cyan-400" />
              Features Developed
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Lightbulb className="h-5 w-5 text-amber-400" />
                  Challenges
                </h3>
                <p className="mt-4 text-slate-400 leading-relaxed">{project.challenges}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Wrench className="h-5 w-5 text-cyan-400" />
                  Solutions
                </h3>
                <p className="mt-4 text-slate-400 leading-relaxed">{project.solutions}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <section className="border-t border-white/10 py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white">Screenshots</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                  >
                    <Image
                      src={img}
                      alt={`${project.name} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="border-t border-white/10 py-12">
          <div className="mx-auto flex max-w-5xl justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-cyan-400"
              >
                <ArrowLeft className="h-4 w-4" />
                <div>
                  <p className="text-xs text-slate-500">Previous</p>
                  <p className="font-medium text-white group-hover:text-cyan-400">
                    {prev.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center gap-2 text-right text-slate-400 transition-colors hover:text-cyan-400"
              >
                <div>
                  <p className="text-xs text-slate-500">Next</p>
                  <p className="font-medium text-white group-hover:text-cyan-400">
                    {next.name}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
