/**
 * Homepage content: projects, certificates, and experience.
 * Edit the arrays in this file. Refresh the site to see changes.
 */
import type { Certificate, Experience, Project } from "@/lib/content-types";

/**
 * HOW TO ADD A PROJECT
 *
 * 1. Copy one object below (keep a unique `id`, kebab-case).
 * 2. Fill title, description, tech, githubUrl.
 * 3. category must be one of: "Web Development" | "Machine Learning" | "AI SaaS"
 *    (add a new one in lib/content-types.ts → PROJECT_CATEGORIES + projectFilters).
 * 4. liveUrl: only if it is deployed. Omit the field if there is no live site.
 * 5. accent: copy a gradient from another card, or leave and pick later.
 * 6. Order = homepage order. First 3 show before “See all”.
 *
 * New category example (in lib/content-types.ts):
 *   PROJECT_CATEGORIES → add "Mobile"
 *   projectFilters     → { label: "Mobile", value: "Mobile" }
 */
export const defaultProjects: Project[] = [
  {
    id: "interviewer-ai",
    title: "Interviewer AI",
    category: "AI SaaS",
    description:
      "AI interview simulator that reads a resume, asks role-specific questions, and scores answers in real time.",
    tech: ["FastAPI", "Gemini", "React", "MCP"],
    githubUrl: "https://github.com/SrinjaniRoyChowdhury/Interviewer-AI",
    accent: "from-[#D78FEE] via-[#9B5DE0] to-[#5C3D9A]",
  },
  {
    id: "fintrack",
    title: "FinTrack",
    category: "Web Development",
    description:
      "Personal finance manager for budgets, expenses, and visual spend analytics with secure authentication.",
    tech: ["Next.js", "PostgreSQL", "Clerk", "Recharts"],
    githubUrl:
      "https://github.com/SrinjaniRoyChowdhury/FinTrack-Manage-your-Expenses",
    liveUrl: "https://fin-track-neon-beta.vercel.app",
    accent: "from-[#9B5DE0] via-[#7B4EC4] to-[#4E56C0]",
  },
  {
    id: "healthcare-feature-engineering",
    title: "Healthcare Feature Engineering",
    category: "Machine Learning",
    description:
      "Feature engineering pipeline on healthcare patient records to prepare data for downstream ML models.",
    tech: ["Python", "Pandas", "ML"],
    githubUrl:
      "https://github.com/SrinjaniRoyChowdhury/healthcare_feature_engineering",
    liveUrl: "https://healthcarefeatureengineeringbysrinjani.streamlit.app/",
    accent: "from-[#343A72] via-[#4A3A8C] to-[#5C3D9A]",
  },
  {
    id: "task-management-system",
    title: "Task Management System",
    category: "Web Development",
    description:
      "Task board for creating, organizing, and tracking work across a simple full-stack workflow.",
    tech: ["JavaScript", "Node.js"],
    githubUrl:
      "https://github.com/SrinjaniRoyChowdhury/Task-Management-System",
    accent: "from-[#4E56C0] via-[#9B5DE0] to-[#D78FEE]",
  },
  {
    id: "naksh-jewels",
    title: "Naksh Jewels",
    category: "Web Development",
    description:
      "Jewelry storefront with product browsing and cart flows for a focused shopping experience.",
    tech: ["JavaScript", "React"],
    githubUrl:
      "https://github.com/SrinjaniRoyChowdhury/naksh-jewels-ecommerce",
    accent: "from-[#6B4BB8] via-[#9B5DE0] to-[#4E56C0]",
  },
  {
    id: "watchnext",
    title: "watchNext",
    category: "Web Development",
    description:
      "A JavaScript app for discovering what to watch next, built around a lightweight browsing flow.",
    tech: ["JavaScript"],
    githubUrl: "https://github.com/SrinjaniRoyChowdhury/watchNext",
    accent: "from-[#5C3D9A] via-[#4E56C0] to-[#26262c]",
  },
  {
    id: "ezst-ai",
    title: "EzST-AI",
    category: "AI SaaS",
    description:
      "B2B invoice tracking and GST compliance with OCR, Gemini agents, fraud detection, and a RAG chatbot.",
    tech: ["FastAPI", "React", "Gemini", "Neo4j"],
    githubUrl: "https://github.com/SrinjaniRoyChowdhury/EzST-AI",
    accent: "from-[#4E56C0] via-[#6B4BB8] to-[#2E2A6A]",
  },
];

/**
 * HOW TO ADD A CERTIFICATE
 *
 * 1. Drop the image into public/certificates/ (png or jpg).
 * 2. Call cert() with:
 *    - id: unique kebab-case string
 *    - file: exact filename, including spaces/extension
 *    - title: shown as alt text when opened
 * 3. The certificates marquee picks it up automatically.
 *
 * Example:
 *   cert("ibm-watson", "watson course.jpg", "IBM Watson Intro"),
 */
function cert(id: string, file: string, title: string): Certificate {
  return {
    id,
    title,
    src: encodeURI(`/certificates/${file}`),
  };
}

export const defaultCertificates: Certificate[] = [
  cert("gdsc-hackathon", "Hackhaton01_GDSC_P2D.png", "GDSC plot2deploy Hackathon — 1st Place"),
  cert("ibm-prompt", "prompt engineering ibm.jpg", "IBM Prompt Engineering for Everyone"),
  cert("tiu-esd", "ESD program tiu.jpg", "TIU Entrepreneurship Skill Development"),
  cert("ibm-ml", "machine learning with python ibm.jpg", "IBM Machine Learning with Python"),
  cert("troubleshoot", "TroubleShoot Ideathon.jpg", "Troubleshoot Ideathon 2025"),
  cert("ibm-dl", "deep learning with tensorflow ibm.jpg", "IBM Deep Learning with TensorFlow"),
  cert(
    "ms-python",
    "Python_Cloud_Skill_Challenge.jpg",
    "Microsoft Learn Python Cloud Skills Challenge",
  ),
];

/**
 * HOW TO ADD EXPERIENCE
 *
 * 1. Copy one object below. Use a unique `id`.
 * 2. Order is left to right on the timeline (first item appears first).
 * 3. The timeline layout handles any number of roles.
 *
 * Example:
 *   {
 *     id: "company-intern-2027",
 *     role: "Software Developer Intern",
 *     company: "Company Name",
 *     duration: "June 2027 – August 2027",
 *     description: "What you built or owned.",
 *   },
 */
export const defaultExperience: Experience[] = [
  
  {
    id: "ibm-v",
    role: "AI & Machine Learning Virtual Internship",
    company: "IBM",
    duration: "October 2025 – December 2025",
    description:
      "Gained hands-on experience in AI and machine learning through practical projects, exploring prompt engineering, data analysis, and machine learning concepts.",
  },
  {
    id: "better-best",
    role: "AI Full Stack Intern",
    company: "Better Best Software Solutions",
    duration: "April 2026 – present",
    description:
      "Building AI-powered and full-stack applications, working across frontend development, backend APIs, and AI integrations.",
  },
];
