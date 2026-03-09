"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const EXPERIENCES = [
  {
    role: "Technical Co-Founder",
    company: "Hadi AI",
    period: "Jan 2026 — Present",
    description: "RAG Flashcard generations.",
    projectDescription:
      "Built an AI study assistant that turns source material into adaptive flashcards using retrieval-augmented generation. Shipped document ingestion, vector search pipelines, and a React front end for reviewing generated decks with user feedback loops.",
    tech: ["Python", "React", "AWS"],
  },
  {
    role: "Full Stack Developer",
    company: "Placeholder Studio",
    period: "JAN 2023 — APR 2023",
    description: "Placeholder description of role and impact.",
    projectDescription:
      "Implemented full-stack product features across API, database, and frontend layers. Focused on reducing latency in key user flows and improving reliability through stronger validation, observability, and deployment automation.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    role: "Co-founder & Developer",
    company: "Startup Name",
    period: "2022 — 2023",
    description: "Placeholder description of role and impact.",
    projectDescription:
      "Led product development from prototype to early user testing. Designed the core architecture, integrated cloud services, and iterated quickly on user feedback to validate product-market fit.",
    tech: ["TypeScript", "Python", "GCP"],
  },
] as const;

type Experience = (typeof EXPERIENCES)[number];

function TechTag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-mono border border-zinc-300 dark:border-white/[0.15] text-zinc-600 dark:text-white/50 rounded-full">
      {label}
    </span>
  );
}

function ExperienceCard({
  role,
  company,
  description,
  tech,
  index,
  onClick,
}: {
  role: string;
  company: string;
  description: string;
  tech: readonly string[];
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!cardRef.current) return;
    const measure = () => {
      if (!cardRef.current) return;
      setDims({ w: cardRef.current.offsetWidth, h: cardRef.current.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const r = 16;
  const perimeter =
    dims.w > 0
      ? 2 * (dims.w - 2 * r) + 2 * (dims.h - 2 * r) + 2 * Math.PI * r
      : 0;

  const strokeColor =
    theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.22)";

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl border border-zinc-200/70 dark:border-white/[0.08] bg-white/60 dark:bg-zinc-800/50 backdrop-blur-sm p-6 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${role} at ${company}`}
    >
      {/* SVG border trace + periodic glint */}
      {dims.w > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={dims.w}
          height={dims.h}
          style={{ overflow: "visible" }}
        >
          {/* Hover border trace */}
          <motion.rect
            x={0.5}
            y={0.5}
            width={dims.w - 1}
            height={dims.h - 1}
            rx={15.5}
            fill="none"
            stroke={strokeColor}
            strokeWidth={2}
            strokeDasharray={perimeter}
            initial={{ strokeDashoffset: perimeter }}
            animate={{ strokeDashoffset: isHovered ? 0 : perimeter }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
      )}

      {/* Content */}
      <h3
        style={{ fontFamily: '"Bodoni Moda","Bodoni 72","Didot",serif' }}
        className="text-2xl tracking-tight text-zinc-900 dark:text-white"
      >
        {role}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-white/50 mt-0.5">{company}</p>
      <p className="text-sm text-zinc-600 dark:text-white/65 leading-relaxed mt-3">{description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {tech.map((t) => (
          <TechTag key={t} label={t} />
        ))}
      </div>
    </div>
  );
}

function ExperienceModal({
  experience,
  onClose,
}: {
  experience: Experience | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!experience) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [experience, onClose]);

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close experience details"
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-2xl border border-zinc-200/70 dark:border-white/[0.12] bg-white dark:bg-zinc-900 p-6 md:p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-zinc-500 dark:text-white/60 hover:text-zinc-800 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            <p className="text-[11px] tracking-[0.1em] uppercase font-mono text-zinc-500 dark:text-white/45">
              {experience.period}
            </p>
            <h3
              style={{ fontFamily: '"Bodoni Moda","Bodoni 72","Didot",serif' }}
              className="mt-2 text-3xl tracking-tight text-zinc-900 dark:text-white"
            >
              {experience.role}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-white/55 mt-1">{experience.company}</p>
            <p className="text-sm md:text-base text-zinc-700 dark:text-white/70 leading-relaxed mt-5">
              {experience.projectDescription}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {experience.tech.map((t) => (
                <TechTag key={t} label={t} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ExperienceTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-16 text-center pt-12"
      >
        <h1
          style={{ fontFamily: '"Bodoni Moda","Bodoni 72","Didot",serif' }}
          className="text-5xl md:text-6xl tracking-tight text-zinc-900 dark:text-white"
        >
          Professional <em>Journey</em>
        </h1>
        <p className="mt-4 text-sm text-zinc-500 dark:text-white/40 tracking-wide">
          A curated timeline of roles, teams, and problems.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Center spine — desktop only */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200/50 dark:bg-white/[0.06]" />

        <div className="flex flex-col gap-20">
          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0; // even → date left, card right
            return (
              <div key={i} className="relative">
                {/* Spine dot — desktop */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-white/30 z-10"
                />

                {/* Desktop: two-column grid */}
                <div className="hidden md:grid grid-cols-2 items-center gap-0">
                  {isLeft ? (
                    <>
                      {/* Date on left */}
                      <motion.div
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-right pr-8"
                      >
                        <span className="text-[11px] tracking-[0.1em] uppercase font-mono text-zinc-500 dark:text-white/35">
                          {exp.period}
                        </span>
                      </motion.div>
                      {/* Card on right */}
                      <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="pl-8"
                      >
                        <ExperienceCard
                          {...exp}
                          index={i}
                          onClick={() => setSelectedExperience(exp)}
                        />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Card on left */}
                      <motion.div
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="pr-8"
                      >
                        <ExperienceCard
                          {...exp}
                          index={i}
                          onClick={() => setSelectedExperience(exp)}
                        />
                      </motion.div>
                      {/* Date on right */}
                      <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-left pl-8"
                      >
                        <span className="text-[11px] tracking-[0.1em] uppercase font-mono text-zinc-500 dark:text-white/35">
                          {exp.period}
                        </span>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Mobile: single column */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="md:hidden flex flex-col gap-2"
                >
                  <span className="text-[11px] tracking-[0.1em] uppercase font-mono text-zinc-500 dark:text-white/35">
                    {exp.period}
                  </span>
                  <ExperienceCard
                    {...exp}
                    index={i}
                    onClick={() => setSelectedExperience(exp)}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </div>
  );
}
