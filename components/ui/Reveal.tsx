"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

/**
 * Wrapper de aparición progresiva al entrar en viewport.
 *
 * Usa `useInView` (no `whileInView`) para máxima fiabilidad:
 * - dispara aunque el elemento esté inicialmente cerca/dentro del viewport
 * - respeta `prefers-reduced-motion`
 * - margin negativo de -10% para que arranque un poco antes de entrar
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -10% 0px",
  });

  const offset = 16;
  const translate = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...translate }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...translate }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
