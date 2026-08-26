"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

const experiences: Experience[] = [
  {
    role: "AI Full Stack Intern",
    company: "Better Best Software Solutions",
    duration: "April 2026 – Present",
    description:
      "Building AI-powered and full-stack applications, working across frontend development, backend APIs, and AI integrations.",
  },

  // Just add future experiences here.
  // The layout will automatically switch when there is more than one.
  //
  // {
  //   role: "Software Developer Intern",
  //   company: "Company Name",
  //   duration: "June 2027 – August 2027",
  //   description:
  //     "Worked on scalable full-stack applications and backend services.",
  // },
];

type ExperienceItemProps = {
  exp: Experience;
  idx: number;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
};

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
}: ExperienceItemProps) {
  const scale = useTransform(scrollYProgress, [start, end], [0.7, 1]);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 35 : -35, 0]
  );

  return (
    <div className="relative flex flex-1 justify-center">
      {/* Timeline dot */}
      <motion.div
        className="z-20 mt-1 h-5 w-5 rounded-full bg-white shadow-[0_0_0_7px_rgba(168,85,247,0.15),0_0_25px_rgba(168,85,247,0.8)]"
        style={{ scale, opacity }}
      />

      {/* Connector */}
      <motion.div
        className={`absolute left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-purple-400/80 to-transparent ${
          idx % 2 === 0 ? "top-6" : "bottom-6"
        }`}
        style={{
          height: 45,
          opacity,
        }}
      />

      {/* Experience Card */}
      <motion.article
        className={`absolute w-[320px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl ${
          idx % 2 === 0 ? "top-10" : "bottom-10"
        }`}
        style={{
          opacity,
          y,
        }}
      >
        <p className="mb-1 text-sm font-medium text-purple-400">
          {exp.duration}
        </p>

        <h3 className="text-xl font-semibold text-white">
          {exp.role}
        </h3>

        <p className="mb-3 mt-1 text-sm text-gray-400">
          {exp.company}
        </p>

        <p className="text-sm leading-6 text-gray-300">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

/* =========================================================
   SINGLE EXPERIENCE
   ========================================================= */

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

function SingleExperience({ exp }: { exp: Experience }) {
  return (
    <div className="relative mx-auto flex flex-col items-center px-6 pb-16 pt-6 sm:pb-20">
      {/* Timeline spine — keeps the “journey” look until more roles are added */}
      <div className="absolute bottom-16 left-1/2 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-purple-400/60 via-purple-400/20 to-transparent sm:bottom-20" />

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
        className="relative z-20 h-5 w-5 rounded-full bg-white shadow-[0_0_0_7px_rgba(168,85,247,0.15),0_0_25px_rgba(168,85,247,0.8)]"
      />

      {/* Short connector into the card */}
      <div className="h-7 w-px bg-gradient-to-b from-purple-400/80 to-transparent" />

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
          delay: 0.12,
        }}
        className="relative w-[min(90vw,380px)] rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-xl backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-purple-500/5 blur-xl" />

        <p className="mb-2 text-sm font-medium text-purple-400">
          {exp.duration}
        </p>

        <h3 className="text-xl font-semibold text-white">{exp.role}</h3>

        <p className="mt-1 text-sm text-gray-400">{exp.company}</p>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

/* =========================================================
   MOBILE MULTI-EXPERIENCE
   ========================================================= */

function MobileExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
}: ExperienceItemProps) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const x = useTransform(scrollYProgress, [start, end], [-30, 0]);

  return (
    <div className="relative pl-8">
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(168,85,247,0.15),0_0_20px_rgba(168,85,247,0.7)]"
        style={{ opacity }}
      />

      {/* Card */}
      <motion.article
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl backdrop-blur-xl"
        style={{
          opacity,
          x,
        }}
      >
        <p className="mb-1 text-sm font-medium text-purple-400">
          {exp.duration}
        </p>

        <h3 className="text-xl font-semibold text-white">
          {exp.role}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {exp.company}
        </p>

        <p className="mt-3 text-sm leading-6 text-gray-300">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

/* =========================================================
   MULTIPLE EXPERIENCES
   ========================================================= */

function MultiExperience() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const sceneHeight = `${Math.max(120, experiences.length * 100)}vh`;

  const lineProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-black text-white"
    >
      <div
        ref={sceneRef}
        style={{
          height: sceneHeight,
        }}
        className="relative"
      >
        <div className="sticky top-0 flex h-screen flex-col">
          <ExperienceHeading className="pt-10" />

          {/* =================================================
              MULTIPLE EXPERIENCES - DESKTOP
              ================================================= */}

          <div className="relative mx-auto hidden w-full max-w-6xl flex-1 items-center px-8 md:flex">
            {/* Base timeline */}
            <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-white/10" />

            {/* Animated timeline */}
            <motion.div
              className="absolute left-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500"
              style={{
                width: lineProgress,
              }}
            />

            {experiences.map((exp, index) => {
              const start = index / experiences.length;
              const end = (index + 1) / experiences.length;

              return (
                <ExperienceItem
                  key={`${exp.company}-${exp.role}-${index}`}
                  exp={exp}
                  idx={index}
                  start={start}
                  end={end}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </div>

          {/* =================================================
              MULTIPLE EXPERIENCES - MOBILE
              ================================================= */}

          <div className="relative flex-1 px-6 py-10 md:hidden">
            {/* Base vertical timeline */}
            <div className="absolute bottom-10 left-6 top-10 w-px bg-white/10" />

            {/* Animated vertical timeline */}
            <motion.div
              className="absolute left-6 top-10 w-px -translate-x-1/2 bg-gradient-to-b from-purple-500 via-fuchsia-400 to-purple-500"
              style={{
                height: lineProgress,
              }}
            />

            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const start = index / experiences.length;
                const end = (index + 1) / experiences.length;

                return (
                  <MobileExperienceItem
                    key={`${exp.company}-${exp.role}-${index}`}
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

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function Experience() {
  if (experiences.length === 1) {
    return (
      <section
        id="experience"
        className="relative overflow-hidden bg-black text-white"
      >
        <ExperienceHeading className="pt-16 md:pt-20" />
        <SingleExperience exp={experiences[0]} />
      </section>
    );
  }

  return <MultiExperience />;
}