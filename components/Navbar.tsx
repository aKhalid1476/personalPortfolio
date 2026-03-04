"use client";

import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const { toggleTheme } = useTheme();

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6">
      <nav className="w-full max-w-3xl flex items-center justify-between px-6 py-3.5 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-[background,border-color,box-shadow] duration-300">
        {/* AK Initials */}
        <a
          href="/"
          className="font-serif text-[1.1rem] tracking-tight font-medium text-zinc-800 dark:text-white/90 select-none leading-none"
        >
          AK
        </a>

        {/* Right: nav links + divider + theme toggle */}
        <div className="flex items-center gap-6">
          <a
            href="/projects"
            className="text-[0.8rem] tracking-wide text-zinc-500 dark:text-white/55 hover:text-zinc-900 dark:hover:text-white/90 transition-colors duration-200"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-[0.8rem] tracking-wide text-zinc-500 dark:text-white/55 hover:text-zinc-900 dark:hover:text-white/90 transition-colors duration-200"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="text-[0.8rem] tracking-wide text-zinc-500 dark:text-white/55 hover:text-zinc-900 dark:hover:text-white/90 transition-colors duration-200"
          >
            Contact
          </a>

          <div className="w-px h-3.5 bg-zinc-300 dark:bg-white/15" />

          <button
            onClick={toggleTheme}
            className="text-zinc-400 dark:text-white/50 hover:text-zinc-800 dark:hover:text-white/90 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}
