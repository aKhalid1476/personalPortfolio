"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { JourneyMap } from "@/components/Bio";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 72 : -72, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -72 : 72, opacity: 0 }),
};

const transition = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const };

const SECTION_COUNT = 5;

const CONTACT_LINKS = [
  {
    label: "GitHub",
    handle: "@aKhalid1476",
    href: "https://github.com/aKhalid1476",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "X",
    handle: "@akDev88",
    href: "https://x.com/akDev88",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "a36khali@uwaterloo.ca",
    href: "mailto:a36khali@uwaterloo.ca",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Abdullah Khalid",
    href: "https://www.linkedin.com/in/abdullah-khalid-uw/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const arrowButtonClass =
  "fixed top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full items-center justify-center border border-zinc-300 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white transition-all duration-300 ease-out hidden md:flex";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const expScrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  function goTo(index: number) {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" && current < SECTION_COUNT - 1) goTo(current + 1);
      if (e.key === "ArrowLeft" && current > 0) goTo(current - 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  // Forward wheel events to the experience scroll container when cursor is outside it
  useEffect(() => {
    if (current !== 2) return;
    function onWheel(e: WheelEvent) {
      if (!expScrollRef.current) return;
      if (expScrollRef.current.contains(e.target as Node)) return;
      expScrollRef.current.scrollTop += e.deltaY;
    }
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current]);

  return (
    <main
      className="relative z-10 [overflow:clip]"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (dx < -50 && current < SECTION_COUNT - 1) goTo(current + 1);
        if (dx > 50 && current > 0) goTo(current - 1);
      }}
    >
      {/* Left arrow */}
      <AnimatePresence>
        {current > 0 && (
          <motion.button
            key="left-arrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => goTo(current - 1)}
            aria-label="Previous section"
            className={`${arrowButtonClass} left-8`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right arrow */}
      <AnimatePresence>
        {current < SECTION_COUNT - 1 && (
          <motion.button
            key="right-arrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => goTo(current + 1)}
            aria-label="Next section"
            className={`${arrowButtonClass} right-8`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/50 dark:bg-black/60 backdrop-blur-md border border-white/[0.08]">
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
              i === current
                ? "bg-zinc-900 dark:bg-white scale-125"
                : "bg-zinc-400 dark:bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Sections */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full"
        >
          {current === 2 ? (
            /* Experience — full-height flex column so flex-1 child fills exactly the right space */
            <div className="h-screen flex flex-col pt-16 sm:pt-20 pb-14 sm:pb-16">
              <div
                ref={expScrollRef}
                className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
              >
                <div className="max-w-4xl mx-auto px-6 pb-8">
                  <ExperienceTimeline />
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen flex items-start md:items-center w-full pt-24 sm:pt-28 md:pt-0 pb-20 sm:pb-24 md:pb-0">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">

                {/* 0 — Hero */}
                {current === 0 && <Hero />}

                {/* 1 — About */}
                {current === 1 && (
                  <div className="w-full">
                    <h2
                      style={{ fontFamily: '"Bodoni Moda","Bodoni 72","Didot",serif' }}
                      className="text-4xl md:text-5xl tracking-tight text-zinc-900 dark:text-white mb-10 text-center"
                    >
                      My Journey.
                    </h2>
                    <JourneyMap />
                    <div className="mt-10 max-w-3xl mx-auto">
                      <div className="relative rounded-2xl border border-zinc-200/70 dark:border-white/[0.12] bg-white/55 dark:bg-zinc-900/45 backdrop-blur-md px-6 py-7 md:px-10 md:py-9 shadow-[0_16px_48px_rgba(0,0,0,0.14)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45)]">
                        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-16 -translate-x-1/2 bg-zinc-300/80 dark:bg-white/40" />
                        <p className="text-zinc-700 dark:text-white/75 text-base md:text-lg leading-relaxed text-center">
                        I chose to attend the University of Waterloo, simply because UW produces 
                        the best engineers in the world. I was immediately immersed into design teams 
                        that shipped features every single day, such as Orbital and WARG. Apart from Waterloo,
                        I am working on building the next big Muslim startup - Hadi AI. In my free time, I watch 
                        a lot of NBA.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3 — Projects */}
                {current === 3 && <ProjectsShowcase />}

                {/* 4 — Contact */}
                {current === 4 && (
                  <div className="w-full max-w-2xl mx-auto">
                    <h2
                      style={{ fontFamily: '"Bodoni Moda","Bodoni 72","Didot",serif' }}
                      className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-zinc-900 dark:text-white mb-8 md:mb-12 text-center md:text-left"
                    >
                      Let&apos;s connect.
                    </h2>
                    <div className="flex flex-col">
                      {CONTACT_LINKS.map(({ label, handle, href, icon }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("mailto") ? undefined : "_blank"}
                          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                          className="group flex items-center gap-5 py-4 border-b border-zinc-200/60 dark:border-white/[0.08] hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-300 ease-out hover:-translate-y-0.5"
                        >
                          <span className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-300 dark:border-white/20 text-zinc-500 dark:text-white/60">
                            {icon}
                          </span>
                          <div className="flex-1">
                            <div className="text-zinc-900 dark:text-white font-medium">{label}</div>
                            <div className="text-zinc-500 dark:text-white/50 text-sm break-all">{handle}</div>
                          </div>
                          <svg
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-zinc-500 dark:text-white/60"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Swipe hint — mobile only, hero section only */}
      <AnimatePresence>
        {current === 0 && (
          <motion.div
            key="swipe-hint"
            className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 md:hidden flex items-center gap-2 pointer-events-none rounded-full px-3.5 py-2 border border-zinc-300/70 dark:border-white/20 bg-white/85 dark:bg-zinc-900/70 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[11px] tracking-[0.12em] uppercase font-mono text-zinc-700 dark:text-white/80">
              swipe for more
            </span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700 dark:text-white/80"
              animate={{ x: [0, 6, 0], opacity: [1, 0.65, 1] }}
              transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut", delay: 1.2 }}
            >
              <path d="M9 18l6-6-6-6" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
