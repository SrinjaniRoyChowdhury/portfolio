"use client";

/**
 * Experience list: lib/content-defaults.ts
 * The section pins to the viewport. Scrolling grows a white timeline and
 * reveals remaining cards (even index above the line, odd below). It
 * unpins only after every role is visible.
 */
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type RefObject } from "react";
import { defaultExperience } from "@/lib/content-defaults";
import type { Experience } from "@/lib/content-types";

/** Scroll progress that never rewinds while the user is still scrolling down. */
function usePinnedScrollProgress(target: RefObject<HTMLDivElement | null>) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const pinned = useMotionValue(0);
  const lastY = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const y = window.scrollY;
    const scrollingDown = y >= lastY.current;
    lastY.current = y;

    if (scrollingDown) {
      pinned.set(Math.max(pinned.get(), value));
    } else {
      pinned.set(value);
    }
  });

  return pinned;
}

type ExperienceItemProps = {
  exp: Experience;
  idx: number;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
};

function revealWindow(index: number, total: number): [number, number] {
  if (index === 0) return [-1, 0];
  const last = Math.max(total - 1, 1);
  const start = (index - 0.5) / last;
  const end = Math.min(index / last, 0.8);
  return [Math.max(0, start), end];
}

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
}: ExperienceItemProps) {
  const isAbove = idx % 2 === 0;
  const isFirst = start < 0;
  const fromY = isAbove ? 28 : -28;
  const scale = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, start, end, 1],
    isFirst ? [1, 1] : [0.7, 0.7, 1, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, start, end, 1],
    isFirst ? [1, 1] : [0, 0, 1, 1],
  );
  const y = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, start, end, 1],
    isFirst ? [0, 0] : [fromY, fromY, 0, 0],
  );

  return (
    <div className="relative h-full min-w-0 flex-1">
      <motion.div
        className="absolute left-1/2 top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.12),0_0_18px_rgba(255,255,255,0.45)]"
        style={{ scale, opacity }}
      />

      <motion.div
        className={`absolute left-1/2 w-px -translate-x-1/2 bg-white/80 ${
          isAbove ? "bottom-[calc(50%+0.5rem)]" : "top-[calc(50%+0.5rem)]"
        }`}
        style={{ height: 28, opacity }}
      />

      <motion.article
        className={`absolute left-1/2 w-[min(20rem,calc(100%-0.5rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl ${
          isAbove
            ? "bottom-[calc(50%+2.75rem)]"
            : "top-[calc(50%+2.75rem)]"
        }`}
        style={{ opacity, y }}
      >
        <p className="mb-1 text-sm font-medium text-purple-400">
          {exp.duration}
        </p>
        <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
        <p className="mb-3 mt-1 text-sm text-gray-400">{exp.company}</p>
        <p className="text-sm leading-6 text-gray-300">{exp.description}</p>
      </motion.article>
    </div>
  );
}

function ExperienceHeading({ className }: { className: string }) {
  return (
    <div className={`text-center ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-purple-400"
      >
        My Journey
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-semibold sm:text-5xl"
      >
        Experience
      </motion.h2>
    </div>
  );
}

function MobileExperienceItem({
  exp,
  start,
  end,
  scrollYProgress,
}: ExperienceItemProps) {
  const isFirst = start < 0;
  const opacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, start, end, 1],
    isFirst ? [1, 1] : [0, 0, 1, 1],
  );
  const x = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, start, end, 1],
    isFirst ? [0, 0] : [-28, -28, 0, 0],
  );

  return (
    <div className="relative pl-8">
      <motion.div
        className="absolute left-0 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.12),0_0_18px_rgba(255,255,255,0.4)]"
        style={{ opacity }}
      />
      <motion.article
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl backdrop-blur-xl"
        style={{ opacity, x }}
      >
        <p className="mb-1 text-sm font-medium text-purple-400">
          {exp.duration}
        </p>
        <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
        <p className="mt-1 text-sm text-gray-400">{exp.company}</p>
        <p className="mt-3 text-sm leading-6 text-gray-300">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

function MultiExperience({ items }: { items: Experience[] }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const extraScreens = Math.max(1, items.length - 1);
  const scrollYProgress = usePinnedScrollProgress(sceneRef);

  const initialLine = items.length > 1 ? 0.5 / items.length : 1;
  const lineProgress = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [initialLine, 1, 1],
  );

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        className="relative"
        style={{ height: `${100 + extraScreens * 100}vh` }}
      >
        <div className="sticky top-0 flex h-svh flex-col bg-black">
          <ExperienceHeading className="shrink-0 pt-24 md:pt-28" />

          <div className="relative mx-auto hidden min-h-0 w-full max-w-6xl flex-1 px-8 md:flex">
            <div className="pointer-events-none absolute left-8 right-8 top-1/2 h-[3px] -translate-y-1/2 bg-white/20" />
            <motion.div
              className="pointer-events-none absolute left-8 right-8 top-1/2 h-[3px] -translate-y-1/2 bg-white"
              style={{ scaleX: lineProgress, transformOrigin: "left center" }}
            />

            {items.map((exp, index) => {
              const [start, end] = revealWindow(index, items.length);

              return (
                <ExperienceItem
                  key={exp.id}
                  exp={exp}
                  idx={index}
                  start={start}
                  end={end}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </div>

          <div className="relative min-h-0 flex-1 px-6 py-10 md:hidden">
            <div className="pointer-events-none absolute bottom-10 left-6 top-10 w-[3px] -translate-x-1/2 bg-white/20" />
            <motion.div
              className="pointer-events-none absolute bottom-10 left-6 top-10 w-[3px] origin-top -translate-x-1/2 bg-white"
              style={{ scaleY: lineProgress }}
            />

            <div className="space-y-8">
              {items.map((exp, index) => {
                const [start, end] = revealWindow(index, items.length);

                return (
                  <MobileExperienceItem
                    key={exp.id}
                    exp={exp}
                    idx={index}
                    start={start}
                    end={end}
                    scrollYProgress={scrollYProgress}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  const experiences = defaultExperience;

  if (experiences.length === 0) {
    return (
      <section
        id="experience"
        className="relative bg-black text-white"
      >
        <ExperienceHeading className="pt-16 md:pt-20" />
        <p className="px-6 pb-16 text-center text-sm text-white/50">
          Experience coming soon.
        </p>
      </section>
    );
  }

  return <MultiExperience items={experiences} />;
}
