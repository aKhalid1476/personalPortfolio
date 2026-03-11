"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const avatarVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function Hero() {
  return (
    <motion.div
      className="flex flex-col gap-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center text-center md:text-left md:items-start md:flex-row gap-6 md:gap-12">
        {/* Avatar */}
        <motion.div
          className="relative shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full overflow-hidden"
          variants={avatarVariants}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src="/images/avatar.JPG"
            alt="Abdullah Khalid"
            fill
            sizes="(min-width: 768px) 192px, (min-width: 640px) 144px, 128px"
            className="object-cover object-[50%_18%]"
            priority
          />
        </motion.div>

        {/* Name + descriptor + buttons */}
        <div className="flex flex-col gap-2">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight text-zinc-900 dark:text-white leading-none"
            style={{ fontFamily: '"Bodoni Moda", "Bodoni 72", "Didot", serif' }}
            variants={itemVariants}
          >
            Abdullah Khalid
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-zinc-500 dark:text-white/50 leading-relaxed"
            variants={itemVariants}
          >
            software engineering @ uwaterloo
          </motion.p>

          {/* Action buttons */}
          <motion.div className="flex items-center justify-center md:justify-start flex-wrap gap-2 sm:gap-3 mt-1 md:mt-2" variants={itemVariants}>
            {/* Resume download button */}
            <a
              href="/Resume.pdf"
              download
              className="px-4 py-1.5 text-sm text-zinc-700 bg-zinc-100 border border-zinc-300 rounded-full hover:bg-zinc-200 hover:text-zinc-900 dark:text-white/90 dark:bg-white/8 dark:border-white/20 dark:hover:bg-white/[0.14] dark:hover:text-white transition-all duration-300 ease-out"
            >
              résumé
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/aKhalid1476"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/akDev88"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:a36khali@uwaterloo.ca"
              aria-label="Email"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/abdullah-khalid-uw/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-zinc-300 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
