"use client";

import { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  videoSrc: string;
}

const projects: Project[] = [
  {
    id: "hadi-ai",
    name: "Hadi AI",
    description:
      "A high-performance AI orchestration platform built for scale. Leverages LangChain and OpenAI to automate complex enterprise workflows with zero-latency streaming.",
    tags: ["Langchain", "AWS", "OpenAI API"],
    demoUrl: "#",
    githubUrl: "#",
    videoSrc: "/videos/hadiDemo.mp4",
  },
  {
    id: "exoplanet-detector",
    name: "Exoplanet Detector",
    description:
      "A real-time personal finance tracker with intelligent categorization and predictive spending insights powered by ML models.",
    tags: ["Tensorflow", "Pandas", "NumPy"],
    demoUrl: "#",
    githubUrl: "#",
    videoSrc: "/videos/exoplanet-detector.mp4",
  },
  {
    id: "beaver-trails",
    name: "Beaver Trails",
    description:
      "End-to-end encrypted note-taking platform with zero-knowledge architecture. Your data stays yours — always.",
    tags: ["Mapbox", "Eleven", "Auth0", "Web-XR"],
    demoUrl: "#",
    githubUrl: "#",
    videoSrc: "/videos/beaver3.mp4",
  },
  {
    id: "tensorrt-benchlab",
    name: "TensorRT Benchlab",
    description:
      "A distraction-free terminal emulator with a built-in AI copilot that explains commands, catches errors, and suggests optimizations.",
    tags: ["Pytorch", "Next.js", "React.js"],
    demoUrl: "#",
    githubUrl: "#",
    videoSrc: "/videos/zen-terminal.mp4",
  },
];

export function ProjectsShowcase() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  function handleTabChange(id: string) {
    setActiveId(id);
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Card container */}
      <div className="rounded-2xl bg-white/70 dark:bg-zinc-800/40 backdrop-blur-sm border border-zinc-200/70 dark:border-white/6 p-8 shadow-[0_8px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
        {/* Tab bar */}
        <div className="flex items-center gap-8 mb-8 border-b border-zinc-200/70 dark:border-white/6 pb-0">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleTabChange(project.id)}
              className={`relative pb-4 text-sm tracking-wide transition-colors duration-200 ${
                activeId === project.id
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-400 dark:text-white/40 hover:text-zinc-600 dark:hover:text-white/70"
              }`}
            >
              {project.name}
              {activeId === project.id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-zinc-900 dark:bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Video player */}
          <div className="relative rounded-xl overflow-hidden bg-zinc-200/60 dark:bg-zinc-900/60 aspect-video">
            <video
              key={active.videoSrc}
              src={active.videoSrc}
              className="w-full h-full object-cover"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
            />
          </div>

          {/* Project info */}
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 dark:text-white tracking-tight">
              {active.name}
            </h2>

            <p className="text-zinc-500 dark:text-white/65 text-[0.95rem] leading-relaxed">
              {active.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[0.75rem] tracking-wide text-zinc-600 dark:text-white/70 border border-zinc-300 dark:border-white/15 bg-zinc-100 dark:bg-white/4"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={active.demoUrl}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-white/90 transition-colors duration-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Demo
              </a>
              <a
                href={active.githubUrl}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-700/60 text-zinc-700 dark:text-white/80 text-sm font-medium border border-zinc-300 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
