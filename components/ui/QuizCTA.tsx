"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { DiagnosticQuiz } from "@/components/sections/DiagnosticQuiz";
import { trackEvent } from "@/lib/analytics";

type Props = {
  /** De dónde salió el click, para analytics */
  source: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "amber" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  /** Botón sin los estilos de <Button>: usa sólo className */
  raw?: boolean;
};

/**
 * CTA que abre el diagnóstico gratuito.
 * Reemplaza a los viejos botones de "reservar evaluación gratuita": en vez de
 * mandar a WhatsApp en frío, la persona hace el quiz y llega con su caso ya
 * cargado en el mensaje.
 */
export function QuizCTA({
  source,
  children,
  className,
  variant = "amber",
  size = "md",
  fullWidth,
  raw,
}: Props) {
  const [open, setOpen] = useState(false);

  const abrir = () => {
    trackEvent("quiz_cta_click", { source });
    setOpen(true);
  };

  return (
    <>
      {raw ? (
        <button type="button" onClick={abrir} className={className}>
          {children}
        </button>
      ) : (
        <Button
          onClick={abrir}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          className={className}
        >
          {children}
        </Button>
      )}
      <DiagnosticQuiz open={open} onClose={() => setOpen(false)} />
    </>
  );
}
