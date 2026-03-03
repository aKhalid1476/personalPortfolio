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
      <p className="text-white/75 text-base md:text-lg leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
}

function Sep() {
  return <span className="text-white/25 mx-1.5">→</span>;
}

function B({ children }: { children: ReactNode }) {
  return <strong className="text-white font-semibold">{children}</strong>;
}

function Tag({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <span
      className={`inline-flex items-center text-xs font-mono px-1.5 py-0.5 rounded border mx-0.5 ${accent ?? "border-white/15 text-white/50 bg-white/5"}`}
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
        <B>shipped goosetype.com, 5000+ users in one week</B>
        <Sep />
        typing arena, rebranded after Waterloo flagged the original;{" "}
        <B>rebuilt and scaled fast</B>.
      </Row>

      <Row delay={0.1}>
        <B>hosted the biggest muslim ethics-based hackathon in north america</B>
        <Sep />
        <B>300+</B> people, sponsored by <B>YC-backed</B> startups,{" "}
        <em className="not-italic text-white/60">Shopify</em>, &amp; a16z scout.
      </Row>

      <Row delay={0.15}>
        <B>certified &amp; experienced</B>
        <Sep />
        <Tag accent="border-orange-400/25 text-orange-300/80 bg-orange-400/5">
          aws
        </Tag>{" "}
        aws ccp,{" "}
        <Tag accent="border-blue-400/25 text-blue-300/80 bg-blue-400/5">
          az
        </Tag>{" "}
        az-900,{" "}
        <Tag accent="border-cyan-400/25 text-cyan-300/80 bg-cyan-400/5">
          ccna
        </Tag>{" "}
        ccna1 + more.{" "}
        <B>founding</B> backend engineer, swe &amp; cyber intern, cybersecurity
        specialist.
      </Row>

      <Row delay={0.2}>
        <B>cool facts:</B> first internship at 11, 8 million views on my insta,{" "}
        4th place toronto wrestling.
      </Row>
    </section>
  );
}
