import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  const hasLive = Boolean(project.liveUrl);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div
        className={cn(
          "relative isolate h-44 overflow-hidden bg-gradient-to-br sm:h-48",
          project.accent,
        )}
      >
        <div className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-8 size-32 rounded-full bg-black/30 blur-2xl" />

        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-1.5">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 h-16 w-24 rounded-xl border border-white/15 bg-black/40 shadow-lg backdrop-blur-sm" />
        <div className="absolute bottom-6 right-10 h-20 w-12 rounded-lg border border-white/15 bg-black/50 shadow-lg backdrop-blur-sm" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="w-fit rounded-full border border-[#9B5DE0]/30 bg-[#9B5DE0]/10 px-3 py-1 text-xs font-medium text-[#D78FEE]">
          {project.category}
        </span>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        <div className={cn("mt-5 flex gap-2", hasLive ? "flex-row" : "")}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#9B5DE0] to-[#4E56C0] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/15 transition hover:scale-[1.02] hover:shadow-purple-500/25"
            >
              Live Website
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/[0.08]",
              hasLive ? "flex-1" : "w-full",
            )}
          >
            <FaGithub className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
