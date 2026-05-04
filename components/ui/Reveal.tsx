import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

/**
 * Wrapper de aparición progresiva.
 *
 * Implementación 100% CSS: la animación corre apenas el navegador parsea
 * el HTML — sin useEffect, sin IntersectionObserver, sin dependencia de
 * hidratación de React. Inmune a cualquier issue de SSR.
 *
 * El stagger se logra con `animationDelay` inline.
 * Respeta `prefers-reduced-motion` vía media query en globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  /** ignored — kept for API compatibility */
  once?: boolean;
  amount?: number;
}) {
  const animClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
      ? "reveal-right"
      : direction === "down"
      ? "reveal-down"
      : direction === "none"
      ? "reveal-fade"
      : "reveal-up";

  return (
    <div
      className={cn(animClass, className)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}
