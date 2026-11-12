import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4 text-center">
      <div className="relative">
        <span className="text-[120px] font-bold leading-none text-white/5 sm:text-[180px]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-6xl font-bold text-transparent sm:text-8xl">
            404
          </span>
        </div>
      </div>

      <h1 className="mt-8 text-2xl font-bold text-white sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Home className="h-5 w-5" />
          Go Home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:border-cyan-500/30"
        >
          <ArrowLeft className="h-5 w-5" />
          View Projects
        </Link>
      </div>
    </div>
  );
}
