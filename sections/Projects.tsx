"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { defaultProjects } from "@/lib/content-defaults";
import {
  FEATURED_PROJECT_COUNT,
  projectFilters,
  type ProjectFilter,
} from "@/lib/content-types";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Projects list: lib/content-defaults.ts */
export default function Projects() {
  const projects = defaultProjects;
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter, projects],
  );

  const visible =
    filter === "all" && !showAll
      ? filtered.slice(0, FEATURED_PROJECT_COUNT)
      : filtered;

  const canExpand = filter === "all" && filtered.length > FEATURED_PROJECT_COUNT;

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-16 pb-14 sm:px-6 md:pt-20 lg:px-8">
        <motion.div
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-heading">My Work</h2>
              <p className="mt-3 max-w-xl text-base text-[#ebaee9] sm:text-lg">
                Explore my latest projects and creations.
              </p>
            </div>

            {canExpand ? (
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-white/80 transition hover:text-white sm:self-auto"
              >
                {showAll ? "Show less" : "See all"}
                {showAll ? (
                  <ArrowUp className="size-4" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
              </button>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {projectFilters.map((item) => {
              const active = filter === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setFilter(item.value);
                    if (item.value !== "all") setShowAll(true);
                  }}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium tracking-tight transition",
                    active
                      ? "bg-white text-[#9B5DE0]"
                      : "border border-white/15 bg-white/[0.04] text-white/70 hover:border-white/25 hover:text-white",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {visible.length === 0 ? (
            <p className="mt-8 text-center text-sm text-white/50">
              No projects in this category yet.
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
