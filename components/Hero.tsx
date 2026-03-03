"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-6 md:gap-8">
        {/* Avatar */}
        <motion.div
          className="relative shrink-0"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src="/images/avatar.jpg"
            alt="Abdullah Khalid"
            width={120}
            height={120}
            className="rounded-xl object-cover"
            priority
          />
        </motion.div>

        {/* Name + hover hint */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="font-serif text-6xl md:text-7xl tracking-tight text-white leading-none">
              abdullah khalid
            </h1>
            <motion.span
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-white/30 whitespace-nowrap"
            >
              hover here ←
            </motion.span>
          </div>

          {/* Descriptor */}
          <p className="text-base md:text-lg text-white/50 leading-relaxed">
            software engineering @ uwaterloo 
          </p>
        </div>
      </div>
    </section>
  );
}
