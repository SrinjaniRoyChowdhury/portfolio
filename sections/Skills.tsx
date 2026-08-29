"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { skillIcons, skills } from "@/lib/skills";

const ease = [0.22, 1, 0.36, 1] as const;

const skillLogos: LogoItem[] = skills.map((item) => ({
  node: skillIcons[item.icon] ?? null,
  title: item.name,
}));

function SkillLogo({ item }: { item: LogoItem }) {
  const title = "title" in item ? item.title : undefined;
  const node = "node" in item ? item.node : null;

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/90 backdrop-blur-sm">
      {node}

      {title && (
        <span className="whitespace-nowrap text-sm font-medium tracking-tight">
          {title}
        </span>
      )}
    </div>
  );
}

/** Skills list: lib/skills.ts — add items there, this marquee updates itself. */
export default function Skills() {
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">(
    "left",
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("left");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("right");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-16 text-center sm:px-6 md:pt-20 lg:px-8">
        <motion.h2
          className="text-heading bg-gradient-to-r from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE] bg-clip-text !text-transparent"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
        >
          My Technical Skills
        </motion.h2>

        <motion.p
          className="mt-3 text-base text-[#ebaee9] sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
        >
          Technologies I’ve worked with so far
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 mt-10 w-full"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease }}
      >
        <LogoLoop
          logos={skillLogos}
          speed={70}
          direction={scrollDirection}
          logoHeight={40}
          gap={14}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Technical skills"
          renderItem={(item) => <SkillLogo item={item} />}
        />
      </motion.div>

      <div className="h-14 md:h-16" />
    </section>
  );
}
