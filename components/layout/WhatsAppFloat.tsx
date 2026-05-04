"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloat() {
  const [showHint, setShowHint] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!hintDismissed) setShowHint(true);
    }, 4500);
    return () => clearTimeout(t);
  }, [hintDismissed]);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showHint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, x: 12, y: 6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-[260px] rounded-2xl border border-brand-line bg-white p-3 pr-7 text-xs leading-snug text-brand-ink shadow-card"
          >
            <button
              onClick={() => {
                setShowHint(false);
                setHintDismissed(true);
              }}
              className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full text-brand-mist transition-colors hover:bg-brand-paper hover:text-brand-ink"
              aria-label="Cerrar"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="font-medium text-brand-ink">¿Necesitás ayuda con tu perro?</p>
            <p className="mt-1 text-brand-slate">
              Escribinos por WhatsApp. Respondemos en menos de 1 hora.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("cta_whatsapp_click", { source: "float" })}
        aria-label="Abrir WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-all duration-300 hover:scale-105 hover:bg-[#1EB855] hover:shadow-lg sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-soft-pulse" />
        <MessageCircle className="relative h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
      </a>
    </div>
  );
}
