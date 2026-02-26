export const personalInfo = {
  name: "Eric Wong",
  title: "Software Engineer",
  email: "wongeric@uchicago.edu",
  bio: "My interests center on systems and AI infrastructure, including distributed services and platforms that enable machine learning to operate in production.",
  roles: [
    { title: "Research Assistant", org: "Amyoli Internet Research Lab @ UChicago" },
    { title: "B.S. Computer Science", org: "The University of Chicago" },
  ],
  socials: {
    github: "https://github.com/erwic06",
    linkedin: "https://linkedin.com/in/eric-wong-uchi",
  },
};

export interface Project {
  name: string;
  award?: string;
  date: string;
  description: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    name: "Micro-vLLM",
    date: "2025",
    description:
      "PagedAttention KV cache manager with C++/CUDA kernels and an O(1) block allocator for efficient LLM inference.",
    tech: ["C++", "CUDA", "Python"],
  },
  {
    name: "Spot: AI Gym Coach",
    award: "1st Place — UChicago VC Hackathon",
    date: "2024",
    description:
      "AI-powered gym coach with rep detection and voice coaching using MediaPipe pose estimation, deployed on GCP with Firebase backend.",
    tech: ["Python", "MediaPipe", "FastAPI", "GCP", "Firebase"],
  },
  {
    name: "Financial Sentiment Analysis Platform",
    date: "2024",
    description:
      "S&P 500 sentiment mapping platform with Redis caching and a PostgreSQL schema for financial data analysis.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
  },
];

export const archiveItems = [
  { name: "v1 — HTML/CSS Static Site", year: "2022" },
  { name: "v2 — Next.js Portfolio", year: "2023" },
  { name: "v3 — React + Vite (current)", year: "2025" },
];
