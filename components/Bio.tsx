"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

function Row({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className="flex gap-3.5"
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      <span className="text-indigo-400/50 shrink-0 select-none mt-0.5">↳</span>
      <p className="text-zinc-600 dark:text-white/75 text-base md:text-lg leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
}

function Sep() {
  return <span className="text-zinc-400 dark:text-white/25 mx-1.5">→</span>;
}

function B({ children }: { children: ReactNode }) {
  return <strong className="text-zinc-900 dark:text-white font-semibold">{children}</strong>;
}

function Tag({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <span
      className={`inline-flex items-center text-xs font-mono px-1.5 py-0.5 rounded border mx-0.5 ${accent ?? "border-zinc-300 text-zinc-500 bg-zinc-100 dark:border-white/15 dark:text-white/50 dark:bg-white/5"}`}
    >
      {children}
    </span>
  );
}

export function Bio() {
  return (
    <section className="mt-14 space-y-5">
      <Row delay={0}>
        <B>software engineering at the university of waterloo</B>
        <Sep />
        high intensity program, but has the most <B>cracked engineers</B> in the world.
      </Row>

      <Row delay={0.05}>
        <B>shipped features for Orbital and WARG</B>
        <Sep />
        two of the leading design teams at UW.
      </Row>

      <Row delay={0.1}>
        <B>building the next big Muslim startup</B>
        <Sep />
        building with Typescript, AWS, Langchain, OpenAI API.
      </Row>

      <Row delay={0.15}>
        <B>Experience</B>
        <Sep />
        technical co-founder, swe, autonomous dev, mle.
      </Row>

      <Row delay={0.2}>
        <B>cool facts:</B> TODO.
      </Row>
    </section>
  );
}
