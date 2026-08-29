import type { ReactNode } from "react";
import { FaDocker, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiFastapi,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/**
 * HOW TO ADD A SKILL
 *
 * 1. Add one object to `skills` below. The marquee updates by itself.
 * 2. `category` is only for grouping later (Languages, Frontend, etc.).
 *    The homepage still shows one looping row.
 * 3. `icon` must match a key in `skillIcons`. If you need a new icon:
 *    - import it from react-icons (fa / si)
 *    - add it to `skillIcons` with a short key
 *    - use that key in the skill object
 *
 * Example:
 *   { name: "Redis", icon: "redis", category: "Databases" }
 */

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "AI"
  | "Databases"
  | "Tools";

export type Skill = {
  name: string;
  icon: string;
  category: SkillCategory;
};

export const skillIcons: Record<string, ReactNode> = {
  python: <FaPython />,
  typescript: <SiTypescript />,
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  nodejs: <FaNodeJs />,
  fastapi: <SiFastapi />,
  tailwind: <SiTailwindcss />,
  langchain: <SiLangchain />,
  mysql: <SiMysql />,
  postgresql: <SiPostgresql />,
  mongodb: <SiMongodb />,
  docker: <FaDocker />,
};

export const skills: Skill[] = [
  { name: "Python", icon: "python", category: "Languages" },
  { name: "TypeScript", icon: "typescript", category: "Languages" },
  { name: "React.js", icon: "react", category: "Frontend" },
  { name: "Next.js", icon: "nextjs", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwind", category: "Frontend" },
  { name: "Node.js", icon: "nodejs", category: "Backend" },
  { name: "FastAPI", icon: "fastapi", category: "Backend" },
  { name: "LangChain", icon: "langchain", category: "AI" },
  { name: "MySQL", icon: "mysql", category: "Databases" },
  { name: "PostgreSQL", icon: "postgresql", category: "Databases" },
  { name: "MongoDB", icon: "mongodb", category: "Databases" },
  { name: "Docker", icon: "docker", category: "Tools" },
];
