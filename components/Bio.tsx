"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NODES = [
  { id: "islamabad", city: "Islamabad, PK", years: "2002 – 2018", note: "Born",            cx: 60,  cy: 100, baseR: 4, isCurrent: false },
  { id: "oshawa",    city: "Oshawa, CA",    years: "2018 – 2022", note: "Raised",     cx: 320, cy: 100, baseR: 4, isCurrent: false },
  { id: "waterloo",  city: "Waterloo, CA",  years: "2022 – present", note: "Present", cx: 580, cy: 100, baseR: 6, isCurrent: true },
] as const;

const CURVE_PATH = "M 60,100 C 150,65 230,135 320,100 C 410,65 490,135 580,100";

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show:   { opacity: 1, scale: 1 },
};

export function JourneyMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 640 200"
      className="w-full text-zinc-800 dark:text-white"
      aria-label="Journey map: Islamabad to Oshawa to Waterloo"
    >
      {/* Bezier path drawn on mount */}
      <motion.path
        d={CURVE_PATH}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.22}
        strokeWidth={1.2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {NODES.map((node, i) => {
        const active = hovered === node.id;
        const dotR   = active ? node.baseR + 3 : node.baseR;

        return (
          <motion.g
            key={node.id}
            variants={nodeVariants}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.3 + i * 0.15 }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "default", transformOrigin: `${node.cx}px ${node.cy}px` }}
          >
            {/* Outer decorative ring */}
            <circle
              cx={node.cx} cy={node.cy} r={node.baseR + 8}
              fill="none" stroke="currentColor" strokeWidth={1}
              strokeOpacity={active ? 0.35 : 0.12}
              style={{ transition: "stroke-opacity 0.25s ease-out" }}
            />

            {/* Waterloo pulse ring */}
            {node.isCurrent && (
              <motion.circle
                cx={node.cx} cy={node.cy} r={node.baseR + 16}
                fill="none" stroke="currentColor" strokeWidth={1}
                initial={{ strokeOpacity: 0.40 }}
                animate={{ strokeOpacity: [0.40, 0] }}
                transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 0.5 }}
              />
            )}

            {/* Inner dot */}
            <circle
              cx={node.cx} cy={node.cy} r={dotR}
              fill="currentColor"
              fillOpacity={active ? 1.0 : node.isCurrent ? 0.85 : 0.55}
              style={{ transition: "r 0.25s ease-out, fill-opacity 0.25s ease-out" }}
            />

            {/* Tick: subtle vertical connector dot → labels */}
            <line
              x1={node.cx} y1={node.cy + node.baseR + 5}
              x2={node.cx} y2={node.cy + 22}
              stroke="currentColor" strokeOpacity={0.15} strokeWidth={1}
            />

            {/* Year range — above */}
            <text
              x={node.cx} y={node.cy - 20}
              textAnchor="middle" fill="currentColor"
              fillOpacity={active ? 0.70 : 0.38} fontSize={9.5}
              fontFamily="'SF Mono','Fira Code','Cascadia Code',monospace"
              letterSpacing="0.04em"
              style={{ transition: "fill-opacity 0.25s ease-out" }}
            >{node.years}</text>

            {/* City name — below */}
            <text
              x={node.cx} y={node.cy + 34}
              textAnchor="middle" fill="currentColor"
              fillOpacity={active ? 0.90 : node.isCurrent ? 0.80 : 0.60} fontSize={11.5}
              fontFamily="Georgia,'Times New Roman',serif" fontStyle="italic"
              style={{ transition: "fill-opacity 0.25s ease-out" }}
            >{node.city}</text>

            {/* Descriptor — furthest below */}
            <text
              x={node.cx} y={node.cy + 50}
              textAnchor="middle" fill="currentColor"
              fillOpacity={active ? 0.60 : 0.32} fontSize={9}
              fontFamily="system-ui,-apple-system,sans-serif" letterSpacing="0.06em"
              style={{ transition: "fill-opacity 0.25s ease-out" }}
            >{node.note}</text>
          </motion.g>
        );
      })}
    </svg>
  );
}

function AboutText() {
  return (
    <p className="text-zinc-600 dark:text-white/70 text-base md:text-lg leading-relaxed">
      I chose to attend the University of Waterloo, simply because UW produces 
      the best engineers in the world. I was immediately immersed into design teams 
      that shipped 
    </p>
  );
}

export function MyStory() {
  return (
    <section className="pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2
          style={{ fontFamily: '"Bodoni Moda","Bodoni 72","Didot",serif' }}
          className="text-4xl md:text-5xl tracking-tight text-zinc-900 dark:text-white mb-10"
        >
          My story
        </h2>
        <JourneyMap />
        <div className="mt-10 max-w-2xl">
          <AboutText />
        </div>
      </motion.div>
    </section>
  );
}

/** @deprecated Use MyStory instead */
export function Bio() {
  return <MyStory />;
}
