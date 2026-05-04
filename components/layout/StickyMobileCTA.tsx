"use client";

import { useEffect, useState } from "react";
import { MessageCircle, CalendarCheck } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

/**
 * Sticky bar mobile-only. Aparece al pasar el primer viewport y empuja
 * el WhatsApp flotante hacia arriba via padding del body.
 * Lo escondemos en pantallas grandes (lg+).
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="border-t border-brand-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-md gap-2 px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.default)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_whatsapp_click", { source: "mobile-bar" })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-line bg-white py-3 text-sm font-medium text-brand-ink transition-colors hover:border-brand-ink"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.evaluacion)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_reservar_click", { source: "mobile-bar" })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-amber py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-amberDark hover:text-white"
          >
            <CalendarCheck className="h-4 w-4" />
            Reservar
          </a>
        </div>
      </div>
    </div>
  );
}
