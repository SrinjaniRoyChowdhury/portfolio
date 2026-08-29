export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  accent: string;
};

export type Certificate = {
  id: string;
  title: string;
  src: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
};

/** First N projects on the homepage before “See all”. */
export const FEATURED_PROJECT_COUNT = 3;

/** Filter pills on My Work. `value` must match Project.category. */
export const projectFilters = [
  { label: "All", value: "all" },
  { label: "Web Dev", value: "Web Development" },
  { label: "ML", value: "Machine Learning" },
  { label: "AI SaaS", value: "AI SaaS" },
] as const;

export type ProjectFilter = (typeof projectFilters)[number]["value"];

export const PROJECT_CATEGORIES = [
  "Web Development",
  "Machine Learning",
  "AI SaaS",
] as const;
