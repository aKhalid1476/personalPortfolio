"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const COUNT = 65;
const LINK_DIST = 140;
const CURSOR_DIST = 180;
const BASE_SPEED = 0.25;

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const themeRef = useRef<"dark" | "light">("dark");
  const { theme } = useTheme();

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let particles: Particle[] = [];

    function init() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * BASE_SPEED * 2,
        vy: (Math.random() - 0.5) * BASE_SPEED * 2,
        r: Math.random() * 1.2 + 0.5,
      }));
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = themeRef.current === "dark";
      const rgb = isDark ? "255,255,255" : "20,20,30";
      const dotOpacity = isDark ? 0.4 : 0.22;
      const linkMaxOpacity = isDark ? 0.16 : 0.09;
      const cursorMaxOpacity = isDark ? 0.38 : 0.2;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }
      }

      ctx.lineWidth = 0.6;

      // Inter-particle lines
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * linkMaxOpacity;
            ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // Cursor lines
      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < CURSOR_DIST * CURSOR_DIST) {
          const alpha = (1 - Math.sqrt(d2) / CURSOR_DIST) * cursorMaxOpacity;
          ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${dotOpacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    init();
    draw();

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
